<?php

namespace App\Http\Controllers\JobSeeker;

use App\Http\Controllers\Controller;
use App\Models\PortfolioProject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function index(): Response
    {
        $projects = PortfolioProject::where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('job-seeker/Portfolio', [
            'projects' => $projects,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'url' => 'nullable|url|max:255',
            'repository_url' => 'nullable|url|max:255',
            'technologies' => 'nullable|array',
            'technologies.*' => 'string|max:100',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'image' => 'nullable|string|max:255',
            'is_featured' => 'boolean',
        ]);

        $validated['user_id'] = Auth::id();

        PortfolioProject::create($validated);

        return redirect()->route('portfolio')->with('success', 'Project added successfully.');
    }

    public function update(Request $request, PortfolioProject $portfolio)
    {
        if ($portfolio->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'url' => 'nullable|url|max:255',
            'repository_url' => 'nullable|url|max:255',
            'technologies' => 'nullable|array',
            'technologies.*' => 'string|max:100',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'image' => 'nullable|string|max:255',
            'is_featured' => 'boolean',
        ]);

        $portfolio->update($validated);

        return redirect()->route('portfolio')->with('success', 'Project updated successfully.');
    }

    public function destroy(PortfolioProject $portfolio)
    {
        if ($portfolio->user_id !== Auth::id()) {
            abort(403);
        }

        $portfolio->delete();

        return redirect()->route('portfolio')->with('success', 'Project deleted successfully.');
    }
}
