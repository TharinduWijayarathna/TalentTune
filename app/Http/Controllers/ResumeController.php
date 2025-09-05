<?php

namespace App\Http\Controllers;

use App\Models\Resume;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ResumeController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();
        $resumes = $user->resumes()->latest()->get();

        // Generate CV review data for processed resumes
        $cvReviews = [];
        foreach ($resumes->where('is_processed', true) as $resume) {
            $cvReviews[] = [
                'resume_id' => $resume->id,
                'filename' => $resume->original_filename,
                'uploaded_at' => $resume->created_at,
                'overall_score' => rand(65, 95),
                'sections' => [
                    'format' => [
                        'score' => rand(70, 95),
                        'feedback' => 'Clean, professional format with good use of white space and consistent formatting.',
                        'suggestions' => ['Consider using a more modern template', 'Ensure consistent bullet point styles'],
                    ],
                    'content' => [
                        'score' => rand(60, 90),
                        'feedback' => 'Strong content with relevant experience and skills highlighted effectively.',
                        'suggestions' => ['Add more quantifiable achievements', 'Include specific technologies used in projects'],
                    ],
                    'keywords' => [
                        'score' => rand(55, 85),
                        'feedback' => 'Good use of industry-relevant keywords, but could be optimized further.',
                        'suggestions' => ['Include more ATS-friendly keywords', 'Add trending technologies in your field'],
                    ],
                    'length' => [
                        'score' => rand(70, 95),
                        'feedback' => 'Appropriate length for your experience level.',
                        'suggestions' => ['Consider adding more detail to recent roles', 'Remove outdated information'],
                    ],
                ],
                'strengths' => [
                    'Clear career progression',
                    'Relevant technical skills',
                    'Good use of action verbs',
                    'Professional summary',
                ],
                'weaknesses' => [
                    'Limited quantifiable achievements',
                    'Could benefit from more specific project details',
                    'Missing some trending technologies',
                    'Contact information could be more prominent',
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
                            'Led a team of 5 developers on a $2M project',
                        ],
                    ],
                    [
                        'area' => 'Technical Skills',
                        'priority' => 'Medium',
                        'description' => 'Include more current and trending technologies in your field.',
                        'examples' => [
                            'Add cloud platforms (AWS, Azure, GCP)',
                            'Include modern frameworks (Next.js, Vue.js)',
                            'Mention DevOps tools (Docker, Kubernetes)',
                        ],
                    ],
                ],
                'buzzwords_detected' => [
                    ['word' => 'Responsible for', 'count' => 3, 'suggestion' => 'Use more specific action verbs like "Led", "Developed", "Implemented"'],
                    ['word' => 'Worked on', 'count' => 2, 'suggestion' => 'Be more specific about your contributions and achievements'],
                ],
                'missing_elements' => [
                    'Professional summary or objective',
                    'LinkedIn profile link',
                    'GitHub or portfolio links',
                    'Certifications section',
                ],
                'format_issues' => [
                    'Inconsistent date formatting',
                    'Mixed bullet point styles',
                ],
            ];
        }

        return Inertia::render('resume/index', [
            'resumes' => $resumes,
            'cvReviews' => $cvReviews,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'resume' => 'required|file|mimes:pdf,doc,docx|max:10240', // 10MB max
        ]);

        $file = $request->file('resume');
        $filename = time().'_'.$file->getClientOriginalName();
        $filePath = $file->storeAs('resumes', $filename, 'public');

        $resume = Resume::create([
            'user_id' => auth()->id(),
            'original_filename' => $file->getClientOriginalName(),
            'file_path' => $filePath,
            'file_type' => $file->getClientOriginalExtension(),
            'parsed_data' => [],
            'extracted_skills' => [],
            'work_experience' => [],
            'education' => [],
            'certifications' => [],
            'ai_analysis' => '',
            'skill_gaps' => [],
            'job_fit_scores' => [],
            'is_processed' => false,
        ]);

        // TODO: Queue job for AI processing
        // ProcessResumeJob::dispatch($resume);

        return redirect()->route('resume.show', $resume)
            ->with('success', 'Resume uploaded successfully! AI analysis will begin shortly.');
    }

    public function show(Resume $resume): Response
    {
        $this->authorize('view', $resume);

        return Inertia::render('resume/show', [
            'resume' => $resume,
        ]);
    }
}
