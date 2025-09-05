import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Play,
    Clock,
    Calendar,
    Target,
    BookOpen,
    MessageSquare,
    Mic,
    Video,
} from 'lucide-react';

interface InterviewSession {
    id: number;
    type: string;
    role: string;
    company: string;
    date: string;
    duration: string;
    status: string;
    preparation_tips?: string[];
    score?: number;
    feedback?: string;
}

interface PracticeSession {
    id: number;
    type: string;
    role: string;
    completed_date: string;
    score: number;
    duration: string;
    questions_answered: number;
    feedback: string;
}

interface QuestionBank {
    id: number;
    category: string;
    title: string;
    question_count: number;
    difficulty: string;
    last_updated: string;
}

interface Props {
    interviewSessions: InterviewSession[];
    practiceSessions: PracticeSession[];
    questionBanks: QuestionBank[];
}

export default function InterviewIndex({ interviewSessions, practiceSessions, questionBanks }: Props) {
    const [activeTab, setActiveTab] = useState('sessions');

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'scheduled': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-600';
        if (score >= 80) return 'text-blue-600';
        if (score >= 70) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case 'beginner': return 'bg-green-100 text-green-800';
            case 'intermediate': return 'bg-yellow-100 text-yellow-800';
            case 'advanced': return 'bg-red-100 text-red-800';
            case 'mixed': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppLayout>
            <Head title="Interview Preparation" />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Interview Preparation</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Practice interviews, review questions, and track your progress
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{interviewSessions.length}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Upcoming Interviews</div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{practiceSessions.length}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Practice Sessions</div>
                        </div>
                        <Button className="bg-purple-600 hover:bg-purple-700">
                            <Play className="h-4 w-4 mr-2" />
                            Start Mock Interview
                        </Button>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Mic className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Mock Interview</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Practice with AI-powered interviews</p>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                                <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Question Bank</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Browse interview questions by category</p>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Video className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Video Practice</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Record and review your responses</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="sessions" className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Interview Sessions
                        </TabsTrigger>
                        <TabsTrigger value="practice" className="flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            Practice History
                        </TabsTrigger>
                        <TabsTrigger value="questions" className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            Question Banks
                        </TabsTrigger>
                    </TabsList>

                    {/* Interview Sessions */}
                    <TabsContent value="sessions" className="space-y-6">
                        <div className="grid gap-6">
                            {interviewSessions.map((session) => (
                                <Card key={session.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <CardTitle className="text-xl">{session.type}</CardTitle>
                                                    <Badge className={getStatusColor(session.status)}>
                                                        {session.status}
                                                    </Badge>
                                                </div>
                                                <CardDescription className="text-lg font-medium text-gray-900 dark:text-white">
                                                    {session.role} at {session.company}
                                                </CardDescription>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    {new Date(session.date).toLocaleDateString()}
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    {session.duration}
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {session.status === 'Scheduled' && session.preparation_tips && (
                                            <div className="mb-4">
                                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Preparation Tips:</h4>
                                                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                                    {session.preparation_tips.map((tip, index) => (
                                                        <li key={index}>{tip}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {session.status === 'Completed' && session.feedback && (
                                            <div className="mb-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h4 className="font-medium text-gray-900 dark:text-white">Feedback:</h4>
                                                    {session.score && (
                                                        <Badge className={`${getScoreColor(session.score)} bg-opacity-20`}>
                                                            Score: {session.score}%
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{session.feedback}</p>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm">
                                                <MessageSquare className="h-4 w-4 mr-2" />
                                                View Details
                                            </Button>
                                            {session.status === 'Scheduled' && (
                                                <Button size="sm">
                                                    <Play className="h-4 w-4 mr-2" />
                                                    Practice Now
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Practice History */}
                    <TabsContent value="practice" className="space-y-6">
                        <div className="grid gap-4">
                            {practiceSessions.map((session) => (
                                <Card key={session.id}>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        {session.type}
                                                    </h3>
                                                    <Badge className={`${getScoreColor(session.score)} bg-opacity-20`}>
                                                        {session.score}% Score
                                                    </Badge>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-400 mb-2">{session.role}</p>
                                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>{new Date(session.completed_date).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        <span>{session.duration}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MessageSquare className="h-4 w-4" />
                                                        <span>{session.questions_answered} questions</span>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{session.feedback}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="outline" size="sm">
                                                    View Details
                                                </Button>
                                                <Button size="sm">
                                                    <Play className="h-4 w-4 mr-2" />
                                                    Retake
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Question Banks */}
                    <TabsContent value="questions" className="space-y-6">
                        <div className="grid gap-6">
                            {questionBanks.map((bank) => (
                                <Card key={bank.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <CardTitle className="text-xl mb-2">{bank.title}</CardTitle>
                                                <CardDescription className="text-base">
                                                    {bank.category} • {bank.question_count} questions
                                                </CardDescription>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge className={getDifficultyColor(bank.difficulty)}>
                                                    {bank.difficulty}
                                                </Badge>
                                                <Button asChild>
                                                    <Link href={`/interview/practice?type=${bank.category.toLowerCase()}`}>
                                                        Practice
                                                        <Play className="h-4 w-4 ml-2" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <BookOpen className="h-4 w-4" />
                                                <span>{bank.question_count} questions</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>Updated {new Date(bank.last_updated).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
