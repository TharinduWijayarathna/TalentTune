<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AiChatController extends Controller
{
    public function index(): Response
    {
        // Available AI models
        $availableModels = [
            [
                'id' => 'gpt-4',
                'name' => 'GPT-4',
                'description' => 'Most capable model for complex tasks',
                'provider' => 'OpenAI',
                'maxTokens' => 8192,
                'cost' => 'High',
                'icon' => '🤖',
                'capabilities' => ['Complex reasoning', 'Creative writing', 'Code generation', 'Analysis'],
            ],
            [
                'id' => 'gpt-3.5-turbo',
                'name' => 'GPT-3.5 Turbo',
                'description' => 'Fast and efficient for most tasks',
                'provider' => 'OpenAI',
                'maxTokens' => 4096,
                'cost' => 'Medium',
                'icon' => '⚡',
                'capabilities' => ['General chat', 'Quick responses', 'Code help', 'Writing'],
            ],
            [
                'id' => 'claude-3-opus',
                'name' => 'Claude 3 Opus',
                'description' => 'Anthropic\'s most powerful model',
                'provider' => 'Anthropic',
                'maxTokens' => 200000,
                'cost' => 'High',
                'icon' => '🧠',
                'capabilities' => ['Long context', 'Analysis', 'Writing', 'Reasoning'],
            ],
            [
                'id' => 'claude-3-sonnet',
                'name' => 'Claude 3 Sonnet',
                'description' => 'Balanced performance and speed',
                'provider' => 'Anthropic',
                'maxTokens' => 200000,
                'cost' => 'Medium',
                'icon' => '🎭',
                'capabilities' => ['Balanced performance', 'Code', 'Analysis', 'Creative tasks'],
            ],
            [
                'id' => 'gemini-pro',
                'name' => 'Gemini Pro',
                'description' => 'Google\'s advanced AI model',
                'provider' => 'Google',
                'maxTokens' => 30720,
                'cost' => 'Medium',
                'icon' => '💎',
                'capabilities' => ['Multimodal', 'Code generation', 'Analysis', 'Creative'],
            ],
            [
                'id' => 'llama-2-70b',
                'name' => 'Llama 2 70B',
                'description' => 'Open source large language model',
                'provider' => 'Meta',
                'maxTokens' => 4096,
                'cost' => 'Low',
                'icon' => '🦙',
                'capabilities' => ['Open source', 'Code', 'General purpose', 'Research'],
            ],
        ];

        // Get user's recent chat history (mock data for now)
        $chatHistory = [
            [
                'id' => 1,
                'type' => 'user',
                'message' => 'What skills should I focus on for a frontend developer role?',
                'timestamp' => now()->subMinutes(5)->toISOString(),
                'model' => 'gpt-4',
            ],
            [
                'id' => 2,
                'type' => 'ai',
                'message' => 'Based on your resume analysis, I recommend focusing on these key frontend skills:\n\n1. **React/Next.js** - You have basic React knowledge, but advanced patterns would help\n2. **TypeScript** - Essential for modern frontend development\n3. **CSS Frameworks** - Tailwind CSS, styled-components\n4. **Testing** - Jest, React Testing Library\n5. **Build Tools** - Vite, Webpack\n\nWould you like me to suggest specific learning resources for any of these?',
                'timestamp' => now()->subMinutes(4)->toISOString(),
                'model' => 'gpt-4',
            ],
            [
                'id' => 3,
                'type' => 'user',
                'message' => 'How can I improve my resume for ATS systems?',
                'timestamp' => now()->subMinutes(2)->toISOString(),
                'model' => 'gpt-4',
            ],
            [
                'id' => 4,
                'type' => 'ai',
                'message' => 'Here are the top ATS optimization tips for your resume:\n\n**Format & Structure:**\n- Use standard section headers (Experience, Education, Skills)\n- Avoid tables, columns, or complex layouts\n- Use simple bullet points\n\n**Keywords:**\n- Include job-specific keywords from the job description\n- Use both acronyms and full forms (e.g., "JavaScript (JS)")\n- Add technical skills prominently\n\n**Content:**\n- Use action verbs (Developed, Implemented, Led)\n- Include quantifiable achievements\n- Keep descriptions concise but impactful\n\nWould you like me to analyze your current resume for ATS optimization?',
                'timestamp' => now()->subMinutes(1)->toISOString(),
                'model' => 'gpt-4',
            ],
        ];

        // Get suggested questions
        $suggestedQuestions = [
            'What skills should I focus on for my target role?',
            'How can I improve my resume for ATS systems?',
            'What are the trending technologies in my field?',
            'How do I write better bullet points for my experience?',
            'What certifications would benefit my career?',
            'How can I quantify my achievements better?',
            'What soft skills should I highlight?',
            'How do I optimize my LinkedIn profile?',
        ];

        // Get user's skill profile for context
        $user = auth()->user();
        $userSkills = $user->resumes()
            ->where('is_processed', true)
            ->get()
            ->pluck('extracted_skills')
            ->flatten()
            ->unique()
            ->values()
            ->toArray();

        return Inertia::render('ai-chat/index', [
            'availableModels' => $availableModels,
            'chatHistory' => $chatHistory,
            'suggestedQuestions' => $suggestedQuestions,
            'userSkills' => $userSkills,
        ]);
    }

    public function sendMessage(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:1000',
            'model' => 'required|string',
        ]);

        $userMessage = $request->input('message');
        $selectedModel = $request->input('model');

        // Mock AI response based on message content and selected model
        $aiResponse = $this->generateAiResponse($userMessage, $selectedModel);

        // In a real application, you would:
        // 1. Send the message to the selected AI service (OpenAI, Claude, etc.)
        // 2. Store the conversation in the database
        // 3. Return the AI response

        return response()->json([
            'success' => true,
            'aiResponse' => $aiResponse,
            'model' => $selectedModel,
            'timestamp' => now()->toISOString(),
        ]);
    }

    private function generateAiResponse(string $message, string $model): string
    {
        $message = strtolower($message);

        // Simple keyword-based responses (in production, use actual AI)
        if (str_contains($message, 'skill') && str_contains($message, 'focus')) {
            return "Based on your profile, I recommend focusing on these high-impact skills:\n\n**Technical Skills:**\n- Advanced JavaScript/TypeScript\n- Modern frameworks (React, Vue, Angular)\n- Cloud platforms (AWS, Azure)\n- DevOps tools (Docker, Kubernetes)\n\n**Soft Skills:**\n- Leadership and team management\n- Problem-solving and critical thinking\n- Communication and presentation\n\n**Next Steps:**\n1. Take our skill assessment quiz\n2. Check out personalized learning recommendations\n3. Practice with hands-on projects\n\nWould you like specific learning resources for any of these areas?";
        }

        if (str_contains($message, 'resume') && (str_contains($message, 'ats') || str_contains($message, 'optimize'))) {
            return "Here's how to optimize your resume for ATS systems:\n\n**Format Optimization:**\n- Use standard fonts (Arial, Calibri, Times New Roman)\n- Avoid graphics, tables, or complex layouts\n- Use simple bullet points and clear headers\n- Save as PDF for best compatibility\n\n**Keyword Strategy:**\n- Include exact keywords from job descriptions\n- Use both acronyms and full forms\n- Place keywords in multiple sections\n- Use industry-standard terminology\n\n**Content Structure:**\n- Lead with strong action verbs\n- Include quantifiable achievements\n- Keep descriptions concise (2-3 lines max)\n- Use consistent formatting throughout\n\nWould you like me to analyze your current resume for specific improvements?";
        }

        if (str_contains($message, 'interview') || str_contains($message, 'prepare')) {
            return "Here's a comprehensive interview preparation strategy:\n\n**Technical Preparation:**\n- Review job requirements and prepare relevant examples\n- Practice coding problems (if applicable)\n- Prepare questions about the company and role\n- Research the company's recent news and projects\n\n**Behavioral Questions:**\n- Use the STAR method (Situation, Task, Action, Result)\n- Prepare 5-7 strong examples covering different scenarios\n- Practice explaining your thought process\n- Be ready to discuss failures and lessons learned\n\n**Company Research:**\n- Understand their mission, values, and culture\n- Research their products/services and market position\n- Check their recent press releases and social media\n- Prepare thoughtful questions about their challenges\n\nWould you like me to help you practice specific interview questions?";
        }

        if (str_contains($message, 'career') && str_contains($message, 'path')) {
            return "Let me help you explore career paths based on your skills:\n\n**Current Skill Analysis:**\nBased on your resume, you have strong foundations in development and problem-solving.\n\n**Potential Career Paths:**\n1. **Senior Developer** - Deepen technical expertise\n2. **Tech Lead** - Combine technical and leadership skills\n3. **Product Manager** - Bridge technical and business domains\n4. **Solutions Architect** - Design complex systems\n5. **DevOps Engineer** - Focus on infrastructure and automation\n\n**Growth Recommendations:**\n- Take on leadership opportunities in current role\n- Learn cloud technologies and modern architectures\n- Develop business acumen and communication skills\n- Consider relevant certifications\n\nWhat specific career direction interests you most?";
        }

        if (str_contains($message, 'salary') || str_contains($message, 'compensation')) {
            return "Here's how to approach salary negotiations:\n\n**Research & Preparation:**\n- Use salary databases (Glassdoor, PayScale, LinkedIn)\n- Consider location, experience level, and company size\n- Research the company's compensation philosophy\n- Prepare your value proposition with specific achievements\n\n**Negotiation Strategy:**\n- Wait for them to make the first offer\n- Focus on total compensation, not just base salary\n- Highlight unique skills and contributions\n- Be prepared to walk away if needed\n\n**Timing:**\n- Negotiate after receiving an offer, not during interviews\n- Be respectful and professional\n- Show enthusiasm for the role while discussing compensation\n\n**Alternative Benefits:**\n- Flexible work arrangements\n- Professional development budget\n- Equity or stock options\n- Additional vacation time\n\nWould you like help preparing your value proposition?";
        }

        // Default response
        return "I'm here to help with your career development! I can assist with:\n\n**Resume & Job Search:**\n- Resume optimization and ATS compliance\n- Job search strategies and networking\n- Interview preparation and practice\n\n**Skill Development:**\n- Identifying skill gaps and learning paths\n- Technology trends and recommendations\n- Certification and course suggestions\n\n**Career Growth:**\n- Career path planning and goal setting\n- Salary negotiation strategies\n- Leadership and soft skill development\n\n**Industry Insights:**\n- Market trends and opportunities\n- Company research and culture fit\n- Professional networking tips\n\nWhat specific area would you like to explore? Feel free to ask me anything about your career development!";
    }
}
