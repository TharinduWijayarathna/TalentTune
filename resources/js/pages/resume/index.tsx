import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    FileText,
    Upload,
    Clock,
    CheckCircle,
    AlertCircle,
    Eye,
    Download,
    Trash2,
    Calendar,
    BarChart3,
    Star,
    Lightbulb,
    RefreshCw
} from 'lucide-react';

interface Resume {
    id: number;
    original_filename: string;
    file_type: string;
    is_processed: boolean;
    created_at: string;
    ai_analysis?: string;
    extracted_skills?: string[];
}

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
    resumes: Resume[];
    cvReviews: CvReview[];
}

export default function ResumeIndex({ resumes, cvReviews }: Props) {
    const [activeTab, setActiveTab] = useState<'upload' | 'history' | 'review'>('upload');
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { setData, post, processing, errors, progress } = useForm({
        resume: null as File | null,
    });

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (validateFile(file)) {
                setSelectedFile(file);
                setData('resume', file);
            }
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (validateFile(file)) {
                setSelectedFile(file);
                setData('resume', file);
            }
        }
    };

    const validateFile = (file: File): boolean => {
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const maxSize = 10 * 1024 * 1024; // 10MB

        if (!allowedTypes.includes(file.type)) {
            alert('Please upload a PDF or Word document (.pdf, .doc, .docx)');
            return false;
        }

        if (file.size > maxSize) {
            alert('File size must be less than 10MB');
            return false;
        }

        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedFile) {
            post(route('resume.store'));
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusIcon = (isProcessed: boolean) => {
        if (isProcessed) {
            return <CheckCircle className="h-4 w-4 text-green-500" />;
        }
        return <Clock className="h-4 w-4 text-yellow-500" />;
    };

    const getStatusBadge = (isProcessed: boolean) => {
        if (isProcessed) {
            return <Badge variant="default" className="bg-green-100 text-green-800">Processed</Badge>;
        }
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Processing</Badge>;
    };

    // Calculate statistics
    const totalResumes = resumes.length;
    const processedResumes = resumes.filter(r => r.is_processed).length;
    const totalSkills = resumes.reduce((acc, r) => acc + (r.extracted_skills?.length || 0), 0);
    const avgSkillsPerResume = totalResumes > 0 ? Math.round(totalSkills / totalResumes) : 0;

    // CV Review helper functions
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

    return (
        <AppLayout>
            <Head title="Resume Management" />
            <div className="container mx-auto py-8 max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Resume Management
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Upload, analyze, and review your resumes with AI-powered insights.
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex space-x-1 mb-8 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
                    <button
                        onClick={() => setActiveTab('upload')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTab === 'upload'
                                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                        <Upload className="h-4 w-4 inline mr-2" />
                        Upload Resume
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTab === 'history'
                                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                        <FileText className="h-4 w-4 inline mr-2" />
                        Resume History
                    </button>
                    <button
                        onClick={() => setActiveTab('review')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTab === 'review'
                                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                        <Target className="h-4 w-4 inline mr-2" />
                        CV Review
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'upload' && (
                    <div className="space-y-8">
                        {/* Upload Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Upload className="h-5 w-5" />
                                    Upload Your Resume
                                </CardTitle>
                                <CardDescription>
                                    Supported formats: PDF, DOC, DOCX (Max 10MB)
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div
                                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                                            dragActive
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                                                : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                    >
                                        {selectedFile ? (
                                            <div className="space-y-4">
                                                <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                                                <div>
                                                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                                                        {selectedFile.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {formatFileSize(selectedFile.size)}
                                                    </p>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => {
                                                        setSelectedFile(null);
                                                        setData('resume', null);
                                                    }}
                                                >
                                                    Remove File
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <FileText className="h-12 w-12 text-gray-400 mx-auto" />
                                                <div>
                                                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                                                        Drag and drop your resume here
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        or click to browse files
                                                    </p>
                                                </div>
                                                <Label htmlFor="resume" className="cursor-pointer">
                                                    <Button type="button" variant="outline" asChild>
                                                        <span>Choose File</span>
                                                    </Button>
                                                </Label>
                                                <Input
                                                    id="resume"
                                                    type="file"
                                                    accept=".pdf,.doc,.docx"
                                                    onChange={handleFileInput}
                                                    className="hidden"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {errors.resume && (
                                        <Alert variant="destructive">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription>{errors.resume}</AlertDescription>
                                        </Alert>
                                    )}

                                    {progress && (
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Uploading...</span>
                                                <span>{progress.percentage}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${progress.percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={!selectedFile || processing}
                                        className="w-full"
                                    >
                                        {processing ? 'Uploading...' : 'Upload Resume'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className="space-y-8">
                        {/* Statistics Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <Card>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                Total Resumes
                                            </p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {totalResumes}
                                            </p>
                                        </div>
                                        <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-3">
                                            <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                Processed
                                            </p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {processedResumes}
                                            </p>
                                        </div>
                                        <div className="bg-green-100 dark:bg-green-900 rounded-lg p-3">
                                            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                Total Skills
                                            </p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {totalSkills}
                                            </p>
                                        </div>
                                        <div className="bg-purple-100 dark:bg-purple-900 rounded-lg p-3">
                                            <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                Avg Skills/Resume
                                            </p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {avgSkillsPerResume}
                                            </p>
                                        </div>
                                        <div className="bg-yellow-100 dark:bg-yellow-900 rounded-lg p-3">
                                            <BarChart3 className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Resume Timeline */}
                        {resumes.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5" />
                                        Resume Timeline
                                    </CardTitle>
                                    <CardDescription>
                                        Track your resume evolution and improvements over time
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {resumes.map((resume) => (
                                            <div key={resume.id} className="flex items-start gap-4">
                                                <div className="flex flex-col items-center">
                                                    <div className={`w-3 h-3 rounded-full ${
                                                        resume.is_processed ? 'bg-green-500' : 'bg-yellow-500'
                                                    }`} />
                                                    {index < resumes.length - 1 && (
                                                        <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mt-2" />
                                                    )}
                                                </div>
                                                <div className="flex-1 pb-4">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900 dark:text-white">
                                                                {resume.original_filename}
                                                            </h4>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                {formatDate(resume.created_at)}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            {getStatusIcon(resume.is_processed)}
                                                            {getStatusBadge(resume.is_processed)}
                                                        </div>
                                                    </div>
                                                    {resume.is_processed && (
                                                        <div className="mt-2 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                                            {resume.extracted_skills && (
                                                                <span className="flex items-center gap-1">
                                                                    <Target className="h-4 w-4" />
                                                                    {resume.extracted_skills.length} skills
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Resume Grid */}
                        {resumes.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {resumes.map((resume) => (
                                    <Card key={resume.id} className="hover:shadow-lg transition-shadow">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-2">
                                                        <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                    </div>
                                                    <div>
                                                        <CardTitle className="text-lg line-clamp-2">
                                                            {resume.original_filename}
                                                        </CardTitle>
                                                        <CardDescription className="text-sm">
                                                            {resume.file_type.toUpperCase()} • {formatDate(resume.created_at)}
                                                        </CardDescription>
                                                    </div>
                                                </div>
                                                {getStatusIcon(resume.is_processed)}
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium">Status</span>
                                                    {getStatusBadge(resume.is_processed)}
                                                </div>

                                                {resume.extracted_skills && resume.extracted_skills.length > 0 && (
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            Skills Found: {resume.extracted_skills.length}
                                                        </span>
                                                        <div className="flex flex-wrap gap-1 mt-2">
                                                            {resume.extracted_skills.slice(0, 3).map((skill, index) => (
                                                                <Badge key={index} variant="outline" className="text-xs">
                                                                    {skill}
                                                                </Badge>
                                                            ))}
                                                            {resume.extracted_skills.length > 3 && (
                                                                <Badge variant="outline" className="text-xs">
                                                                    +{resume.extracted_skills.length - 3} more
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="pt-2 flex gap-2">
                                                    <Link href={route('resume.show', resume.id)}>
                                                        <Button variant="outline" size="sm" className="flex-1">
                                                            <Eye className="h-3 w-3 mr-1" />
                                                            View
                                                        </Button>
                                                    </Link>
                                                    <Button variant="outline" size="sm">
                                                        <Download className="h-3 w-3" />
                                                    </Button>
                                                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="text-center py-12">
                                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                            No resumes uploaded yet
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                                            Upload your first resume to get started with AI-powered analysis.
                                        </p>
                                        <Button onClick={() => setActiveTab('upload')}>
                                            <Upload className="h-4 w-4 mr-2" />
                                            Upload Resume
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}

                {activeTab === 'review' && (
                    <div className="space-y-8">
                        {cvReviews.length === 0 ? (
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="text-center py-12">
                                        <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                            No CV reviews available yet
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                                            Upload and process your resume to get AI-powered CV review and feedback.
                                        </p>
                                        <Button onClick={() => setActiveTab('upload')}>
                                            <Upload className="h-4 w-4 mr-2" />
                                            Upload Resume
                                        </Button>
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
                )}
            </div>
        </AppLayout>
    );
}
