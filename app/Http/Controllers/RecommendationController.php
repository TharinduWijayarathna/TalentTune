<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class RecommendationController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();

        // Get user's recommendations
        $recommendations = $user->recommendations()->latest()->get();

        // Mock data for demonstration - in real app, this would come from AI analysis
        $personalizedRecommendations = [
            [
                'id' => 1,
                'type' => 'course',
                'title' => 'Complete TypeScript Course',
                'description' => 'Master TypeScript fundamentals and advanced features to enhance your JavaScript development skills.',
                'category' => 'learning',
                'related_skills' => ['TypeScript', 'JavaScript', 'Frontend Development'],
                'url' => 'https://www.udemy.com/course/typescript-course/',
                'provider' => 'Udemy',
                'priority' => 5,
                'metadata' => [
                    'duration' => '12 hours',
                    'level' => 'Intermediate',
                    'rating' => 4.8,
                    'students' => '45,000+',
                ],
                'is_completed' => false,
                'is_dismissed' => false,
            ],
            [
                'id' => 2,
                'type' => 'certification',
                'title' => 'AWS Certified Developer',
                'description' => 'Validate your expertise in developing and maintaining applications on the AWS platform.',
                'category' => 'career',
                'related_skills' => ['AWS', 'Cloud Computing', 'DevOps'],
                'url' => 'https://aws.amazon.com/certification/certified-developer-associate/',
                'provider' => 'Amazon Web Services',
                'priority' => 4,
                'metadata' => [
                    'exam_duration' => '130 minutes',
                    'cost' => '$150',
                    'validity' => '3 years',
                ],
                'is_completed' => false,
                'is_dismissed' => false,
            ],
            [
                'id' => 3,
                'type' => 'practice',
                'title' => 'Build a GraphQL API',
                'description' => 'Create a full-stack application with GraphQL to improve your API development skills.',
                'category' => 'skill_development',
                'related_skills' => ['GraphQL', 'Node.js', 'API Development'],
                'url' => 'https://graphql.org/learn/',
                'provider' => 'GraphQL Foundation',
                'priority' => 3,
                'metadata' => [
                    'estimated_time' => '2-3 weeks',
                    'difficulty' => 'Intermediate',
                    'prerequisites' => ['Node.js', 'JavaScript'],
                ],
                'is_completed' => false,
                'is_dismissed' => false,
            ],
            [
                'id' => 4,
                'type' => 'course',
                'title' => 'React Performance Optimization',
                'description' => 'Learn advanced React techniques to build faster, more efficient applications.',
                'category' => 'learning',
                'related_skills' => ['React', 'Performance', 'Frontend Optimization'],
                'url' => 'https://www.pluralsight.com/courses/react-performance-optimization',
                'provider' => 'Pluralsight',
                'priority' => 4,
                'metadata' => [
                    'duration' => '8 hours',
                    'level' => 'Advanced',
                    'rating' => 4.6,
                ],
                'is_completed' => true,
                'is_dismissed' => false,
            ],
            [
                'id' => 5,
                'type' => 'job_role',
                'title' => 'Senior Frontend Developer',
                'description' => 'Based on your skills, you have a 92% match for Senior Frontend Developer roles.',
                'category' => 'career',
                'related_skills' => ['React', 'JavaScript', 'TypeScript', 'CSS'],
                'url' => null,
                'provider' => 'Job Market Analysis',
                'priority' => 5,
                'metadata' => [
                    'match_percentage' => 92,
                    'salary_range' => '$80,000 - $120,000',
                    'demand_level' => 'High',
                ],
                'is_completed' => false,
                'is_dismissed' => false,
            ],
        ];

        $categories = [
            'learning' => [
                'title' => 'Learning & Development',
                'description' => 'Courses and tutorials to improve your skills',
                'count' => 2,
                'icon' => 'BookOpen',
            ],
            'career' => [
                'title' => 'Career Opportunities',
                'description' => 'Job roles and certifications that match your profile',
                'count' => 2,
                'icon' => 'Briefcase',
            ],
            'skill_development' => [
                'title' => 'Skill Development',
                'description' => 'Practical projects and hands-on learning',
                'count' => 1,
                'icon' => 'Target',
            ],
        ];

        return Inertia::render('recommendations/index', [
            'recommendations' => $recommendations,
            'personalizedRecommendations' => $personalizedRecommendations,
            'categories' => $categories,
        ]);
    }
}
