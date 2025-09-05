<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class LearningController extends Controller
{
    public function index(): Response
    {
        // Mock learning paths data
        $learningPaths = [
            [
                'id' => 1,
                'title' => 'Full Stack Web Development',
                'description' => 'Master modern web development with React, Node.js, and cloud technologies',
                'duration' => '6 months',
                'difficulty' => 'Intermediate',
                'progress' => 65,
                'skills_covered' => ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL'],
                'courses' => [
                    ['title' => 'React Fundamentals', 'completed' => true, 'progress' => 100],
                    ['title' => 'Node.js Backend Development', 'completed' => true, 'progress' => 100],
                    ['title' => 'TypeScript Mastery', 'completed' => false, 'progress' => 75],
                    ['title' => 'AWS Cloud Services', 'completed' => false, 'progress' => 30],
                    ['title' => 'Database Design', 'completed' => false, 'progress' => 0],
                ],
                'recommended' => true,
            ],
            [
                'id' => 2,
                'title' => 'Data Science & Analytics',
                'description' => 'Learn data analysis, machine learning, and statistical modeling',
                'duration' => '8 months',
                'difficulty' => 'Advanced',
                'progress' => 25,
                'skills_covered' => ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics'],
                'courses' => [
                    ['title' => 'Python for Data Science', 'completed' => true, 'progress' => 100],
                    ['title' => 'Statistical Analysis', 'completed' => false, 'progress' => 50],
                    ['title' => 'Machine Learning Basics', 'completed' => false, 'progress' => 0],
                    ['title' => 'Data Visualization', 'completed' => false, 'progress' => 0],
                ],
                'recommended' => false,
            ],
        ];

        $courses = [
            [
                'id' => 1,
                'title' => 'Advanced React Patterns',
                'provider' => 'Coursera',
                'instructor' => 'John Smith',
                'rating' => 4.8,
                'duration' => '4 weeks',
                'price' => '$49',
                'level' => 'Advanced',
                'skills' => ['React', 'JavaScript', 'Hooks', 'Context API'],
                'description' => 'Learn advanced React patterns and best practices for building scalable applications.',
                'enrolled' => false,
            ],
            [
                'id' => 2,
                'title' => 'AWS Solutions Architect',
                'provider' => 'AWS Training',
                'instructor' => 'AWS Team',
                'rating' => 4.9,
                'duration' => '6 weeks',
                'price' => 'Free',
                'level' => 'Intermediate',
                'skills' => ['AWS', 'Cloud Architecture', 'DevOps'],
                'description' => 'Comprehensive AWS training for solutions architecture certification.',
                'enrolled' => true,
            ],
        ];

        $certifications = [
            [
                'id' => 1,
                'name' => 'AWS Certified Solutions Architect',
                'provider' => 'Amazon Web Services',
                'status' => 'In Progress',
                'expiry_date' => '2025-12-31',
                'progress' => 40,
                'description' => 'Validates technical expertise in designing distributed systems on AWS.',
            ],
            [
                'id' => 2,
                'name' => 'React Developer Certification',
                'provider' => 'Meta',
                'status' => 'Completed',
                'expiry_date' => '2026-06-15',
                'progress' => 100,
                'description' => 'Certifies proficiency in React development and modern JavaScript.',
            ],
        ];

        $achievements = [
            [
                'id' => 1,
                'title' => 'React Master',
                'description' => 'Completed 5 React courses',
                'icon' => '🎯',
                'earned_date' => '2024-01-10',
            ],
            [
                'id' => 2,
                'title' => 'Learning Streak',
                'description' => '7 days of continuous learning',
                'icon' => '🔥',
                'earned_date' => '2024-01-15',
            ],
        ];

        return Inertia::render('learning/index', [
            'learningPaths' => $learningPaths,
            'courses' => $courses,
            'certifications' => $certifications,
            'achievements' => $achievements,
        ]);
    }

    public function showPath($id): Response
    {
        // Mock detailed learning path
        $path = [
            'id' => $id,
            'title' => 'Full Stack Web Development',
            'description' => 'Master modern web development with React, Node.js, and cloud technologies',
            'duration' => '6 months',
            'difficulty' => 'Intermediate',
            'progress' => 65,
            'skills_covered' => ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL'],
            'courses' => [
                [
                    'id' => 1,
                    'title' => 'React Fundamentals',
                    'description' => 'Learn the basics of React including components, state, and props',
                    'duration' => '3 weeks',
                    'completed' => true,
                    'progress' => 100,
                    'lessons' => [
                        ['title' => 'Introduction to React', 'completed' => true],
                        ['title' => 'Components and JSX', 'completed' => true],
                        ['title' => 'State and Props', 'completed' => true],
                        ['title' => 'Event Handling', 'completed' => true],
                    ],
                ],
                [
                    'id' => 2,
                    'title' => 'Node.js Backend Development',
                    'description' => 'Build server-side applications with Node.js and Express',
                    'duration' => '4 weeks',
                    'completed' => true,
                    'progress' => 100,
                    'lessons' => [
                        ['title' => 'Node.js Basics', 'completed' => true],
                        ['title' => 'Express Framework', 'completed' => true],
                        ['title' => 'RESTful APIs', 'completed' => true],
                        ['title' => 'Database Integration', 'completed' => true],
                    ],
                ],
            ],
        ];

        return Inertia::render('learning/path', [
            'path' => $path,
        ]);
    }
}
