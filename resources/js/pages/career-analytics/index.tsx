import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    TrendingUp,
    DollarSign,
    Target,
    BarChart3,
    PieChart,
    Calendar,
    Star,
    ArrowUp,
    ArrowDown,
    Minus,
    Eye,
} from 'lucide-react';

interface SkillTrend {
    skill: string;
    demand: number;
    growth: number;
    salary_impact: number;
    trend: string;
}

interface SalaryInsight {
    current_estimate: number;
    market_average: number;
    percentile: number;
    growth_potential: number;
    skills_impact: Array<{
        skill: string;
        impact: number;
    }>;
}

interface MarketTrend {
    title: string;
    description: string;
    impact: string;
    date: string;
}

interface CareerLevel {
    level: string;
    salary_range: string;
    skills_required: string[];
    time_to_achieve: string;
    achieved: boolean;
    progress?: number;
}

interface IndustryInsight {
    industry: string;
    growth_rate: number;
    average_salary: number;
    job_openings: number;
    top_skills: string[];
}

interface Props {
    skillTrends: SkillTrend[];
    salaryInsights: SalaryInsight;
    marketTrends: MarketTrend[];
    careerPath: CareerLevel[];
    industryInsights: IndustryInsight[];
}

export default function CareerAnalyticsIndex({
    skillTrends,
    salaryInsights,
    marketTrends,
    careerPath,
    industryInsights
}: Props) {
    const [activeTab, setActiveTab] = useState('overview');

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case 'rising': return <ArrowUp className="h-4 w-4 text-green-500" />;
            case 'falling': return <ArrowDown className="h-4 w-4 text-red-500" />;
            default: return <Minus className="h-4 w-4 text-gray-500" />;
        }
    };

    const getTrendColor = (trend: string) => {
        switch (trend) {
            case 'rising': return 'text-green-600';
            case 'falling': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    const getImpactColor = (impact: string) => {
        switch (impact.toLowerCase()) {
            case 'positive': return 'bg-green-100 text-green-800';
            case 'negative': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AppLayout>
            <Head title="Career Analytics" />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Career Analytics</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Insights and trends to guide your career decisions
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {formatCurrency(salaryInsights.current_estimate)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Current Estimate</div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {salaryInsights.percentile}th
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Percentile</div>
                        </div>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Market Average</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {formatCurrency(salaryInsights.market_average)}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                    <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Growth Potential</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {formatCurrency(salaryInsights.growth_potential)}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                    <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Top Skills</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {skillTrends.filter(s => s.demand >= 90).length}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                                    <Star className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Career Level</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {careerPath.filter(level => level.achieved).length}/{careerPath.length}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                                    <Target className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview" className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="skills" className="flex items-center gap-2">
                            <Star className="h-4 w-4" />
                            Skills Analysis
                        </TabsTrigger>
                        <TabsTrigger value="career" className="flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            Career Path
                        </TabsTrigger>
                        <TabsTrigger value="market" className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Market Trends
                        </TabsTrigger>
                    </TabsList>

                    {/* Overview */}
                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Skill Trends */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5" />
                                        Skill Demand Trends
                                    </CardTitle>
                                    <CardDescription>
                                        Current market demand for your skills
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {skillTrends.map((skill, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-medium text-gray-900 dark:text-white">
                                                        {skill.skill}
                                                    </span>
                                                    {getTrendIcon(skill.trend)}
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-right">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {skill.demand}%
                                                        </div>
                                                        <div className="text-xs text-gray-500">Demand</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className={`text-sm font-medium ${getTrendColor(skill.trend)}`}>
                                                            {skill.growth > 0 ? '+' : ''}{skill.growth}%
                                                        </div>
                                                        <div className="text-xs text-gray-500">Growth</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Salary Impact */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <DollarSign className="h-5 w-5" />
                                        Skills Salary Impact
                                    </CardTitle>
                                    <CardDescription>
                                        How your skills affect your earning potential
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {salaryInsights.skills_impact.map((skill, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {skill.skill}
                                                </span>
                                                <div className="text-right">
                                                    <div className="text-sm font-medium text-green-600">
                                                        +{formatCurrency(skill.impact)}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Salary Impact</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Industry Insights */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <PieChart className="h-5 w-5" />
                                    Industry Insights
                                </CardTitle>
                                <CardDescription>
                                    Compare opportunities across different industries
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {industryInsights.map((industry, index) => (
                                        <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                                {industry.industry}
                                            </h3>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600 dark:text-gray-400">Growth Rate:</span>
                                                    <span className="font-medium text-green-600">+{industry.growth_rate}%</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600 dark:text-gray-400">Avg Salary:</span>
                                                    <span className="font-medium">{formatCurrency(industry.average_salary)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600 dark:text-gray-400">Openings:</span>
                                                    <span className="font-medium">{industry.job_openings.toLocaleString()}</span>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <div className="text-xs text-gray-500 mb-1">Top Skills:</div>
                                                <div className="flex flex-wrap gap-1">
                                                    {industry.top_skills.slice(0, 3).map((skill, skillIndex) => (
                                                        <Badge key={skillIndex} variant="outline" className="text-xs">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Skills Analysis */}
                    <TabsContent value="skills" className="space-y-6">
                        <div className="grid gap-6">
                            {skillTrends.map((skill, index) => (
                                <Card key={index}>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {skill.skill}
                                                </h3>
                                                {getTrendIcon(skill.trend)}
                                            </div>
                                            <Badge className={`${getTrendColor(skill.trend)} bg-opacity-20`}>
                                                {skill.trend}
                                            </Badge>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    {skill.demand}%
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">Market Demand</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    {skill.growth > 0 ? '+' : ''}{skill.growth}%
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">Growth Rate</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    +{skill.salary_impact}%
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">Salary Impact</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Career Path */}
                    <TabsContent value="career" className="space-y-6">
                        <div className="space-y-4">
                            {careerPath.map((level, index) => (
                                <Card key={index} className={level.achieved ? 'border-green-200 dark:border-green-800' : ''}>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        {level.level}
                                                    </h3>
                                                    {level.achieved ? (
                                                        <Badge className="bg-green-100 text-green-800">
                                                            Achieved
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="outline">
                                                            {level.time_to_achieve}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-400 mb-3">
                                                    {level.salary_range}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {level.skills_required.map((skill, skillIndex) => (
                                                        <Badge key={skillIndex} variant="outline">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            {!level.achieved && level.progress && (
                                                <div className="flex flex-col items-end gap-2">
                                                    <div className="text-right">
                                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                                            {level.progress}%
                                                        </div>
                                                        <div className="text-sm text-gray-600 dark:text-gray-400">Progress</div>
                                                    </div>
                                                    <Progress value={level.progress} className="w-24 h-2" />
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Market Trends */}
                    <TabsContent value="market" className="space-y-6">
                        <div className="grid gap-6">
                            {marketTrends.map((trend, index) => (
                                <Card key={index}>
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        {trend.title}
                                                    </h3>
                                                    <Badge className={getImpactColor(trend.impact)}>
                                                        {trend.impact}
                                                    </Badge>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-400 mb-3">
                                                    {trend.description}
                                                </p>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{new Date(trend.date).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                <Eye className="h-4 w-4 mr-2" />
                                                Learn More
                                            </Button>
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
