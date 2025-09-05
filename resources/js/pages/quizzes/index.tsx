import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Brain,
    Clock,
    Target,
    CheckCircle,
    Play,
    Trophy,
    BookOpen,
    Users
} from 'lucide-react';

interface Quiz {
    id: number;
    title: string;
    description: string;
    difficulty: string;
    questions_count: number;
    time_limit: number;
    skill_focus: string[];
    is_completed?: boolean;
    score?: number;
}

interface Props {
    quizzes: any[];
    availableQuizzes: Quiz[];
}

export default function QuizzesIndex({ quizzes, availableQuizzes }: Props) {
    const getDifficultyColor = (difficulty: string): string => {
        switch (difficulty.toLowerCase()) {
            case 'beginner': return 'bg-green-100 text-green-800';
            case 'intermediate': return 'bg-yellow-100 text-yellow-800';
            case 'advanced': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getScoreColor = (score: number): string => {
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <AppLayout>
            <Head title="Quizzes" />
            <div className="container mx-auto py-8 max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        AI-Generated Quizzes
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Test your knowledge with personalized quizzes based on your resume and skill profile.
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Available Quizzes
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {availableQuizzes.length}
                                    </p>
                                </div>
                                <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-3">
                                    <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Completed
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {availableQuizzes.filter(q => q.is_completed).length}
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
                                        Average Score
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {availableQuizzes.filter(q => q.is_completed).length > 0
                                            ? Math.round(availableQuizzes.filter(q => q.is_completed).reduce((acc, q) => acc + (q.score || 0), 0) / availableQuizzes.filter(q => q.is_completed).length)
                                            : 0}%
                                    </p>
                                </div>
                                <div className="bg-purple-100 dark:bg-purple-900 rounded-lg p-3">
                                    <Trophy className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Total Questions
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {availableQuizzes.reduce((acc, q) => acc + q.questions_count, 0)}
                                    </p>
                                </div>
                                <div className="bg-yellow-100 dark:bg-yellow-900 rounded-lg p-3">
                                    <BookOpen className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Available Quizzes */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Available Quizzes
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {availableQuizzes.map((quiz) => (
                            <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-2">
                                                <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg">
                                                    {quiz.title}
                                                </CardTitle>
                                                <CardDescription className="text-sm">
                                                    {quiz.description}
                                                </CardDescription>
                                            </div>
                                        </div>
                                        {quiz.is_completed && (
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Badge className={getDifficultyColor(quiz.difficulty)}>
                                                {quiz.difficulty}
                                            </Badge>
                                            {quiz.is_completed && quiz.score && (
                                                <span className={`text-lg font-bold ${getScoreColor(quiz.score)}`}>
                                                    {quiz.score}%
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <BookOpen className="h-4 w-4" />
                                                {quiz.questions_count} questions
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {quiz.time_limit} min
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Skills Focus:
                                            </p>
                                            <div className="flex flex-wrap gap-1">
                                                {quiz.skill_focus.map((skill, index) => (
                                                    <Badge key={index} variant="outline" className="text-xs">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            {quiz.is_completed ? (
                                                <Button variant="outline" size="sm" className="w-full" disabled>
                                                    <CheckCircle className="h-4 w-4 mr-2" />
                                                    Completed
                                                </Button>
                                            ) : (
                                                <Button size="sm" className="w-full">
                                                    <Play className="h-4 w-4 mr-2" />
                                                    Start Quiz
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Quiz History */}
                {quizzes.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Quiz History
                        </h2>
                        <Card>
                            <CardContent>
                                <div className="space-y-4">
                                    {quizzes.map((quiz) => (
                                        <div key={quiz.id} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-2">
                                                    <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                                        {quiz.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        Completed on {new Date(quiz.updated_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                {quiz.score && (
                                                    <span className={`text-lg font-bold ${getScoreColor(quiz.score)}`}>
                                                        {quiz.score}%
                                                    </span>
                                                )}
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Empty State */}
                {availableQuizzes.length === 0 && (
                    <Card>
                        <CardContent>
                            <div className="text-center py-12">
                                <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    No quizzes available yet
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    Upload your resume to get personalized quizzes generated for you.
                                </p>
                                <Link href="/resume/upload">
                                    <Button className="flex items-center gap-2">
                                        <Target className="h-4 w-4" />
                                        Upload Resume
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
