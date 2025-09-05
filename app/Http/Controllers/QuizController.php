<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QuizController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();

        // Get user's quizzes
        $quizzes = $user->quizzes()->latest()->get();

        // Mock data for available quizzes - in real app, this would come from AI generation
        $availableQuizzes = [
            [
                'id' => 1,
                'title' => 'JavaScript Fundamentals',
                'description' => 'Test your knowledge of JavaScript basics, ES6 features, and common patterns.',
                'difficulty' => 'Beginner',
                'questions_count' => 10,
                'time_limit' => 15,
                'skill_focus' => ['JavaScript', 'ES6', 'DOM'],
                'is_completed' => false,
            ],
            [
                'id' => 2,
                'title' => 'React.js Advanced Concepts',
                'description' => 'Advanced React concepts including hooks, context, and performance optimization.',
                'difficulty' => 'Advanced',
                'questions_count' => 15,
                'time_limit' => 25,
                'skill_focus' => ['React', 'Hooks', 'Context API'],
                'is_completed' => false,
            ],
            [
                'id' => 3,
                'title' => 'Node.js & Backend Development',
                'description' => 'Server-side JavaScript, APIs, databases, and backend architecture.',
                'difficulty' => 'Intermediate',
                'questions_count' => 12,
                'time_limit' => 20,
                'skill_focus' => ['Node.js', 'Express', 'MongoDB'],
                'is_completed' => true,
                'score' => 85,
            ],
        ];

        return Inertia::render('quizzes/index', [
            'quizzes' => $quizzes,
            'availableQuizzes' => $availableQuizzes,
        ]);
    }

    public function show(Quiz $quiz): Response
    {
        $this->authorize('view', $quiz);

        // Mock quiz questions - in real app, this would come from AI generation
        $questions = [
            [
                'id' => 1,
                'question' => 'What is the correct way to declare a variable in JavaScript?',
                'type' => 'multiple_choice',
                'options' => [
                    'var name = "John";',
                    'variable name = "John";',
                    'v name = "John";',
                    'declare name = "John";',
                ],
                'correct_answer' => 0,
                'explanation' => 'The correct way to declare a variable in JavaScript is using var, let, or const keywords.',
            ],
            [
                'id' => 2,
                'question' => 'Which method is used to add an element to the end of an array?',
                'type' => 'multiple_choice',
                'options' => [
                    'push()',
                    'pop()',
                    'shift()',
                    'unshift()',
                ],
                'correct_answer' => 0,
                'explanation' => 'The push() method adds one or more elements to the end of an array.',
            ],
            [
                'id' => 3,
                'question' => 'What does the "this" keyword refer to in JavaScript?',
                'type' => 'multiple_choice',
                'options' => [
                    'The current function',
                    'The current object',
                    'The global object',
                    'It depends on how the function is called',
                ],
                'correct_answer' => 3,
                'explanation' => 'The value of "this" depends on how a function is called and the context in which it is executed.',
            ],
        ];

        return Inertia::render('quizzes/show', [
            'quiz' => $quiz,
            'questions' => $questions,
        ]);
    }

    public function submit(Request $request, Quiz $quiz)
    {
        $this->authorize('update', $quiz);

        $request->validate([
            'answers' => 'required|array',
            'answers.*' => 'required|integer',
        ]);

        $answers = $request->input('answers');
        $questions = $quiz->questions ?? [];

        $correctAnswers = 0;
        $totalQuestions = count($questions);

        foreach ($questions as $index => $question) {
            if (isset($answers[$index]) && $answers[$index] === $question['correct_answer']) {
                $correctAnswers++;
            }
        }

        $score = $totalQuestions > 0 ? round(($correctAnswers / $totalQuestions) * 100) : 0;

        $quiz->update([
            'is_completed' => true,
            'score' => $score,
            'answers' => $answers,
        ]);

        return redirect()->route('quizzes.show', $quiz)
            ->with('success', 'Quiz completed! Your score: '.$score.'%');
    }
}
