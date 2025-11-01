<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class JobController extends Controller
{
    public function index(): Response
    {
        $jobs = Job::where('user_id', Auth::id())
            ->with('company')
            ->latest()
            ->get();

        $companies = Company::all();

        return Inertia::render('hr/PostJobs', [
            'jobs' => $jobs,
            'companies' => $companies,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_id' => 'nullable|exists:companies,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'requirements' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'type' => 'required|in:full_time,part_time,contract,freelance,internship',
            'remote' => 'required|in:on_site,remote,hybrid',
            'salary_min' => 'nullable|numeric|min:0',
            'salary_max' => 'nullable|numeric|min:0|gte:salary_min',
            'salary_currency' => 'nullable|string|max:3',
            'skills' => 'nullable|array',
            'skills.*' => 'string|max:100',
            'status' => 'required|in:draft,active,closed,expired',
            'expires_at' => 'nullable|date|after:today',
        ]);

        $validated['user_id'] = Auth::id();

        Job::create($validated);

        return redirect()->route('post-jobs')->with('success', 'Job posted successfully.');
    }

    public function update(Request $request, Job $job)
    {
        if ($job->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'company_id' => 'nullable|exists:companies,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'requirements' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'type' => 'required|in:full_time,part_time,contract,freelance,internship',
            'remote' => 'required|in:on_site,remote,hybrid',
            'salary_min' => 'nullable|numeric|min:0',
            'salary_max' => 'nullable|numeric|min:0|gte:salary_min',
            'salary_currency' => 'nullable|string|max:3',
            'skills' => 'nullable|array',
            'skills.*' => 'string|max:100',
            'status' => 'required|in:draft,active,closed,expired',
            'expires_at' => 'nullable|date|after:today',
        ]);

        $job->update($validated);

        return redirect()->route('post-jobs')->with('success', 'Job updated successfully.');
    }

    public function destroy(Job $job)
    {
        if ($job->user_id !== Auth::id()) {
            abort(403);
        }

        $job->delete();

        return redirect()->route('post-jobs')->with('success', 'Job deleted successfully.');
    }
}
