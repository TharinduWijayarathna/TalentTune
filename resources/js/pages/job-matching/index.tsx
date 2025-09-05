import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Search,
    MapPin,
    Clock,
    DollarSign,
    Bookmark,
    ExternalLink,
    Briefcase,
    CheckCircle,
    Calendar,
} from 'lucide-react';

interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    remote: boolean;
    salary: string;
    match_score: number;
    posted_date: string;
    description: string;
    requirements: string[];
    benefits: string[];
    application_status: string | null;
}

interface Application {
    id: number;
    job_id: number;
    job_title: string;
    company: string;
    applied_date: string;
    status: string;
    next_step: string;
    notes: string;
}

interface Props {
    jobs: Job[];
    applications: Application[];
    savedJobs: Job[];
}

export default function JobMatchingIndex({ jobs, applications, savedJobs }: Props) {
    const [activeTab, setActiveTab] = useState<'jobs' | 'applications' | 'saved'>('jobs');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterLocation, setFilterLocation] = useState('all');

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || job.type.toLowerCase() === filterType.toLowerCase();
        const matchesLocation = filterLocation === 'all' ||
                              (filterLocation === 'remote' && job.remote) ||
                              job.location.toLowerCase().includes(filterLocation.toLowerCase());

        return matchesSearch && matchesType && matchesLocation;
    });

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'under review': return 'bg-yellow-100 text-yellow-800';
            case 'interview scheduled': return 'bg-blue-100 text-blue-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            case 'offered': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getMatchScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-600';
        if (score >= 80) return 'text-blue-600';
        if (score >= 70) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <AppLayout>
            <Head title="Job Matching" />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Job Matching</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Find your perfect job match with AI-powered recommendations
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{jobs.length}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Available Jobs</div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{applications.length}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Applications</div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab('jobs')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                            activeTab === 'jobs'
                                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                        <Briefcase className="h-4 w-4 inline mr-2" />
                        Available Jobs
                    </button>
                    <button
                        onClick={() => setActiveTab('applications')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                            activeTab === 'applications'
                                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                        <CheckCircle className="h-4 w-4 inline mr-2" />
                        My Applications
                    </button>
                    <button
                        onClick={() => setActiveTab('saved')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                            activeTab === 'saved'
                                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                        <Bookmark className="h-4 w-4 inline mr-2" />
                        Saved Jobs
                    </button>
                </div>

                {/* Filters */}
                {activeTab === 'jobs' && (
                    <div className="flex flex-wrap gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex-1 min-w-64">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                    placeholder="Search jobs, companies..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>
                        <Select value={filterType} onValueChange={setFilterType}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Job Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="full-time">Full-time</SelectItem>
                                <SelectItem value="part-time">Part-time</SelectItem>
                                <SelectItem value="contract">Contract</SelectItem>
                                <SelectItem value="remote">Remote</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={filterLocation} onValueChange={setFilterLocation}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Location" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Locations</SelectItem>
                                <SelectItem value="remote">Remote</SelectItem>
                                <SelectItem value="san francisco">San Francisco</SelectItem>
                                <SelectItem value="new york">New York</SelectItem>
                                <SelectItem value="austin">Austin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {/* Content */}
                {activeTab === 'jobs' && (
                    <div className="grid gap-6">
                        {filteredJobs.map((job) => (
                            <Card key={job.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <CardTitle className="text-xl">{job.title}</CardTitle>
                                                <Badge className={`${getMatchScoreColor(job.match_score)} bg-opacity-20`}>
                                                    {job.match_score}% Match
                                                </Badge>
                                            </div>
                                            <CardDescription className="text-lg font-medium text-gray-900 dark:text-white">
                                                {job.company}
                                            </CardDescription>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm">
                                                <Bookmark className="h-4 w-4 mr-2" />
                                                Save
                                            </Button>
                                            <Button asChild>
                                                <Link href={`/job-matching/${job.id}`}>
                                                    View Details
                                                    <ExternalLink className="h-4 w-4 ml-2" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                            <MapPin className="h-4 w-4" />
                                            <span>{job.location}</span>
                                            {job.remote && <Badge variant="secondary">Remote</Badge>}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                            <Clock className="h-4 w-4" />
                                            <span>{job.type}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                            <DollarSign className="h-4 w-4" />
                                            <span>{job.salary}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                            <Calendar className="h-4 w-4" />
                                            <span>{new Date(job.posted_date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">{job.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {job.requirements.slice(0, 5).map((requirement, index) => (
                                            <Badge key={index} variant="outline">
                                                {requirement}
                                            </Badge>
                                        ))}
                                        {job.requirements.length > 5 && (
                                            <Badge variant="outline">
                                                +{job.requirements.length - 5} more
                                            </Badge>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {activeTab === 'applications' && (
                    <div className="grid gap-4">
                        {applications.map((application) => (
                            <Card key={application.id}>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {application.job_title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400">{application.company}</p>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                                <span>Applied: {new Date(application.applied_date).toLocaleDateString()}</span>
                                                <span>Next: {application.next_step}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge className={getStatusColor(application.status)}>
                                                {application.status}
                                            </Badge>
                                            <Button variant="outline" size="sm">
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {activeTab === 'saved' && (
                    <div className="grid gap-4">
                        {savedJobs.map((savedJob) => {
                            const job = jobs.find(j => j.id === savedJob.job_id);
                            if (!job) return null;

                            return (
                                <Card key={savedJob.id}>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {job.title}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
                                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                                    <span>{job.location}</span>
                                                    <span>{job.salary}</span>
                                                    <span>Saved: {new Date(savedJob.saved_date).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Button variant="outline" size="sm">
                                                    Apply Now
                                                </Button>
                                                <Button variant="ghost" size="sm">
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
