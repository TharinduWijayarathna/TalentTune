import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Upload,
    Target,
    Brain,
    Lightbulb,
    FileText,
    TrendingUp,
    CheckCircle,
    Clock,
    ArrowRight,
    MessageCircle
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    // Mock data - in real app, this would come from props
    const stats = {
        resumesUploaded: 2,
        skillsIdentified: 15,
        quizzesCompleted: 3,
        recommendations: 8,
        jobFitScore: 85,
        skillGaps: 4
    };

    const recentActivity = [
        { type: 'resume', title: 'Software Engineer Resume.pdf', status: 'processed', time: '2 hours ago' },
        { type: 'quiz', title: 'JavaScript Fundamentals Quiz', score: 85, time: '1 day ago' },
        { type: 'recommendation', title: 'Learn React.js', status: 'pending', time: '2 days ago' },
    ];

    const suggestedRoles = [
        { role: 'Frontend Developer', fit: 92, skills: ['React', 'JavaScript', 'CSS'] },
        { role: 'Full Stack Developer', fit: 78, skills: ['Node.js', 'React', 'MongoDB'] },
        { role: 'UI/UX Designer', fit: 65, skills: ['Figma', 'Design Systems', 'User Research'] },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Welcome Section */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Welcome back! 👋
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Here's your skill development overview and latest insights.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Resumes Uploaded
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {stats.resumesUploaded}
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
                                        Skills Identified
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {stats.skillsIdentified}
                                    </p>
                                </div>
                                <div className="bg-green-100 dark:bg-green-900 rounded-lg p-3">
                                    <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Quizzes Completed
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {stats.quizzesCompleted}
                                    </p>
                                </div>
                                <div className="bg-purple-100 dark:bg-purple-900 rounded-lg p-3">
                                    <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Recommendations
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {stats.recommendations}
                                    </p>
                                </div>
                                <div className="bg-yellow-100 dark:bg-yellow-900 rounded-lg p-3">
                                    <Lightbulb className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Quick Actions */}
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>
                                Get started with these common tasks
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Link href="/resume">
                                <Button className="w-full justify-start" variant="outline">
                                    <Upload className="h-4 w-4 mr-2" />
                                    Manage Resumes
                                </Button>
                            </Link>
                            <Link href="/quizzes">
                                <Button className="w-full justify-start" variant="outline">
                                    <Brain className="h-4 w-4 mr-2" />
                                    Take a Quiz
                                </Button>
                            </Link>
                            <Link href="/recommendations">
                                <Button className="w-full justify-start" variant="outline">
                                    <Lightbulb className="h-4 w-4 mr-2" />
                                    View Recommendations
                                </Button>
                            </Link>
                            <Link href="/ai-chat">
                                <Button className="w-full justify-start" variant="outline">
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    Ask AI Assistant
                                </Button>
                            </Link>
                            <Link href="/skills">
                                <Button className="w-full justify-start" variant="outline">
                                    <Target className="h-4 w-4 mr-2" />
                                    View Skill Profile
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Job Fit Analysis */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Job Fit Analysis
                            </CardTitle>
                            <CardDescription>
                                How well your skills match different roles
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {suggestedRoles.map((role, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                                    {role.role}
                                                </h4>
                                                <div className="flex gap-1 mt-1">
                                                    {role.skills.map((skill, skillIndex) => (
                                                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    {role.fit}%
                                                </span>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    match
                                                </p>
                                            </div>
                                        </div>
                                        <Progress value={role.fit} className="h-2" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                            Your latest interactions with SkillDrift
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        {activity.type === 'resume' && <FileText className="h-5 w-5 text-blue-500" />}
                                        {activity.type === 'quiz' && <Brain className="h-5 w-5 text-purple-500" />}
                                        {activity.type === 'recommendation' && <Lightbulb className="h-5 w-5 text-yellow-500" />}
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {activity.title}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {activity.time}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {activity.type === 'quiz' && activity.score && (
                                            <Badge variant="default" className="bg-green-100 text-green-800">
                                                {activity.score}%
                                            </Badge>
                                        )}
                                        {activity.status === 'processed' && (
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                        )}
                                        {activity.status === 'pending' && (
                                            <Clock className="h-5 w-5 text-yellow-500" />
                                        )}
                                        <ArrowRight className="h-4 w-4 text-gray-400" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
