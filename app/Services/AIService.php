<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AIService
{
    protected string $apiKey;
    protected string $model;
    protected string $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.openai.api_key');
        $this->model = config('services.openai.model', 'gpt-4o-mini');
        $this->baseUrl = config('services.openai.base_url', 'https://api.openai.com/v1');
    }

    /**
     * Generate interview questions based on type and difficulty
     */
    public function generateQuestions(string $type, string $difficulty, int $count = 5): array
    {
        $typeLabels = [
            'technical' => 'technical programming and software engineering',
            'behavioral' => 'behavioral and situational',
            'mixed' => 'combination of technical and behavioral',
        ];

        $difficultyLabels = [
            'beginner' => 'beginner level (fundamental concepts)',
            'intermediate' => 'intermediate level (moderate complexity)',
            'advanced' => 'advanced level (complex scenarios and deep knowledge)',
        ];

        $systemPrompt = "You are an expert interview coach. Generate exactly {$count} {$typeLabels[$type]} interview questions suitable for {$difficultyLabels[$difficulty]} candidates. Each question should be realistic, practical, and help assess the candidate's skills. Return ONLY a valid JSON array of strings with the questions, no additional text, markdown, or formatting.";

        $userPrompt = "Generate exactly {$count} {$typeLabels[$type]} interview questions for {$difficultyLabels[$difficulty]} level candidates. Return as a valid JSON array format: [\"Question 1?\", \"Question 2?\", \"Question 3?\"]";

        try {
            $response = $this->makeRequest($systemPrompt, $userPrompt);

            if ($response && isset($response['choices'][0]['message']['content'])) {
                $content = $response['choices'][0]['message']['content'];

                // Try to extract JSON from the response
                $content = trim($content);

                // Remove markdown code blocks if present
                $content = preg_replace('/^```json\s*/', '', $content);
                $content = preg_replace('/^```\s*/', '', $content);
                $content = preg_replace('/\s*```$/', '', $content);

                $questions = json_decode($content, true);

                if (json_last_error() === JSON_ERROR_NONE && is_array($questions)) {
                    return $questions;
                }

                // Fallback: try to parse as a list
                $questions = $this->parseQuestionsFromText($content);
                if (!empty($questions)) {
                    return array_slice($questions, 0, $count);
                }
            }
        } catch (\Exception $e) {
            Log::error('AI question generation error: ' . $e->getMessage());
        }

        // Fallback to default questions
        return $this->getDefaultQuestions($type, $difficulty, $count);
    }

    /**
     * Get conversational response from AI interviewer
     */
    public function getConversationalResponse(array $conversationHistory, string $type, string $difficulty, bool $isInitial = false): ?string
    {
        $typeLabels = [
            'technical' => 'technical programming and software engineering',
            'behavioral' => 'behavioral and situational',
            'mixed' => 'combination of technical and behavioral',
        ];

        $difficultyLabels = [
            'beginner' => 'beginner level',
            'intermediate' => 'intermediate level',
            'advanced' => 'advanced level',
        ];

        $systemPrompt = "You are a friendly and professional interviewer conducting a {$typeLabels[$type]} interview for a {$difficultyLabels[$difficulty]} candidate. Your goal is to have a natural, conversational interview.

Guidelines:
- Ask one question at a time
- After the candidate answers, provide brief acknowledgment or ask a follow-up question to probe deeper
- Be encouraging and supportive
- Move to the next topic naturally when you've gathered enough information
- Keep responses concise (1-2 sentences)
- Make it feel like a real conversation, not a scripted interview
- Use the candidate's answers to ask relevant follow-ups
- When you've covered enough topics, naturally conclude the interview

Keep your responses natural and conversational.";

        // Build messages array from conversation history
        $messages = [
            ['role' => 'system', 'content' => $systemPrompt],
        ];

        // Add conversation history
        if (!empty($conversationHistory)) {
            foreach ($conversationHistory as $message) {
                $messages[] = [
                    'role' => $message['role'] ?? 'user',
                    'content' => $message['content'] ?? '',
                ];
            }
        } else if ($isInitial) {
            // Initial greeting and first question
            $messages[] = [
                'role' => 'user',
                'content' => "Start the interview. Greet the candidate and ask the first question.",
            ];
        }

        try {
            $response = $this->makeConversationalRequest($messages);

            if ($response && isset($response['choices'][0]['message']['content'])) {
                return trim($response['choices'][0]['message']['content']);
            }
        } catch (\Exception $e) {
            Log::error('AI conversational response error: ' . $e->getMessage());
        }

        // Fallback response
        if ($isInitial) {
            return "Hello! Thank you for taking the time to interview with us today. Let's start with a question: Can you tell me about your background and experience in this field?";
        }

        return "Thank you for that answer. Could you tell me more about that?";
    }

    /**
     * Make conversational API request with message history
     */
    protected function makeConversationalRequest(array $messages): ?array
    {
        if (empty($this->apiKey)) {
            Log::error('OpenAI API key is not configured');
            return null;
        }

        try {
            $response = Http::timeout(60)
                ->withHeaders([
                    'Authorization' => 'Bearer ' . $this->apiKey,
                    'Content-Type' => 'application/json',
                ])
                ->post("{$this->baseUrl}/chat/completions", [
                    'model' => $this->model,
                    'messages' => $messages,
                    'temperature' => 0.8, // More creative/conversational
                    'max_tokens' => 300, // Keep responses concise
                ]);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('OpenAI conversational API request failed: ' . $response->body());
        } catch (\Exception $e) {
            Log::error('OpenAI conversational API request exception: ' . $e->getMessage());
        }

        return null;
    }

    /**
     * Generate feedback and score for interview answers
     */
    public function generateFeedback(array $questions, array $answers, string $type, string $difficulty): array
    {
        $systemPrompt = "You are an expert interview evaluator. Analyze the candidate's answers and provide detailed, constructive feedback for each question. Also provide an overall score from 0-100 based on answer quality, relevance, and depth. Return ONLY a valid JSON object with this exact structure: {\"feedback\": {\"Question text here\": \"feedback text\", ...}, \"overall_score\": 85, \"overall_feedback\": \"summary of performance\"}. No markdown, no additional text.";

        $userPrompt = "Interview Type: {$type}\nDifficulty Level: {$difficulty}\n\n";

        foreach ($questions as $index => $question) {
            $answer = $answers[$question] ?? 'No answer provided';
            $userPrompt .= "Question " . ($index + 1) . ": {$question}\n";
            $userPrompt .= "Candidate's Answer: {$answer}\n\n";
        }

        $userPrompt .= "Provide detailed, constructive feedback for each answer and an overall score from 0-100. Return ONLY the JSON object, no other text.";

        try {
            $response = $this->makeRequest($systemPrompt, $userPrompt);

            if ($response && isset($response['choices'][0]['message']['content'])) {
                $content = $response['choices'][0]['message']['content'];

                // Clean the content
                $content = trim($content);
                $content = preg_replace('/^```json\s*/', '', $content);
                $content = preg_replace('/^```\s*/', '', $content);
                $content = preg_replace('/\s*```$/', '', $content);

                $feedback = json_decode($content, true);

                if (json_last_error() === JSON_ERROR_NONE && is_array($feedback)) {
                    return $feedback;
                }
            }
        } catch (\Exception $e) {
            Log::error('AI feedback generation error: ' . $e->getMessage());
        }

        // Fallback feedback
        return [
            'feedback' => [],
            'overall_score' => 70,
            'overall_feedback' => 'Feedback generation unavailable. Please review your answers manually.',
        ];
    }

    /**
     * Make API request to OpenAI API
     */
    protected function makeRequest(string $systemPrompt, string $userPrompt): ?array
    {
        if (empty($this->apiKey)) {
            Log::error('OpenAI API key is not configured');
            return null;
        }

        try {
            $response = Http::timeout(60)
                ->withHeaders([
                    'Authorization' => 'Bearer ' . $this->apiKey,
                    'Content-Type' => 'application/json',
                ])
                ->post("{$this->baseUrl}/chat/completions", [
                    'model' => $this->model,
                    'messages' => [
                        ['role' => 'system', 'content' => $systemPrompt],
                        ['role' => 'user', 'content' => $userPrompt],
                    ],
                    'temperature' => 0.7,
                    'max_tokens' => 2000,
                ]);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('OpenAI API request failed: ' . $response->body());
        } catch (\Exception $e) {
            Log::error('OpenAI API request exception: ' . $e->getMessage());
        }

        return null;
    }

    /**
     * Parse questions from text response
     */
    protected function parseQuestionsFromText(string $text): array
    {
        $questions = [];
        $lines = explode("\n", $text);

        foreach ($lines as $line) {
            $line = trim($line);
            if (empty($line)) continue;

            // Remove list markers
            $line = preg_replace('/^(\d+[\.\)]\s*|[-*]\s*)/', '', $line);

            // Check if it looks like a question
            if (strlen($line) > 10 && (str_contains($line, '?') || strlen($line) > 30)) {
                $questions[] = $line;
            }
        }

        return $questions;
    }

    /**
     * Get default questions as fallback
     */
    protected function getDefaultQuestions(string $type, string $difficulty, int $count): array
    {
        $defaultQuestions = [
            'technical' => [
                'beginner' => [
                    'What is the difference between a variable and a constant?',
                    'Explain what a function is in programming.',
                    'What is the purpose of an if statement?',
                    'What is object-oriented programming?',
                    'Explain the concept of loops in programming.',
                ],
                'intermediate' => [
                    'Explain the difference between REST and GraphQL APIs.',
                    'What is the difference between SQL JOIN types?',
                    'How does garbage collection work in programming languages?',
                    'Explain the difference between async and sync programming.',
                    'What are design patterns? Give an example.',
                ],
                'advanced' => [
                    'Explain the trade-offs between microservices and monolithic architecture.',
                    'How would you design a distributed caching system?',
                    'Explain the CAP theorem and its implications.',
                    'How would you optimize a slow database query?',
                    'Explain database sharding strategies.',
                ],
            ],
            'behavioral' => [
                'beginner' => [
                    'Tell me about yourself.',
                    'Why are you interested in this role?',
                    'What are your greatest strengths?',
                    'Where do you see yourself in 5 years?',
                    'Why should we hire you?',
                ],
                'intermediate' => [
                    'Describe a time when you had to work under pressure.',
                    'Tell me about a challenge you faced and how you overcame it.',
                    'Give an example of when you worked effectively in a team.',
                    'Describe a situation where you had to learn something new quickly.',
                    'Tell me about a time you had to adapt to change.',
                ],
                'advanced' => [
                    'Describe a situation where you had to make a difficult decision with limited information.',
                    'Tell me about a time you had to convince others of your idea.',
                    'Describe a conflict you resolved in a professional setting.',
                    'Give an example of when you had to lead without authority.',
                    'Tell me about a complex problem you solved.',
                ],
            ],
            'mixed' => [
                'beginner' => [
                    'What is your biggest technical achievement?',
                    'How do you approach learning new technologies?',
                    'Describe a project you are proud of.',
                    'How do you stay updated with technology trends?',
                    'What motivates you in your work?',
                ],
                'intermediate' => [
                    'How do you balance technical requirements with business needs?',
                    'Describe your experience with agile development.',
                    'How do you handle technical debt in your projects?',
                    'Tell me about a time you had to explain a complex technical concept to a non-technical person.',
                    'How do you ensure code quality in your projects?',
                ],
                'advanced' => [
                    'Describe a complex technical problem you solved and the approach you took.',
                    'How do you mentor junior developers?',
                    'Explain a time you had to make a technical decision that affected the entire team.',
                    'Describe your approach to system architecture and design.',
                    'Tell me about a time you had to refactor a large codebase.',
                ],
            ],
        ];

        $questions = $defaultQuestions[$type][$difficulty] ?? [];
        return array_slice($questions, 0, $count);
    }
}

