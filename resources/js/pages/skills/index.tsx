import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Target,
    TrendingUp,
    AlertCircle,
    Lightbulb,
    BookOpen,
    Award,
    Brain,
    FileText,
    ArrowRight
} from 'lucide-react';

interface SkillProfile {
    technical: Record<string, number>;
    soft: Record<string, number>;
    tools: Record<string, number>;
}

interface SkillGap {
    skill: string;
    importance: string;
    reason: string;
}

interface Recommendation {
    type: string;
    title: string;
    provider: string;
    url: string;
}

interface Props {
    skillProfile: SkillProfile;
    skillGaps: SkillGap[];
    recommendations: Recommendation[];
    totalSkills: number;
    resumesAnalyzed: number;
}

export default function SkillsIndex({
    skillProfile,
    skillGaps,
    recommendations,
    totalSkills,
    resumesAnalyzed
}: Props) {
    const getSkillLevel = (score: number): string => {
        if (score >= 80) return 'Expert';
        if (score >= 60) return 'Advanced';
        if (score >= 40) return 'Intermediate';
        return 'Beginner';
    };

    const getSkillLevelColor = (score: number): string => {
        if (score >= 80) return 'bg-green-100 text-green-800';
        if (score >= 60) return 'bg-blue-100 text-blue-800';
        if (score >= 40) return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    };

    const getImportanceColor = (importance: string): string => {
        switch (importance.toLowerCase()) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getRecommendationIcon = (type: string) => {
        switch (type) {
            case 'course': return <BookOpen className="h-4 w-4" />;
            case 'certification': return <Award className="h-4 w-4" />;
            case 'practice': return <Brain className="h-4 w-4" />;
            default: return <Lightbulb className="h-4 w-4" />;
        }
    };

    return (
        <AppLayout>
            <Head title="My Skill Profile" />
            <div className="container mx-auto py-8 max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        My Skill Profile
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Comprehensive analysis of your skills based on {resumesAnalyzed} resume{resumesAnalyzed !== 1 ? 's' : ''} analyzed
                    </p>
                </div>

                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                                <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-3">
                                    <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Technical Skills
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {Object.keys(skillProfile.technical).length}
                                    </p>
                                </div>
                                <div className="bg-green-100 dark:bg-green-900 rounded-lg p-3">
                                    <Brain className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Soft Skills
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {Object.keys(skillProfile.soft).length}
                                    </p>
                                </div>
                                <div className="bg-purple-100 dark:bg-purple-900 rounded-lg p-3">
                                    <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Tools & Technologies
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {Object.keys(skillProfile.tools).length}
                                    </p>
                                </div>
                                <div className="bg-yellow-100 dark:bg-yellow-900 rounded-lg p-3">
                                    <FileText className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Technical Skills */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Brain className="h-5 w-5" />
                                Technical Skills
                            </CardTitle>
                            <CardDescription>
                                Your proficiency in programming languages and technical frameworks
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {Object.entries(skillProfile.technical).map(([skill, score]) => (
                                    <div key={skill} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {skill}
                                                </span>
                                                <Badge className={getSkillLevelColor(score)}>
                                                    {getSkillLevel(score)}
                                                </Badge>
                                            </div>
                                            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                                {score}%
                                            </span>
                                        </div>
                                        <Progress value={score} className="h-2" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Soft Skills */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Soft Skills
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {Object.entries(skillProfile.soft).map(([skill, score]) => (
                                    <div key={skill} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-gray-900 dark:text-white text-sm">
                                                {skill}
                                            </span>
                                            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                                {score}%
                                            </span>
                                        </div>
                                        <Progress value={score} className="h-2" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tools & Technologies */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Tools & Technologies
                        </CardTitle>
                        <CardDescription>
                            Your experience with development tools and platforms
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.entries(skillProfile.tools).map(([tool, score]) => (
                                <div key={tool} className="space-y-2 p-4 border rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {tool}
                                        </span>
                                        <Badge className={getSkillLevelColor(score)}>
                                            {getSkillLevel(score)}
                                        </Badge>
                                    </div>
                                    <Progress value={score} className="h-2" />
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        {score}% proficiency
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Skill Gaps */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5" />
                            Identified Skill Gaps
                        </CardTitle>
                        <CardDescription>
                            Skills that could strengthen your profile and career prospects
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {skillGaps.map((gap, index) => (
                                <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                                    <div className="bg-yellow-100 dark:bg-yellow-900 rounded-lg p-2">
                                        <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h4 className="font-semibold text-gray-900 dark:text-white">
                                                {gap.skill}
                                            </h4>
                                            <Badge className={getImportanceColor(gap.importance)}>
                                                {gap.importance} Priority
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {gap.reason}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Lightbulb className="h-5 w-5" />
                            Personalized Recommendations
                        </CardTitle>
                        <CardDescription>
                            Tailored learning paths to address your skill gaps
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {recommendations.map((rec, index) => (
                                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-2">
                                            {getRecommendationIcon(rec.type)}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                {rec.title}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                                by {rec.provider}
                                            </p>
                                            <Button size="sm" variant="outline" className="w-full">
                                                View Details
                                                <ArrowRight className="h-3 w-3 ml-1" />
                                            </Button>
                                        </div>
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
