<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JobMatchingController extends Controller
{
    public function index(): Response
    {
        // Mock job data
        $jobs = [
            [
                'id' => 1,
                'title' => 'Senior Full Stack Developer',
                'company' => 'TechCorp Inc.',
                'location' => 'San Francisco, CA',
                'type' => 'Full-time',
                'remote' => true,
                'salary' => '$120,000 - $150,000',
                'match_score' => 95,
                'posted_date' => '2024-01-15',
                'description' => 'We are looking for a Senior Full Stack Developer with expertise in React, Node.js, and cloud technologies.',
                'requirements' => ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL'],
                'benefits' => ['Health Insurance', '401k', 'Flexible Hours', 'Remote Work'],
                'application_status' => null,
            ],
            [
                'id' => 2,
                'title' => 'Frontend Developer',
                'company' => 'StartupXYZ',
                'location' => 'New York, NY',
                'type' => 'Full-time',
                'remote' => false,
                'salary' => '$90,000 - $110,000',
                'match_score' => 87,
                'posted_date' => '2024-01-14',
                'description' => 'Join our growing team as a Frontend Developer working on cutting-edge web applications.',
                'requirements' => ['React', 'JavaScript', 'CSS', 'Git'],
                'benefits' => ['Health Insurance', 'Stock Options', 'Learning Budget'],
                'application_status' => 'applied',
            ],
            [
                'id' => 3,
                'title' => 'Backend Developer',
                'company' => 'Enterprise Solutions',
                'location' => 'Austin, TX',
                'type' => 'Contract',
                'remote' => true,
                'salary' => '$80 - $100/hour',
                'match_score' => 78,
                'posted_date' => '2024-01-13',
                'description' => 'Contract position for backend development using Python and Django.',
                'requirements' => ['Python', 'Django', 'PostgreSQL', 'Docker'],
                'benefits' => ['Flexible Schedule', 'Remote Work'],
                'application_status' => null,
            ],
        ];

        $applications = [
            [
                'id' => 1,
                'job_id' => 2,
                'job_title' => 'Frontend Developer',
                'company' => 'StartupXYZ',
                'applied_date' => '2024-01-10',
                'status' => 'Under Review',
                'next_step' => 'Technical Interview',
                'notes' => 'Applied through company website',
            ],
            [
                'id' => 2,
                'job_id' => 4,
                'job_title' => 'React Developer',
                'company' => 'WebAgency',
                'applied_date' => '2024-01-08',
                'status' => 'Interview Scheduled',
                'next_step' => 'Final Interview - Jan 20th',
                'notes' => 'Phone screening completed successfully',
            ],
        ];

        $savedJobs = [
            [
                'id' => 1,
                'job_id' => 1,
                'saved_date' => '2024-01-12',
            ],
            [
                'id' => 2,
                'job_id' => 3,
                'saved_date' => '2024-01-11',
            ],
        ];

        return Inertia::render('job-matching/index', [
            'jobs' => $jobs,
            'applications' => $applications,
            'savedJobs' => $savedJobs,
        ]);
    }

    public function show($id): Response
    {
        // Mock detailed job data
        $job = [
            'id' => $id,
            'title' => 'Senior Full Stack Developer',
            'company' => 'TechCorp Inc.',
            'location' => 'San Francisco, CA',
            'type' => 'Full-time',
            'remote' => true,
            'salary' => '$120,000 - $150,000',
            'match_score' => 95,
            'posted_date' => '2024-01-15',
            'description' => 'We are looking for a Senior Full Stack Developer with expertise in React, Node.js, and cloud technologies. You will be working on our flagship product and leading a team of developers.',
            'requirements' => ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL', 'Docker', 'Kubernetes'],
            'benefits' => ['Health Insurance', '401k', 'Flexible Hours', 'Remote Work', 'Learning Budget'],
            'company_info' => [
                'name' => 'TechCorp Inc.',
                'size' => '500-1000 employees',
                'industry' => 'Technology',
                'website' => 'https://techcorp.com',
                'description' => 'Leading technology company focused on innovative solutions.',
            ],
            'application_status' => null,
        ];

        return Inertia::render('job-matching/show', [
            'job' => $job,
        ]);
    }

    public function apply(Request $request, $id)
    {
        $request->validate([
            'cover_letter' => 'nullable|string|max:2000',
            'resume_id' => 'required|exists:resumes,id',
        ]);

        // Mock application submission
        return response()->json([
            'success' => true,
            'message' => 'Application submitted successfully!',
            'application_id' => rand(1000, 9999),
        ]);
    }

    public function saveJob(Request $request, $id)
    {
        // Mock save job functionality
        return response()->json([
            'success' => true,
            'message' => 'Job saved successfully!',
        ]);
    }
}
