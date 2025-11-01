<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class JobSeekerManagementController extends Controller
{
    public function index(Request $request): Response
    {
        $query = User::where('role', 'job_seeker');

        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        $jobSeekers = $query->latest()->paginate(20);

        return Inertia::render('admin/JobSeekerManagement', [
            'jobSeekers' => $jobSeekers,
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        $validated['role'] = 'job_seeker';
        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);

        return redirect()->route('job-seeker-management')->with('success', 'Job seeker created successfully.');
    }

    public function update(Request $request, User $user)
    {
        if ($user->role !== 'job_seeker') {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return redirect()->route('job-seeker-management')->with('success', 'Job seeker updated successfully.');
    }

    public function destroy(User $user)
    {
        if ($user->role !== 'job_seeker') {
            abort(403);
        }

        $user->delete();

        return redirect()->route('job-seeker-management')->with('success', 'Job seeker deleted successfully.');
    }
}

