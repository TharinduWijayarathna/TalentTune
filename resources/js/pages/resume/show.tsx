import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    FileText,
    Download,
    ArrowLeft,
    CheckCircle,
    Clock,
    AlertCircle,
    Brain,
    Target,
    TrendingUp,
    Users
} from 'lucide-react';

interface Resume {
    id: number;
    original_filename: string;
    file_type: string;
    is_processed: boolean;
    created_at: string;
    ai_analysis?: string;
    extracted_skills?: string[];
    work_experience?: any[];
    education?: any[];
    certifications?: any[];
    skill_gaps?: any[];
    job_fit_scores?: any[];
}

interface Props {
    resume: Resume;
}

export default function ResumeShow({ resume }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getStatusIcon = (isProcessed: boolean) => {
        if (isProcessed) {
            return <CheckCircle className="h-5 w-5 text-green-500" />;
        }
        return <Clock className="h-5 w-5 text-yellow-500" />;
    };

    const getStatusBadge = (isProcessed: boolean) => {
        if (isProcessed) {
            return <Badge variant="default" className="bg-green-100 text-green-800">Analysis Complete</Badge>;
        }
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Processing</Badge>;
    };

    return (
        <AppLayout>
            <Head title={`Resume: ${resume.original_filename}`} />
            <div className="container mx-auto py-8 max-w-6xl">
                <div className="flex items-center gap-4 mb-8">
                    <Link href={route('resume.index')}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Resumes
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {resume.original_filename}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Uploaded on {formatDate(resume.created_at)}
                        </p>
                    </div>
                </div>

                {!resume.is_processed ? (
                    <Card>
                        <CardContent>
                            <div className="text-center py-12">
                                <Clock className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    AI Analysis in Progress
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    Your resume is being processed. This usually takes a few minutes.
                                </p>
                                <div className="w-full max-w-md mx-auto">
                                    <Progress value={33} className="mb-2" />
                                    <p className="text-sm text-gray-500">Processing resume content...</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-8">
                        {/* Status Card */}
                        <Card>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {getStatusIcon(resume.is_processed)}
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                                Analysis Complete
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                AI analysis finished successfully
                                            </p>
                                        </div>
                                    </div>
                                    {getStatusBadge(resume.is_processed)}
                                </div>
                            </CardContent>
                        </Card>

                        {/* AI Analysis Summary */}
                        {resume.ai_analysis && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Brain className="h-5 w-5" />
                                        AI Analysis Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {resume.ai_analysis}
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Extracted Skills */}
                        {resume.extracted_skills && resume.extracted_skills.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Target className="h-5 w-5" />
                                        Extracted Skills ({resume.extracted_skills.length})
                                    </CardTitle>
                                    <CardDescription>
                                        Skills identified from your resume
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {resume.extracted_skills.map((skill, index) => (
                                            <Badge key={index} variant="secondary" className="text-sm">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Job Fit Scores */}
                        {resume.job_fit_scores && resume.job_fit_scores.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5" />
                                        Job Fit Analysis
                                    </CardTitle>
                                    <CardDescription>
                                        How well your skills match different job roles
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {resume.job_fit_scores.map((job, index) => (
                                            <div key={index} className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium text-gray-900 dark:text-white">
                                                        {job.role}
                                                    </span>
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                                        {job.score}% match
                                                    </span>
                                                </div>
                                                <Progress value={job.score} className="h-2" />
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Skill Gaps */}
                        {resume.skill_gaps && resume.skill_gaps.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <AlertCircle className="h-5 w-5" />
                                        Identified Skill Gaps
                                    </CardTitle>
                                    <CardDescription>
                                        Skills that could strengthen your profile
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {resume.skill_gaps.map((gap, index) => (
                                            <div key={index} className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                                                <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {gap.skill}
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {gap.reason}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Work Experience */}
                        {resume.work_experience && resume.work_experience.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        Work Experience
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {resume.work_experience.map((exp, index) => (
                                            <div key={index} className="border-l-4 border-blue-500 pl-4">
                                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                                    {exp.title}
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {exp.company} • {exp.duration}
                                                </p>
                                                {exp.description && (
                                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                                                        {exp.description}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Education */}
                        {resume.education && resume.education.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Education</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {resume.education.map((edu, index) => (
                                            <div key={index} className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                                        {edu.degree}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {edu.institution}
                                                    </p>
                                                </div>
                                                <span className="text-sm text-gray-500">
                                                    {edu.year}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Certifications */}
                        {resume.certifications && resume.certifications.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Certifications</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {resume.certifications.map((cert, index) => (
                                            <div key={index} className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                                        {cert.name}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {cert.issuer}
                                                    </p>
                                                </div>
                                                <span className="text-sm text-gray-500">
                                                    {cert.date}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
