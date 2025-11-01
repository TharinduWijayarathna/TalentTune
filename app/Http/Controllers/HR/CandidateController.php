<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CandidateController extends Controller
{
    public function index(Request $request): Response
    {
        $jobs = Job::where('user_id', Auth::id())->pluck('id');

        $applications = JobApplication::whereIn('job_id', $jobs)
            ->with(['user', 'job'])
            ->latest()
            ->get();

        return Inertia::render('hr/ReviewCandidates', [
            'applications' => $applications,
        ]);
    }

    public function filter(Request $request): Response
    {
        $query = User::where('role', 'job_seeker');

        if ($request->has('skills') && $request->skills) {
            // This would need more sophisticated search based on user profiles
            // For now, just basic filtering
        }

        if ($request->has('experience') && $request->experience !== 'any') {
            // Filter by experience level if you have that field
        }

        $candidates = $query->latest()->paginate(20);

        return Inertia::render('hr/FilterCandidates', [
            'candidates' => $candidates,
            'filters' => $request->only(['skills', 'experience']),
        ]);
    }

    public function updateApplication(Request $request, JobApplication $application)
    {
        $job = $application->job;
        if ($job->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'status' => 'required|in:pending,reviewing,shortlisted,interviewed,accepted,rejected',
            'notes' => 'nullable|string',
        ]);

        $application->update($validated);

        return redirect()->route('review-candidates')->with('success', 'Application updated successfully.');
    }
}
