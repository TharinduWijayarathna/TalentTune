<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InterviewController extends Controller
{
    public function index(): Response
    {
        // Mock interview sessions
        $interviewSessions = [
            [
                'id' => 1,
                'type' => 'Technical Interview',
                'role' => 'Frontend Developer',
                'company' => 'TechCorp Inc.',
                'date' => '2024-01-20',
                'duration' => '60 minutes',
                'status' => 'Scheduled',
                'preparation_tips' => [
                    'Review React fundamentals',
                    'Practice coding challenges',
                    'Prepare questions about the company',
                ],
            ],
            [
                'id' => 2,
                'type' => 'Behavioral Interview',
                'role' => 'Full Stack Developer',
                'company' => 'StartupXYZ',
                'date' => '2024-01-18',
                'duration' => '45 minutes',
                'status' => 'Completed',
                'score' => 85,
                'feedback' => 'Strong technical skills, could improve on system design questions.',
            ],
        ];

        // Mock practice sessions
        $practiceSessions = [
            [
                'id' => 1,
                'type' => 'Mock Technical Interview',
                'role' => 'Frontend Developer',
                'completed_date' => '2024-01-15',
                'score' => 78,
                'duration' => '45 minutes',
                'questions_answered' => 8,
                'feedback' => 'Good problem-solving approach, work on time management.',
            ],
            [
                'id' => 2,
                'type' => 'Behavioral Questions Practice',
                'role' => 'Software Engineer',
                'completed_date' => '2024-01-12',
                'score' => 92,
                'duration' => '30 minutes',
                'questions_answered' => 5,
                'feedback' => 'Excellent use of STAR method, very articulate responses.',
            ],
        ];

        // Mock question banks
        $questionBanks = [
            [
                'id' => 1,
                'category' => 'Technical',
                'title' => 'React & JavaScript',
                'question_count' => 25,
                'difficulty' => 'Mixed',
                'last_updated' => '2024-01-10',
            ],
            [
                'id' => 2,
                'category' => 'Behavioral',
                'title' => 'Leadership & Teamwork',
                'question_count' => 15,
                'difficulty' => 'Mixed',
                'last_updated' => '2024-01-08',
            ],
            [
                'id' => 3,
                'category' => 'System Design',
                'title' => 'Architecture & Scalability',
                'question_count' => 12,
                'difficulty' => 'Advanced',
                'last_updated' => '2024-01-05',
            ],
        ];

        return Inertia::render('interview/index', [
            'interviewSessions' => $interviewSessions,
            'practiceSessions' => $practiceSessions,
            'questionBanks' => $questionBanks,
        ]);
    }

    public function practice(Request $request): Response
    {
        $type = $request->get('type', 'technical');
        $role = $request->get('role', 'frontend-developer');

        // Mock practice questions
        $questions = [
            [
                'id' => 1,
                'question' => 'Explain the difference between let, const, and var in JavaScript.',
                'type' => 'technical',
                'difficulty' => 'beginner',
                'category' => 'JavaScript',
                'sample_answer' => 'var has function scope and can be redeclared, let has block scope and cannot be redeclared, const has block scope and cannot be reassigned.',
                'tips' => ['Focus on scope differences', 'Mention hoisting behavior'],
            ],
            [
                'id' => 2,
                'question' => 'Tell me about a time when you had to work with a difficult team member.',
                'type' => 'behavioral',
                'difficulty' => 'intermediate',
                'category' => 'Teamwork',
                'sample_answer' => 'Use the STAR method: Situation, Task, Action, Result.',
                'tips' => ['Stay positive', 'Focus on resolution', 'Show emotional intelligence'],
            ],
        ];

        return Inertia::render('interview/practice', [
            'questions' => $questions,
            'type' => $type,
            'role' => $role,
        ]);
    }

    public function startMockInterview(Request $request)
    {
        $request->validate([
            'type' => 'required|in:technical,behavioral,system-design',
            'role' => 'required|string',
            'duration' => 'required|integer|min:15|max:120',
        ]);

        // Mock interview session creation
        $sessionId = rand(1000, 9999);

        return response()->json([
            'success' => true,
            'session_id' => $sessionId,
            'message' => 'Mock interview session started!',
        ]);
    }

    public function submitAnswer(Request $request)
    {
        $request->validate([
            'question_id' => 'required|integer',
            'answer' => 'required|string',
            'session_id' => 'required|integer',
        ]);

        // Mock answer submission and AI feedback
        $feedback = [
            'score' => rand(70, 95),
            'strengths' => ['Clear explanation', 'Good technical knowledge'],
            'improvements' => ['Could provide more examples', 'Consider edge cases'],
            'suggestions' => ['Practice similar questions', 'Review related concepts'],
        ];

        return response()->json([
            'success' => true,
            'feedback' => $feedback,
        ]);
    }
}
