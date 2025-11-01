<?php

namespace App\Http\Controllers\JobSeeker;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class JobApplicationController extends Controller
{
    public function index(): Response
    {
        $applications = JobApplication::where('user_id', Auth::id())
            ->with('job.company')
            ->latest()
            ->get();

        $stats = [
            'total' => $applications->count(),
            'pending' => $applications->where('status', 'pending')->count(),
            'accepted' => $applications->where('status', 'accepted')->count(),
            'rejected' => $applications->where('status', 'rejected')->count(),
        ];

        return Inertia::render('job-seeker/JobApplications', [
            'applications' => $applications,
            'stats' => $stats,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_id' => 'required|exists:jobs,id',
            'cover_letter' => 'nullable|string',
            'resume_path' => 'nullable|string|max:255',
        ]);

        $validated['user_id'] = Auth::id();
        $validated['applied_at'] = now();

        JobApplication::create($validated);

        return redirect()->route('job-applications')->with('success', 'Application submitted successfully.');
    }

    public function destroy(JobApplication $jobApplication)
    {
        if ($jobApplication->user_id !== Auth::id()) {
            abort(403);
        }

        $jobApplication->delete();

        return redirect()->route('job-applications')->with('success', 'Application withdrawn successfully.');
    }
}
