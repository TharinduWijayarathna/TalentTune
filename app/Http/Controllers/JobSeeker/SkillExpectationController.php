<?php

namespace App\Http\Controllers\JobSeeker;

use App\Http\Controllers\Controller;
use App\Models\SkillExpectation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class SkillExpectationController extends Controller
{
    public function index(): Response
    {
        $skills = SkillExpectation::where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('job-seeker/SkillExpectations', [
            'skills' => $skills,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'skill_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'current_level' => 'required|integer|min:0|max:100',
            'target_level' => 'required|integer|min:0|max:100',
            'target_date' => 'nullable|date',
            'status' => 'required|in:not_started,in_progress,completed,on_hold',
        ]);

        $validated['user_id'] = Auth::id();

        SkillExpectation::create($validated);

        return redirect()->route('skill-expectations')->with('success', 'Skill goal added successfully.');
    }

    public function update(Request $request, SkillExpectation $skillExpectation)
    {
        if ($skillExpectation->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'skill_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'current_level' => 'required|integer|min:0|max:100',
            'target_level' => 'required|integer|min:0|max:100',
            'target_date' => 'nullable|date',
            'status' => 'required|in:not_started,in_progress,completed,on_hold',
        ]);

        $skillExpectation->update($validated);

        return redirect()->route('skill-expectations')->with('success', 'Skill goal updated successfully.');
    }

    public function destroy(SkillExpectation $skillExpectation)
    {
        if ($skillExpectation->user_id !== Auth::id()) {
            abort(403);
        }

        $skillExpectation->delete();

        return redirect()->route('skill-expectations')->with('success', 'Skill goal deleted successfully.');
    }
}
