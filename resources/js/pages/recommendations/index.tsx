import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Lightbulb,
    BookOpen,
    Briefcase,
    Target,
    ExternalLink,
    CheckCircle,
    Clock,
    Star,
    Users,
    DollarSign,
    Award,
    TrendingUp
} from 'lucide-react';

interface Recommendation {
    id: number;
    type: string;
    title: string;
    description: string;
    category: string;
    related_skills: string[];
    url: string | null;
    provider: string;
    priority: number;
    metadata: Record<string, any>;
    is_completed: boolean;
    is_dismissed: boolean;
}

interface Category {
    title: string;
    description: string;
    count: number;
    icon: string;
}

interface Props {
    recommendations: any[];
    personalizedRecommendations: Recommendation[];
    categories: Record<string, Category>;
}

export default function RecommendationsIndex({
    personalizedRecommendations,
    categories
}: Props) {
    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'course': return <BookOpen className="h-4 w-4" />;
            case 'certification': return <Award className="h-4 w-4" />;
            case 'practice': return <Target className="h-4 w-4" />;
            case 'job_role': return <Briefcase className="h-4 w-4" />;
            default: return <Lightbulb className="h-4 w-4" />;
        }
    };

    const getTypeColor = (type: string): string => {
        switch (type) {
            case 'course': return 'bg-blue-100 text-blue-800';
            case 'certification': return 'bg-purple-100 text-purple-800';
            case 'practice': return 'bg-green-100 text-green-800';
            case 'job_role': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority: number): string => {
        if (priority >= 5) return 'bg-red-100 text-red-800';
        if (priority >= 3) return 'bg-yellow-100 text-yellow-800';
        return 'bg-green-100 text-green-800';
    };

    const getCategoryIcon = (iconName: string) => {
        switch (iconName) {
            case 'BookOpen': return <BookOpen className="h-5 w-5" />;
            case 'Briefcase': return <Briefcase className="h-5 w-5" />;
            case 'Target': return <Target className="h-5 w-5" />;
            default: return <Lightbulb className="h-5 w-5" />;
        }
    };

    const getCategoryColor = (category: string): string => {
        switch (category) {
            case 'learning': return 'bg-blue-100 dark:bg-blue-900';
            case 'career': return 'bg-purple-100 dark:bg-purple-900';
            case 'skill_development': return 'bg-green-100 dark:bg-green-900';
            default: return 'bg-gray-100 dark:bg-gray-900';
        }
    };

    const getCategoryIconColor = (category: string): string => {
        switch (category) {
            case 'learning': return 'text-blue-600 dark:text-blue-400';
            case 'career': return 'text-purple-600 dark:text-purple-400';
            case 'skill_development': return 'text-green-600 dark:text-green-400';
            default: return 'text-gray-600 dark:text-gray-400';
        }
    };

    return (
        <AppLayout>
            <Head title="Recommendations" />
            <div className="container mx-auto py-8 max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Personalized Recommendations
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        AI-powered suggestions to accelerate your career growth and skill development.
                    </p>
                </div>

                {/* Category Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {Object.entries(categories).map(([key, category]) => (
                        <Card key={key}>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            {category.title}
                                        </p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {category.count}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {category.description}
                                        </p>
                                    </div>
                                    <div className={`${getCategoryColor(key)} rounded-lg p-3`}>
                                        <div className={getCategoryIconColor(key)}>
                                            {getCategoryIcon(category.icon)}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* High Priority Recommendations */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        High Priority Recommendations
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {personalizedRecommendations
                            .filter(rec => rec.priority >= 4 && !rec.is_completed)
                            .map((recommendation) => (
                            <Card key={recommendation.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`${getCategoryColor(recommendation.category)} rounded-lg p-2`}>
                                                <div className={getCategoryIconColor(recommendation.category)}>
                                                    {getTypeIcon(recommendation.type)}
                                                </div>
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg">
                                                    {recommendation.title}
                                                </CardTitle>
                                                <CardDescription>
                                                    {recommendation.provider}
                                                </CardDescription>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Badge className={getPriorityColor(recommendation.priority)}>
                                                Priority {recommendation.priority}
                                            </Badge>
                                            <Badge className={getTypeColor(recommendation.type)}>
                                                {recommendation.type}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <p className="text-gray-700 dark:text-gray-300">
                                            {recommendation.description}
                                        </p>

                                        <div>
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Related Skills:
                                            </p>
                                            <div className="flex flex-wrap gap-1">
                                                {recommendation.related_skills.map((skill, index) => (
                                                    <Badge key={index} variant="outline" className="text-xs">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Metadata */}
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            {recommendation.metadata.duration && (
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-gray-500" />
                                                    <span className="text-gray-600 dark:text-gray-400">
                                                        {recommendation.metadata.duration}
                                                    </span>
                                                </div>
                                            )}
                                            {recommendation.metadata.rating && (
                                                <div className="flex items-center gap-2">
                                                    <Star className="h-4 w-4 text-yellow-500" />
                                                    <span className="text-gray-600 dark:text-gray-400">
                                                        {recommendation.metadata.rating}/5
                                                    </span>
                                                </div>
                                            )}
                                            {recommendation.metadata.students && (
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-4 w-4 text-gray-500" />
                                                    <span className="text-gray-600 dark:text-gray-400">
                                                        {recommendation.metadata.students}
                                                    </span>
                                                </div>
                                            )}
                                            {recommendation.metadata.salary_range && (
                                                <div className="flex items-center gap-2">
                                                    <DollarSign className="h-4 w-4 text-green-500" />
                                                    <span className="text-gray-600 dark:text-gray-400">
                                                        {recommendation.metadata.salary_range}
                                                    </span>
                                                </div>
                                            )}
                                            {recommendation.metadata.match_percentage && (
                                                <div className="flex items-center gap-2">
                                                    <TrendingUp className="h-4 w-4 text-blue-500" />
                                                    <span className="text-gray-600 dark:text-gray-400">
                                                        {recommendation.metadata.match_percentage}% match
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex gap-2 pt-2">
                                            {recommendation.url && (
                                                <Button size="sm" asChild>
                                                    <a href={recommendation.url} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="h-4 w-4 mr-2" />
                                                        View Details
                                                    </a>
                                                </Button>
                                            )}
                                            <Button size="sm" variant="outline">
                                                Mark Complete
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* All Recommendations */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        All Recommendations
                    </h2>
                    <div className="space-y-4">
                        {personalizedRecommendations.map((recommendation) => (
                            <Card key={recommendation.id} className="hover:shadow-md transition-shadow">
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`${getCategoryColor(recommendation.category)} rounded-lg p-2`}>
                                                <div className={getCategoryIconColor(recommendation.category)}>
                                                    {getTypeIcon(recommendation.type)}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                                        {recommendation.title}
                                                    </h4>
                                                    {recommendation.is_completed && (
                                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                    {recommendation.description}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-gray-500">
                                                        by {recommendation.provider}
                                                    </span>
                                                    <Badge className={getTypeColor(recommendation.type)} variant="outline">
                                                        {recommendation.type}
                                                    </Badge>
                                                    <Badge className={getPriorityColor(recommendation.priority)} variant="outline">
                                                        Priority {recommendation.priority}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            {recommendation.url && (
                                                <Button size="sm" variant="outline" asChild>
                                                    <a href={recommendation.url} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                            )}
                                            {!recommendation.is_completed && (
                                                <Button size="sm" variant="outline">
                                                    Mark Complete
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
