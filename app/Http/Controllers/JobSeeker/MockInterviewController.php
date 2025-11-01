<?php

namespace App\Http\Controllers\JobSeeker;

use App\Http\Controllers\Controller;
use App\Models\MockInterviewSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class MockInterviewController extends Controller
{
    public function index(): Response
    {
        $sessions = MockInterviewSession::where('user_id', Auth::id())
            ->latest()
            ->take(10)
            ->get();

        $stats = [
            'total' => MockInterviewSession::where('user_id', Auth::id())->count(),
            'average_score' => MockInterviewSession::where('user_id', Auth::id())
                ->whereNotNull('score')
                ->avg('score') ?? 0,
            'total_time' => MockInterviewSession::where('user_id', Auth::id())
                ->whereNotNull('duration_minutes')
                ->sum('duration_minutes') ?? 0,
        ];

        return Inertia::render('job-seeker/MockInterview', [
            'sessions' => $sessions,
            'stats' => $stats,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:technical,behavioral,mixed',
            'difficulty' => 'required|in:beginner,intermediate,advanced',
            'mode' => 'required|in:text,voice',
        ]);

        $session = MockInterviewSession::create([
            'user_id' => Auth::id(),
            'type' => $validated['type'],
            'difficulty' => $validated['difficulty'],
            'mode' => $validated['mode'],
            'status' => 'pending',
            'started_at' => now(),
        ]);

        return redirect()->route('mock-interview.session', $session->id)
            ->with('success', 'Interview session created successfully.');
    }

    public function session(MockInterviewSession $session): Response
    {
        if ($session->user_id !== Auth::id()) {
            abort(403);
        }

        // Update status if pending
        if ($session->status === 'pending') {
            $session->update([
                'status' => 'in_progress',
                'started_at' => now(),
            ]);
        }

        // Render different view based on mode
        $viewName = $session->mode === 'voice' 
            ? 'job-seeker/MockInterviewSessionVoice' 
            : 'job-seeker/MockInterviewSession';

        return Inertia::render($viewName, [
            'session' => $session,
        ]);
    }

    public function update(Request $request, MockInterviewSession $session)
    {
        if ($session->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'answers' => 'nullable|array',
            'feedback' => 'nullable|array',
            'score' => 'nullable|numeric|min:0|max:100',
            'status' => 'nullable|in:pending,in_progress,completed,cancelled',
        ]);

        if (isset($validated['status']) && $validated['status'] === 'completed') {
            $validated['completed_at'] = now();
            if ($session->started_at) {
                $validated['duration_minutes'] = now()->diffInMinutes($session->started_at);
            }
        }

        $session->update($validated);

        return redirect()->back()->with('success', 'Interview session updated successfully.');
    }
}
