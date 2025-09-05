<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class CareerAnalyticsController extends Controller
{
    public function index(): Response
    {
        // Mock analytics data
        $skillTrends = [
            [
                'skill' => 'React',
                'demand' => 95,
                'growth' => 15,
                'salary_impact' => 12,
                'trend' => 'rising',
            ],
            [
                'skill' => 'Python',
                'demand' => 88,
                'growth' => 8,
                'salary_impact' => 10,
                'trend' => 'stable',
            ],
            [
                'skill' => 'AWS',
                'demand' => 92,
                'growth' => 20,
                'salary_impact' => 18,
                'trend' => 'rising',
            ],
            [
                'skill' => 'TypeScript',
                'demand' => 85,
                'growth' => 25,
                'salary_impact' => 15,
                'trend' => 'rising',
            ],
        ];

        $salaryInsights = [
            'current_estimate' => 95000,
            'market_average' => 105000,
            'percentile' => 75,
            'growth_potential' => 120000,
            'skills_impact' => [
                ['skill' => 'React', 'impact' => 8000],
                ['skill' => 'AWS', 'impact' => 12000],
                ['skill' => 'TypeScript', 'impact' => 6000],
            ],
        ];

        $marketTrends = [
            [
                'title' => 'Remote Work Continues to Grow',
                'description' => 'Remote positions have increased by 40% in the tech sector',
                'impact' => 'positive',
                'date' => '2024-01-15',
            ],
            [
                'title' => 'AI Skills in High Demand',
                'description' => 'Companies are prioritizing AI and machine learning expertise',
                'impact' => 'positive',
                'date' => '2024-01-12',
            ],
            [
                'title' => 'Entry-Level Competition Intensifies',
                'description' => 'More candidates competing for junior developer positions',
                'impact' => 'neutral',
                'date' => '2024-01-10',
            ],
        ];

        $careerPath = [
            [
                'level' => 'Junior Developer',
                'salary_range' => '$60,000 - $80,000',
                'skills_required' => ['HTML', 'CSS', 'JavaScript', 'Git'],
                'time_to_achieve' => '0-2 years',
                'achieved' => true,
            ],
            [
                'level' => 'Mid-Level Developer',
                'salary_range' => '$80,000 - $120,000',
                'skills_required' => ['React', 'Node.js', 'Database Design', 'Testing'],
                'time_to_achieve' => '2-4 years',
                'achieved' => true,
            ],
            [
                'level' => 'Senior Developer',
                'salary_range' => '$120,000 - $160,000',
                'skills_required' => ['System Design', 'Leadership', 'Mentoring', 'Architecture'],
                'time_to_achieve' => '4-6 years',
                'achieved' => false,
                'progress' => 60,
            ],
            [
                'level' => 'Tech Lead',
                'salary_range' => '$160,000 - $200,000',
                'skills_required' => ['Team Management', 'Strategic Planning', 'Cross-functional Collaboration'],
                'time_to_achieve' => '6-8 years',
                'achieved' => false,
                'progress' => 20,
            ],
        ];

        $industryInsights = [
            [
                'industry' => 'Technology',
                'growth_rate' => 12,
                'average_salary' => 110000,
                'job_openings' => 45000,
                'top_skills' => ['React', 'Python', 'AWS', 'Docker'],
            ],
            [
                'industry' => 'Finance',
                'growth_rate' => 8,
                'average_salary' => 125000,
                'job_openings' => 12000,
                'top_skills' => ['Java', 'SQL', 'Python', 'Blockchain'],
            ],
            [
                'industry' => 'Healthcare',
                'growth_rate' => 15,
                'average_salary' => 95000,
                'job_openings' => 8000,
                'top_skills' => ['Python', 'Machine Learning', 'Data Analysis', 'HIPAA'],
            ],
        ];

        return Inertia::render('career-analytics/index', [
            'skillTrends' => $skillTrends,
            'salaryInsights' => $salaryInsights,
            'marketTrends' => $marketTrends,
            'careerPath' => $careerPath,
            'industryInsights' => $industryInsights,
        ]);
    }

    public function skillsAnalysis(): Response
    {
        // Mock detailed skills analysis
        $skillsAnalysis = [
            [
                'skill' => 'React',
                'proficiency' => 85,
                'market_demand' => 95,
                'salary_impact' => 12,
                'learning_priority' => 'high',
                'recommendations' => [
                    'Focus on advanced React patterns',
                    'Learn React testing best practices',
                    'Explore React ecosystem tools',
                ],
            ],
            [
                'skill' => 'Node.js',
                'proficiency' => 70,
                'market_demand' => 88,
                'salary_impact' => 10,
                'learning_priority' => 'medium',
                'recommendations' => [
                    'Practice building RESTful APIs',
                    'Learn about microservices architecture',
                    'Study performance optimization',
                ],
            ],
        ];

        return Inertia::render('career-analytics/skills', [
            'skillsAnalysis' => $skillsAnalysis,
        ]);
    }
}
