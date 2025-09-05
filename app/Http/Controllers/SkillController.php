<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class SkillController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();

        // Get all resumes for the user
        $resumes = $user->resumes()->where('is_processed', true)->get();

        // Aggregate skills from all processed resumes
        $allSkills = [];
        $skillCategories = [];
        $skillLevels = [];

        foreach ($resumes as $resume) {
            if ($resume->extracted_skills) {
                foreach ($resume->extracted_skills as $skill) {
                    if (! isset($allSkills[$skill])) {
                        $allSkills[$skill] = 0;
                    }
                    $allSkills[$skill]++;
                }
            }
        }

        // Mock data for demonstration - in real app, this would come from AI analysis
        $skillProfile = [
            'technical' => [
                'JavaScript' => 85,
                'React' => 78,
                'Node.js' => 72,
                'Python' => 65,
                'SQL' => 58,
                'Git' => 82,
            ],
            'soft' => [
                'Communication' => 88,
                'Leadership' => 75,
                'Problem Solving' => 92,
                'Teamwork' => 85,
                'Time Management' => 80,
            ],
            'tools' => [
                'VS Code' => 90,
                'Figma' => 60,
                'Docker' => 45,
                'AWS' => 55,
                'Postman' => 70,
            ],
        ];

        $skillGaps = [
            ['skill' => 'TypeScript', 'importance' => 'High', 'reason' => 'Growing demand in frontend development'],
            ['skill' => 'GraphQL', 'importance' => 'Medium', 'reason' => 'Modern API development'],
            ['skill' => 'Kubernetes', 'importance' => 'High', 'reason' => 'DevOps and container orchestration'],
        ];

        $recommendations = [
            ['type' => 'course', 'title' => 'Complete TypeScript Course', 'provider' => 'Udemy', 'url' => '#'],
            ['type' => 'certification', 'title' => 'AWS Certified Developer', 'provider' => 'Amazon', 'url' => '#'],
            ['type' => 'practice', 'title' => 'Build a GraphQL API', 'provider' => 'Self-paced', 'url' => '#'],
        ];

        return Inertia::render('skills/index', [
            'skillProfile' => $skillProfile,
            'skillGaps' => $skillGaps,
            'recommendations' => $recommendations,
            'totalSkills' => count($allSkills),
            'resumesAnalyzed' => $resumes->count(),
        ]);
    }
}
