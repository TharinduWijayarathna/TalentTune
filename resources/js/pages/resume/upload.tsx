import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ResumeUpload() {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { data, setData, post, processing, errors, progress } = useForm({
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

    return (
        <AppLayout>
            <Head title="Upload Resume" />
            <div className="container mx-auto py-8 max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Upload Your Resume
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Upload your resume to get AI-powered skill analysis, gap detection, and personalized recommendations.
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Upload className="h-5 w-5" />
                            Resume Upload
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

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardContent>
                            <div className="text-center">
                                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 w-12 h-12 mx-auto mb-4">
                                    <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                    AI-Powered Parsing
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Extract skills, experience, and education from your resume automatically.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <div className="text-center">
                                <div className="bg-green-100 dark:bg-green-900 rounded-full p-3 w-12 h-12 mx-auto mb-4">
                                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                    Skill Gap Analysis
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Identify missing skills and get personalized improvement recommendations.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <div className="text-center">
                                <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-3 w-12 h-12 mx-auto mb-4">
                                    <Upload className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                    Career Insights
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Get job-fit scores and career path recommendations based on your profile.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
