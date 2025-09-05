<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function index(): Response
    {
        // Mock portfolio projects
        $projects = [
            [
                'id' => 1,
                'title' => 'E-Commerce Platform',
                'description' => 'Full-stack e-commerce application built with React, Node.js, and PostgreSQL',
                'technologies' => ['React', 'Node.js', 'PostgreSQL', 'Stripe API', 'AWS'],
                'image' => '/images/projects/ecommerce.jpg',
                'live_url' => 'https://ecommerce-demo.com',
                'github_url' => 'https://github.com/user/ecommerce',
                'featured' => true,
                'created_date' => '2024-01-10',
                'category' => 'Web Application',
                'status' => 'Completed',
            ],
            [
                'id' => 2,
                'title' => 'Task Management App',
                'description' => 'Collaborative task management tool with real-time updates and team collaboration features',
                'technologies' => ['React', 'TypeScript', 'Socket.io', 'MongoDB', 'Express'],
                'image' => '/images/projects/taskapp.jpg',
                'live_url' => 'https://taskapp-demo.com',
                'github_url' => 'https://github.com/user/taskapp',
                'featured' => true,
                'created_date' => '2023-12-15',
                'category' => 'Web Application',
                'status' => 'Completed',
            ],
            [
                'id' => 3,
                'title' => 'Weather Dashboard',
                'description' => 'Real-time weather dashboard with location-based forecasts and data visualization',
                'technologies' => ['React', 'Chart.js', 'OpenWeather API', 'CSS3'],
                'image' => '/images/projects/weather.jpg',
                'live_url' => 'https://weather-demo.com',
                'github_url' => 'https://github.com/user/weather',
                'featured' => false,
                'created_date' => '2023-11-20',
                'category' => 'Dashboard',
                'status' => 'Completed',
            ],
        ];

        // Mock GitHub repositories
        $repositories = [
            [
                'id' => 1,
                'name' => 'ecommerce-platform',
                'description' => 'Full-stack e-commerce application',
                'language' => 'JavaScript',
                'stars' => 15,
                'forks' => 8,
                'updated' => '2024-01-12',
                'url' => 'https://github.com/user/ecommerce-platform',
            ],
            [
                'id' => 2,
                'name' => 'task-management-app',
                'description' => 'Real-time collaborative task management',
                'language' => 'TypeScript',
                'stars' => 23,
                'forks' => 12,
                'updated' => '2024-01-08',
                'url' => 'https://github.com/user/task-management-app',
            ],
        ];

        // Mock achievements
        $achievements = [
            [
                'id' => 1,
                'title' => 'Open Source Contributor',
                'description' => 'Contributed to 5+ open source projects',
                'icon' => '🏆',
                'date' => '2024-01-15',
            ],
            [
                'id' => 2,
                'title' => 'Hackathon Winner',
                'description' => '1st place in TechCrunch Disrupt Hackathon',
                'icon' => '🥇',
                'date' => '2023-12-10',
            ],
        ];

        // Mock testimonials
        $testimonials = [
            [
                'id' => 1,
                'name' => 'Sarah Johnson',
                'role' => 'Product Manager',
                'company' => 'TechCorp',
                'content' => 'Excellent work on the e-commerce platform. The attention to detail and user experience was outstanding.',
                'rating' => 5,
            ],
            [
                'id' => 2,
                'name' => 'Mike Chen',
                'role' => 'CTO',
                'company' => 'StartupXYZ',
                'content' => 'Great problem-solving skills and clean code. Would definitely work with again.',
                'rating' => 5,
            ],
        ];

        return Inertia::render('portfolio/index', [
            'projects' => $projects,
            'repositories' => $repositories,
            'achievements' => $achievements,
            'testimonials' => $testimonials,
        ]);
    }

    public function show($id): Response
    {
        // Mock detailed project data
        $project = [
            'id' => $id,
            'title' => 'E-Commerce Platform',
            'description' => 'A comprehensive e-commerce platform built with modern web technologies. Features include user authentication, product catalog, shopping cart, payment processing, and admin dashboard.',
            'long_description' => 'This project demonstrates full-stack development skills with a focus on user experience and performance. The application handles thousands of products and users with real-time inventory management and secure payment processing.',
            'technologies' => ['React', 'Node.js', 'PostgreSQL', 'Stripe API', 'AWS', 'Docker'],
            'images' => [
                '/images/projects/ecommerce-1.jpg',
                '/images/projects/ecommerce-2.jpg',
                '/images/projects/ecommerce-3.jpg',
            ],
            'live_url' => 'https://ecommerce-demo.com',
            'github_url' => 'https://github.com/user/ecommerce',
            'featured' => true,
            'created_date' => '2024-01-10',
            'category' => 'Web Application',
            'status' => 'Completed',
            'challenges' => [
                'Implementing real-time inventory updates',
                'Optimizing database queries for large product catalogs',
                'Ensuring secure payment processing',
            ],
            'solutions' => [
                'Used WebSocket connections for real-time updates',
                'Implemented database indexing and query optimization',
                'Integrated Stripe API with proper security measures',
            ],
            'metrics' => [
                ['label' => 'Performance Score', 'value' => '95/100'],
                ['label' => 'Accessibility Score', 'value' => '98/100'],
                ['label' => 'SEO Score', 'value' => '92/100'],
            ],
        ];

        return Inertia::render('portfolio/show', [
            'project' => $project,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'technologies' => 'required|array',
            'category' => 'required|string',
            'live_url' => 'nullable|url',
            'github_url' => 'nullable|url',
        ]);

        // Mock project creation
        return response()->json([
            'success' => true,
            'message' => 'Project added successfully!',
            'project_id' => rand(1000, 9999),
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'technologies' => 'required|array',
            'category' => 'required|string',
            'live_url' => 'nullable|url',
            'github_url' => 'nullable|url',
        ]);

        // Mock project update
        return response()->json([
            'success' => true,
            'message' => 'Project updated successfully!',
        ]);
    }

    public function destroy($id)
    {
        // Mock project deletion
        return response()->json([
            'success' => true,
            'message' => 'Project deleted successfully!',
        ]);
    }
}
