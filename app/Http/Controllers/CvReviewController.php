<?php

namespace App\Http\Controllers;

use App\Models\Resume;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CvReviewController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();

        // Get all processed resumes for CV review
        $resumes = $user->resumes()->where('is_processed', true)->latest()->get();

        // Mock CV review data - in real app, this would come from AI analysis
        $cvReviews = [];

        foreach ($resumes as $resume) {
            $cvReviews[] = [
                'resume_id' => $resume->id,
                'filename' => $resume->original_filename,
                'uploaded_at' => $resume->created_at,
                'overall_score' => rand(65, 95),
                'sections' => [
                    'format' => [
                        'score' => rand(70, 95),
                        'feedback' => 'Clean, professional format with good use of white space and consistent formatting.',
                        'suggestions' => ['Consider using a more modern template', 'Ensure consistent bullet point styles']
                    ],
                    'content' => [
                        'score' => rand(60, 90),
                        'feedback' => 'Strong content with relevant experience and skills highlighted effectively.',
                        'suggestions' => ['Add more quantifiable achievements', 'Include specific technologies used in projects']
                    ],
                    'keywords' => [
                        'score' => rand(55, 85),
                        'feedback' => 'Good use of industry-relevant keywords, but could be optimized further.',
                        'suggestions' => ['Include more ATS-friendly keywords', 'Add trending technologies in your field']
                    ],
                    'length' => [
                        'score' => rand(70, 95),
                        'feedback' => 'Appropriate length for your experience level.',
                        'suggestions' => ['Consider adding more detail to recent roles', 'Remove outdated information']
                    ]
                ],
                'strengths' => [
                    'Clear career progression',
                    'Relevant technical skills',
                    'Good use of action verbs',
                    'Professional summary'
                ],
                'weaknesses' => [
                    'Limited quantifiable achievements',
                    'Could benefit from more specific project details',
                    'Missing some trending technologies',
                    'Contact information could be more prominent'
                ],
                'ats_score' => rand(70, 90),
                'recruiter_score' => rand(65, 95),
                'improvement_areas' => [
                    [
                        'area' => 'Quantifiable Achievements',
                        'priority' => 'High',
                        'description' => 'Add specific numbers, percentages, and metrics to demonstrate impact.',
                        'examples' => [
                            'Increased website traffic by 40% through SEO optimization',
                            'Reduced page load time by 2.5 seconds',
                            'Led a team of 5 developers on a $2M project'
                        ]
                    ],
                    [
                        'area' => 'Technical Skills',
                        'priority' => 'Medium',
                        'description' => 'Include more current and trending technologies in your field.',
                        'examples' => [
                            'Add cloud platforms (AWS, Azure, GCP)',
                            'Include modern frameworks (Next.js, Vue.js)',
                            'Mention DevOps tools (Docker, Kubernetes)'
                        ]
                    ],
                    [
                        'area' => 'Project Details',
                        'priority' => 'High',
                        'description' => 'Provide more context about your projects and their business impact.',
                        'examples' => [
                            'Describe the problem you solved',
                            'Explain your role and responsibilities',
                            'Highlight the technologies and tools used'
                        ]
                    ]
                ],
                'buzzwords_detected' => [
                    ['word' => 'Responsible for', 'count' => 3, 'suggestion' => 'Use more specific action verbs like "Led", "Developed", "Implemented"'],
                    ['word' => 'Worked on', 'count' => 2, 'suggestion' => 'Be more specific about your contributions and achievements'],
                    ['word' => 'Various', 'count' => 1, 'suggestion' => 'Specify the technologies, tools, or projects instead of using vague terms']
                ],
                'missing_elements' => [
                    'Professional summary or objective',
                    'LinkedIn profile link',
                    'GitHub or portfolio links',
                    'Certifications section',
                    'Languages spoken'
                ],
                'format_issues' => [
                    'Inconsistent date formatting',
                    'Mixed bullet point styles',
                    'Inconsistent font sizes in headers'
                ]
            ];
        }

        return Inertia::render('cv-review/index', [
            'resumes' => $resumes,
            'cvReviews' => $cvReviews,
        ]);
    }
}
