import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    FileText,
    CheckCircle,
    AlertCircle,
    Star,
    Eye,
    Download,
    RefreshCw,
    Target,
    Lightbulb,
    AlertTriangle,
    Info
} from 'lucide-react';

interface CvReview {
    resume_id: number;
    filename: string;
    uploaded_at: string;
    overall_score: number;
    sections: {
        format: { score: number; feedback: string; suggestions: string[] };
        content: { score: number; feedback: string; suggestions: string[] };
        keywords: { score: number; feedback: string; suggestions: string[] };
        length: { score: number; feedback: string; suggestions: string[] };
    };
    strengths: string[];
    weaknesses: string[];
    ats_score: number;
    recruiter_score: number;
    improvement_areas: Array<{
        area: string;
        priority: string;
        description: string;
        examples: string[];
    }>;
    buzzwords_detected: Array<{
        word: string;
        count: number;
        suggestion: string;
    }>;
    missing_elements: string[];
    format_issues: string[];
}

interface Props {
    resumes: Array<{
        id: number;
        filename: string;
        created_at: string;
    }>;
    cvReviews: CvReview[];
}

export default function CvReviewIndex({ cvReviews }: Props) {
    const getScoreColor = (score: number): string => {
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreBgColor = (score: number): string => {
        if (score >= 80) return 'bg-green-100 dark:bg-green-900';
        if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900';
        return 'bg-red-100 dark:bg-red-900';
    };

    const getPriorityColor = (priority: string): string => {
        switch (priority.toLowerCase()) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <AppLayout>
            <Head title="CV Review" />
            <div className="container mx-auto py-8 max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        AI-Powered CV Review
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Get detailed feedback on your resume with AI-powered analysis and improvement suggestions.
                    </p>
                </div>

                {cvReviews.length === 0 ? (
                    <Card>
                        <CardContent>
                            <div className="text-center py-12">
                                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    No resumes to review yet
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    Upload and process your resume to get AI-powered CV review and feedback.
                                </p>
                                <Link href="/resume/upload">
                                    <Button className="flex items-center gap-2">
                                        <FileText className="h-4 w-4" />
                                        Upload Resume
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-8">
                        {cvReviews.map((review) => (
                            <div key={review.resume_id} className="space-y-6">
                                {/* Resume Header */}
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-3">
                                                    <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-xl">
                                                        {review.filename}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        Uploaded on {formatDate(review.uploaded_at)}
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className={`text-3xl font-bold ${getScoreColor(review.overall_score)}`}>
                                                    {review.overall_score}%
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Overall Score
                                                </p>
                                            </div>
                                        </div>
                                    </CardHeader>
                                </Card>

                                {/* Overall Scores */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Card>
                                        <CardContent>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        ATS Score
                                                    </p>
                                                    <p className={`text-2xl font-bold ${getScoreColor(review.ats_score)}`}>
                                                        {review.ats_score}%
                                                    </p>
                                                </div>
                                                <div className={`${getScoreBgColor(review.ats_score)} rounded-lg p-3`}>
                                                    <Target className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                                                </div>
                                            </div>
                                            <Progress value={review.ats_score} className="mt-3" />
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        Recruiter Score
                                                    </p>
                                                    <p className={`text-2xl font-bold ${getScoreColor(review.recruiter_score)}`}>
                                                        {review.recruiter_score}%
                                                    </p>
                                                </div>
                                                <div className={`${getScoreBgColor(review.recruiter_score)} rounded-lg p-3`}>
                                                    <Eye className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                                                </div>
                                            </div>
                                            <Progress value={review.recruiter_score} className="mt-3" />
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        Overall Rating
                                                    </p>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-4 w-4 ${
                                                                    i < Math.floor(review.overall_score / 20)
                                                                        ? 'text-yellow-400 fill-current'
                                                                        : 'text-gray-300'
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className={`${getScoreBgColor(review.overall_score)} rounded-lg p-3`}>
                                                    <Star className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Section Scores */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Section Analysis</CardTitle>
                                        <CardDescription>
                                            Detailed breakdown of your resume sections
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {Object.entries(review.sections).map(([section, data]) => (
                                                <div key={section} className="space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="font-semibold text-gray-900 dark:text-white capitalize">
                                                            {section}
                                                        </h4>
                                                        <span className={`text-lg font-bold ${getScoreColor(data.score)}`}>
                                                            {data.score}%
                                                        </span>
                                                    </div>
                                                    <Progress value={data.score} className="h-2" />
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {data.feedback}
                                                    </p>
                                                    <div className="space-y-1">
                                                        {data.suggestions.map((suggestion, idx) => (
                                                            <div key={idx} className="flex items-start gap-2 text-sm">
                                                                <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                                                <span className="text-gray-600 dark:text-gray-400">
                                                                    {suggestion}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Strengths and Weaknesses */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-green-600">
                                                <CheckCircle className="h-5 w-5" />
                                                Strengths
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                {review.strengths.map((strength, idx) => (
                                                    <div key={idx} className="flex items-center gap-2">
                                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                                        <span className="text-gray-700 dark:text-gray-300">
                                                            {strength}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-red-600">
                                                <AlertCircle className="h-5 w-5" />
                                                Areas for Improvement
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                {review.weaknesses.map((weakness, idx) => (
                                                    <div key={idx} className="flex items-center gap-2">
                                                        <AlertCircle className="h-4 w-4 text-red-500" />
                                                        <span className="text-gray-700 dark:text-gray-300">
                                                            {weakness}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Improvement Areas */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Target className="h-5 w-5" />
                                            Detailed Improvement Areas
                                        </CardTitle>
                                        <CardDescription>
                                            Specific recommendations to enhance your resume
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-6">
                                            {review.improvement_areas.map((area, idx) => (
                                                <div key={idx} className="border-l-4 border-blue-500 pl-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                                            {area.area}
                                                        </h4>
                                                        <Badge className={getPriorityColor(area.priority)}>
                                                            {area.priority} Priority
                                                        </Badge>
                                                    </div>
                                                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                                                        {area.description}
                                                    </p>
                                                    <div className="space-y-2">
                                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            Examples:
                                                        </p>
                                                        {area.examples.map((example, exIdx) => (
                                                            <div key={exIdx} className="flex items-start gap-2 text-sm">
                                                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                                                <span className="text-gray-600 dark:text-gray-400">
                                                                    {example}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Buzzwords and Format Issues */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-yellow-600">
                                                <AlertTriangle className="h-5 w-5" />
                                                Buzzwords Detected
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-3">
                                                {review.buzzwords_detected.map((buzzword, idx) => (
                                                    <div key={idx} className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="font-medium text-gray-900 dark:text-white">
                                                                "{buzzword.word}"
                                                            </span>
                                                            <Badge variant="outline" className="text-xs">
                                                                {buzzword.count} times
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {buzzword.suggestion}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-blue-600">
                                                <Info className="h-5 w-5" />
                                                Missing Elements
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                {review.missing_elements.map((element, idx) => (
                                                    <div key={idx} className="flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                                        <span className="text-gray-700 dark:text-gray-300">
                                                            {element}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Format Issues */}
                                {review.format_issues.length > 0 && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-orange-600">
                                                <AlertTriangle className="h-5 w-5" />
                                                Format Issues
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                {review.format_issues.map((issue, idx) => (
                                                    <div key={idx} className="flex items-center gap-2">
                                                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                                                        <span className="text-gray-700 dark:text-gray-300">
                                                            {issue}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Action Buttons */}
                                <div className="flex gap-4">
                                    <Button className="flex items-center gap-2">
                                        <RefreshCw className="h-4 w-4" />
                                        Re-analyze Resume
                                    </Button>
                                    <Button variant="outline" className="flex items-center gap-2">
                                        <Download className="h-4 w-4" />
                                        Download Report
                                    </Button>
                                    <Link href={`/resume/${review.resume_id}`}>
                                        <Button variant="outline" className="flex items-center gap-2">
                                            <Eye className="h-4 w-4" />
                                            View Resume Details
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
