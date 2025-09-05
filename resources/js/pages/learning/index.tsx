import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    BookOpen,
    Clock,
    Star,
    Award,
    TrendingUp,
    Play,
    CheckCircle,
    Circle,
    Target,
    Users,
    Calendar,
    Trophy,
    Zap,
} from 'lucide-react';

interface LearningPath {
    id: number;
    title: string;
    description: string;
    duration: string;
    difficulty: string;
    progress: number;
    skills_covered: string[];
    courses: Array<{
        title: string;
        completed: boolean;
        progress: number;
    }>;
    recommended: boolean;
}

interface Course {
    id: number;
    title: string;
    provider: string;
    instructor: string;
    rating: number;
    duration: string;
    price: string;
    level: string;
    skills: string[];
    description: string;
    enrolled: boolean;
}

interface Certification {
    id: number;
    name: string;
    provider: string;
    status: string;
    expiry_date: string;
    progress: number;
    description: string;
}

interface Achievement {
    id: number;
    title: string;
    description: string;
    icon: string;
    earned_date: string;
}

interface Props {
    learningPaths: LearningPath[];
    courses: Course[];
    certifications: Certification[];
    achievements: Achievement[];
}

export default function LearningIndex({ learningPaths, courses, certifications, achievements }: Props) {
    const [activeTab, setActiveTab] = useState('paths');

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case 'beginner': return 'bg-green-100 text-green-800';
            case 'intermediate': return 'bg-yellow-100 text-yellow-800';
            case 'advanced': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'in progress': return 'bg-blue-100 text-blue-800';
            case 'not started': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppLayout>
            <Head title="Learning & Development" />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Learning & Development</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Personalized learning paths to advance your career
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{learningPaths.length}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Learning Paths</div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{courses.length}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Available Courses</div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{achievements.length}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Achievements</div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="paths" className="flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            Learning Paths
                        </TabsTrigger>
                        <TabsTrigger value="courses" className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            Courses
                        </TabsTrigger>
                        <TabsTrigger value="certifications" className="flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            Certifications
                        </TabsTrigger>
                        <TabsTrigger value="achievements" className="flex items-center gap-2">
                            <Trophy className="h-4 w-4" />
                            Achievements
                        </TabsTrigger>
                    </TabsList>

                    {/* Learning Paths */}
                    <TabsContent value="paths" className="space-y-6">
                        <div className="grid gap-6">
                            {learningPaths.map((path) => (
                                <Card key={path.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <CardTitle className="text-xl">{path.title}</CardTitle>
                                                    {path.recommended && (
                                                        <Badge className="bg-purple-100 text-purple-800">
                                                            <Zap className="h-3 w-3 mr-1" />
                                                            Recommended
                                                        </Badge>
                                                    )}
                                                </div>
                                                <CardDescription className="text-base">
                                                    {path.description}
                                                </CardDescription>
                                            </div>
                                            <Button asChild>
                                                <Link href={`/learning/path/${path.id}`}>
                                                    Continue Learning
                                                    <Play className="h-4 w-4 ml-2" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <Clock className="h-4 w-4" />
                                                <span>{path.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge className={getDifficultyColor(path.difficulty)}>
                                                    {path.difficulty}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <Users className="h-4 w-4" />
                                                <span>{path.courses.length} courses</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <TrendingUp className="h-4 w-4" />
                                                <span>{path.progress}% complete</span>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">{path.progress}%</span>
                                            </div>
                                            <Progress value={path.progress} className="h-2" />
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {path.skills_covered.map((skill, index) => (
                                                <Badge key={index} variant="outline">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="space-y-2">
                                            <h4 className="font-medium text-gray-900 dark:text-white">Courses in this path:</h4>
                                            {path.courses.map((course, index) => (
                                                <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                    {course.completed ? (
                                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                                    ) : (
                                                        <Circle className="h-5 w-5 text-gray-400" />
                                                    )}
                                                    <span className="flex-1 text-sm">{course.title}</span>
                                                    <div className="flex items-center gap-2">
                                                        <Progress value={course.progress} className="w-20 h-2" />
                                                        <span className="text-xs text-gray-500">{course.progress}%</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Courses */}
                    <TabsContent value="courses" className="space-y-6">
                        <div className="grid gap-6">
                            {courses.map((course) => (
                                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                                                <CardDescription className="text-base mb-3">
                                                    {course.description}
                                                </CardDescription>
                                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                                    <div className="flex items-center gap-1">
                                                        <Users className="h-4 w-4" />
                                                        <span>{course.instructor}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                        <span>{course.rating}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        <span>{course.duration}</span>
                                                    </div>
                                                    <Badge className={getDifficultyColor(course.level)}>
                                                        {course.level}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-gray-900 dark:text-white">{course.price}</div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">{course.provider}</div>
                                                </div>
                                                <Button variant={course.enrolled ? "outline" : "default"}>
                                                    {course.enrolled ? "Continue" : "Enroll"}
                                                    <Play className="h-4 w-4 ml-2" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {course.skills.map((skill, index) => (
                                                <Badge key={index} variant="outline">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Certifications */}
                    <TabsContent value="certifications" className="space-y-6">
                        <div className="grid gap-6">
                            {certifications.map((cert) => (
                                <Card key={cert.id}>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                                    {cert.name}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400 mb-2">{cert.provider}</p>
                                                <p className="text-sm text-gray-500 mb-3">{cert.description}</p>
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <span>Expires: {new Date(cert.expiry_date).toLocaleDateString()}</span>
                                                    <Badge className={getStatusColor(cert.status)}>
                                                        {cert.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{cert.progress}%</div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">Complete</div>
                                                </div>
                                                <Progress value={cert.progress} className="w-24 h-2" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Achievements */}
                    <TabsContent value="achievements" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {achievements.map((achievement) => (
                                <Card key={achievement.id} className="text-center">
                                    <CardContent className="p-6">
                                        <div className="text-4xl mb-3">{achievement.icon}</div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                            {achievement.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                                            {achievement.description}
                                        </p>
                                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                            <Calendar className="h-4 w-4" />
                                            <span>Earned {new Date(achievement.earned_date).toLocaleDateString()}</span>
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
