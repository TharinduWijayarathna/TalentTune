import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    FolderOpen,
    ExternalLink,
    Github,
    Star,
    GitFork,
    Calendar,
    Code,
    Eye,
    Plus,
    Edit,
    Trash2,
    Award,
    MessageSquare,
    Users,
    TrendingUp,
    Globe,
} from 'lucide-react';

interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    image: string;
    live_url: string;
    github_url: string;
    featured: boolean;
    created_date: string;
    category: string;
    status: string;
}

interface Repository {
    id: number;
    name: string;
    description: string;
    language: string;
    stars: number;
    forks: number;
    updated: string;
    url: string;
}

interface Achievement {
    id: number;
    title: string;
    description: string;
    icon: string;
    earned_date: string;
}

interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
}

interface Props {
    projects: Project[];
    repositories: Repository[];
    achievements: Achievement[];
    testimonials: Testimonial[];
}

export default function PortfolioIndex({ projects, repositories, achievements, testimonials }: Props) {
    const [activeTab, setActiveTab] = useState('projects');

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'in progress': return 'bg-blue-100 text-blue-800';
            case 'planned': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category.toLowerCase()) {
            case 'web application': return 'bg-blue-100 text-blue-800';
            case 'dashboard': return 'bg-purple-100 text-purple-800';
            case 'mobile app': return 'bg-green-100 text-green-800';
            case 'api': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-4 w-4 ${
                    i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
            />
        ));
    };

    return (
        <AppLayout>
            <Head title="Portfolio & Projects" />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Portfolio & Projects</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Showcase your work and track your development journey
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{projects.length}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{repositories.length}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Repositories</div>
                        </div>
                        <Button className="bg-purple-600 hover:bg-purple-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Project
                        </Button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Stars</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {repositories.reduce((sum, repo) => sum + repo.stars, 0)}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                                    <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Forks</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {repositories.reduce((sum, repo) => sum + repo.forks, 0)}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                    <GitFork className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Achievements</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{achievements.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                                    <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Testimonials</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{testimonials.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                    <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="projects" className="flex items-center gap-2">
                            <FolderOpen className="h-4 w-4" />
                            Projects
                        </TabsTrigger>
                        <TabsTrigger value="repositories" className="flex items-center gap-2">
                            <Github className="h-4 w-4" />
                            Repositories
                        </TabsTrigger>
                        <TabsTrigger value="achievements" className="flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            Achievements
                        </TabsTrigger>
                        <TabsTrigger value="testimonials" className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Testimonials
                        </TabsTrigger>
                    </TabsList>

                    {/* Projects */}
                    <TabsContent value="projects" className="space-y-6">
                        <div className="grid gap-6">
                            {projects.map((project) => (
                                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <CardTitle className="text-xl">{project.title}</CardTitle>
                                                    {project.featured && (
                                                        <Badge className="bg-purple-100 text-purple-800">
                                                            Featured
                                                        </Badge>
                                                    )}
                                                </div>
                                                <CardDescription className="text-base">
                                                    {project.description}
                                                </CardDescription>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="outline" size="sm">
                                                    <Edit className="h-4 w-4 mr-2" />
                                                    Edit
                                                </Button>
                                                <Button asChild>
                                                    <Link href={`/portfolio/${project.id}`}>
                                                        <Eye className="h-4 w-4 mr-2" />
                                                        View
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <Calendar className="h-4 w-4" />
                                                <span>{new Date(project.created_date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge className={getCategoryColor(project.category)}>
                                                    {project.category}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge className={getStatusColor(project.status)}>
                                                    {project.status}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <Code className="h-4 w-4" />
                                                <span>{project.technologies.length} technologies</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.technologies.map((tech, index) => (
                                                <Badge key={index} variant="outline">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <Button variant="outline" size="sm" asChild>
                                                <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                                                    <Globe className="h-4 w-4 mr-2" />
                                                    Live Demo
                                                    <ExternalLink className="h-4 w-4 ml-2" />
                                                </a>
                                            </Button>
                                            <Button variant="outline" size="sm" asChild>
                                                <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                                                    <Github className="h-4 w-4 mr-2" />
                                                    Source Code
                                                    <ExternalLink className="h-4 w-4 ml-2" />
                                                </a>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Repositories */}
                    <TabsContent value="repositories" className="space-y-6">
                        <div className="grid gap-4">
                            {repositories.map((repo) => (
                                <Card key={repo.id}>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        {repo.name}
                                                    </h3>
                                                    <Badge variant="outline">
                                                        {repo.language}
                                                    </Badge>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-400 mb-3">
                                                    {repo.description}
                                                </p>
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-4 w-4" />
                                                        <span>{repo.stars}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <GitFork className="h-4 w-4" />
                                                        <span>{repo.forks}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>Updated {new Date(repo.updated).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm" asChild>
                                                <a href={repo.url} target="_blank" rel="noopener noreferrer">
                                                    <Github className="h-4 w-4 mr-2" />
                                                    View
                                                    <ExternalLink className="h-4 w-4 ml-2" />
                                                </a>
                                            </Button>
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

                    {/* Testimonials */}
                    <TabsContent value="testimonials" className="space-y-6">
                        <div className="grid gap-6">
                            {testimonials.map((testimonial) => (
                                <Card key={testimonial.id}>
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                                                <Users className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                                        {testimonial.name}
                                                    </h3>
                                                    <div className="flex items-center gap-1">
                                                        {renderStars(testimonial.rating)}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                    {testimonial.role} at {testimonial.company}
                                                </p>
                                                <p className="text-gray-700 dark:text-gray-300 italic">
                                                    "{testimonial.content}"
                                                </p>
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
