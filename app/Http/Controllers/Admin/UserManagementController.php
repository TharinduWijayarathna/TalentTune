<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserManagementController extends Controller
{
    public function index(Request $request): Response
    {
        $query = User::query();

        if ($request->has('role') && $request->role) {
            $query->where('role', $request->role);
        }

        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        $users = $query->latest()->paginate(20);

        return Inertia::render('admin/UserManagement', [
            'users' => $users,
            'filters' => $request->only(['role', 'search']),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'role' => 'required|in:admin,hr_professional,job_seeker',
        ]);

        $user->update($validated);

        return redirect()->route('user-management')->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('user-management')->with('success', 'User deleted successfully.');
    }

    public function hrIndex(): Response
    {
        $hrProfessionals = User::where('role', 'hr_professional')
            ->latest()
            ->get();

        return Inertia::render('admin/HRManagement', [
            'hrProfessionals' => $hrProfessionals,
        ]);
    }
}
