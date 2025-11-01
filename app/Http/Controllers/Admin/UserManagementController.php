<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserManagementController extends Controller
{
    public function index(Request $request): Response
    {
        // Only show admins and HR professionals (exclude job seekers - they have their own page)
        $query = User::whereIn('role', ['admin', 'hr_professional']);

        if ($request->has('role') && $request->role) {
            $query->where('role', $request->role);
        }

        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        $users = $query->with('company')->latest()->paginate(20);
        $companies = \App\Models\Company::orderBy('name')->get();

        return Inertia::render('admin/UserManagement', [
            'users' => $users,
            'companies' => $companies,
            'filters' => $request->only(['role', 'search']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,hr_professional',
            'company_id' => 'nullable|exists:companies,id|required_if:role,hr_professional',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);

        return redirect()->route('user-management')->with('success', 'User created successfully.');
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8',
            'role' => 'required|in:admin,hr_professional',
            'company_id' => 'nullable|exists:companies,id|required_if:role,hr_professional',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return redirect()->route('user-management')->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('user-management')->with('success', 'User deleted successfully.');
    }

    public function hrIndex(Request $request): Response
    {
        $query = User::where('role', 'hr_professional')->with('company');

        if ($request->has('company_id') && $request->company_id) {
            $query->where('company_id', $request->company_id);
        }

        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        $hrProfessionals = $query->latest()->get();
        $companies = \App\Models\Company::orderBy('name')->get();

        return Inertia::render('admin/HRManagement', [
            'hrProfessionals' => $hrProfessionals,
            'companies' => $companies,
            'filters' => $request->only(['company_id', 'search']),
        ]);
    }

    public function hrStore(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'company_id' => 'required|exists:companies,id',
        ]);

        $validated['role'] = 'hr_professional';
        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);

        return redirect()->route('hr-management')->with('success', 'HR professional created successfully.');
    }

    public function hrUpdate(Request $request, User $user)
    {
        if ($user->role !== 'hr_professional') {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8',
            'company_id' => 'required|exists:companies,id',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return redirect()->route('hr-management')->with('success', 'HR professional updated successfully.');
    }

    public function hrDestroy(User $user)
    {
        if ($user->role !== 'hr_professional') {
            abort(403);
        }

        $user->delete();

        return redirect()->route('hr-management')->with('success', 'HR professional deleted successfully.');
    }
}
