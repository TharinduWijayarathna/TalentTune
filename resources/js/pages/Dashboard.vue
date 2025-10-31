<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { dashboard, cvReview, atsScoring, mockInterview, portfolio, profileScore } from '@/routes';
import { postJobs, reviewCandidates } from '@/routes';
import { userManagement, analytics, payments } from '@/routes';
import { type BreadcrumbItem, type UserRole } from '@/types';
import { Head, Link, usePage } from '@inertiajs/vue3';
import {
    FileText,
    FileCheck,
    Video,
    TrendingUp,
    Clock,
    Target,
    Briefcase,
    Users,
    BarChart3,
    CreditCard,
    Building2,
    FolderKanban,
} from 'lucide-vue-next';
import { computed } from 'vue';

const page = usePage();
const userRole = computed(() => (page.props.auth?.user?.role || 'job_seeker') as UserRole);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];
</script>

<template>
    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 p-6">
            <!-- Welcome Section -->
            <div>
                <h1 class="text-3xl font-bold tracking-tight">Welcome Back</h1>
                <p class="text-muted-foreground mt-2">
                    <template v-if="userRole === 'job_seeker'">
                        Your career preparation dashboard
                    </template>
                    <template v-else-if="userRole === 'hr_professional'">
                        Your HR management dashboard
                    </template>
                    <template v-else>
                        Your platform administration dashboard
                    </template>
                </p>
            </div>

            <!-- Job Seeker Stats -->
            <template v-if="userRole === 'job_seeker'">
                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card class="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle class="text-sm font-medium">CV Reviews</CardTitle>
                            <FileText class="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div class="text-2xl font-bold">0</div>
                            <p class="text-xs text-muted-foreground">Resumes reviewed</p>
                        </CardContent>
                    </Card>
                    <Card class="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle class="text-sm font-medium">ATS Scores</CardTitle>
                            <FileCheck class="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div class="text-2xl font-bold">0</div>
                            <p class="text-xs text-muted-foreground">Compatibility checks</p>
                        </CardContent>
                    </Card>
                    <Card class="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle class="text-sm font-medium">Interviews</CardTitle>
                            <Video class="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div class="text-2xl font-bold">0</div>
                            <p class="text-xs text-muted-foreground">Mock sessions completed</p>
                        </CardContent>
                    </Card>
                    <Card class="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle class="text-sm font-medium">Profile Score</CardTitle>
                            <TrendingUp class="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div class="text-2xl font-bold">--</div>
                            <p class="text-xs text-muted-foreground">Overall performance</p>
                        </CardContent>
                    </Card>
                </div>
            </template>

            <!-- HR Professional Stats -->
            <template v-else-if="userRole === 'hr_professional'">
                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card class="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle class="text-sm font-medium">Job Postings</CardTitle>
                            <Briefcase class="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div class="text-2xl font-bold">0</div>
                            <p class="text-xs text-muted-foreground">Active jobs</p>
                        </CardContent>
                    </Card>
                    <Card class="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle class="text-sm font-medium">Candidates</CardTitle>
                            <Users class="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div class="text-2xl font-bold">0</div>
                            <p class="text-xs text-muted-foreground">Total applicants</p>
                        </CardContent>
                    </Card>
                    <Card class="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle class="text-sm font-medium">Under Review</CardTitle>
                            <Clock class="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div class="text-2xl font-bold">0</div>
                            <p class="text-xs text-muted-foreground">Pending reviews</p>
                        </CardContent>
                    </Card>
                    <Card class="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle class="text-sm font-medium">Subscription</CardTitle>
                            <CreditCard class="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div class="text-2xl font-bold">Active</div>
                            <p class="text-xs text-muted-foreground">Current plan</p>
                        </CardContent>
                    </Card>
                </div>
            </template>

            <!-- Admin Stats -->
            <template v-else>
                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card class="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle class="text-sm font-medium">Total Users</CardTitle>
                            <Users class="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div class="text-2xl font-bold">--</div>
                            <p class="text-xs text-muted-foreground">Registered users</p>
                        </CardContent>
                    </Card>
                    <Card class="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle class="text-sm font-medium">Companies</CardTitle>
                            <Building2 class="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div class="text-2xl font-bold">--</div>
                            <p class="text-xs text-muted-foreground">Registered companies</p>
                        </CardContent>
                    </Card>
                    <Card class="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle class="text-sm font-medium">Revenue</CardTitle>
                            <CreditCard class="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div class="text-2xl font-bold">$0</div>
                            <p class="text-xs text-muted-foreground">Total revenue</p>
                        </CardContent>
                    </Card>
                    <Card class="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle class="text-sm font-medium">Growth</CardTitle>
                            <TrendingUp class="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div class="text-2xl font-bold">--</div>
                            <p class="text-xs text-muted-foreground">Platform growth</p>
                        </CardContent>
                    </Card>
                </div>
            </template>

            <!-- Quick Actions -->
            <div>
                <h2 class="text-xl font-semibold mb-4">Quick Actions</h2>
                <!-- Job Seeker Quick Actions -->
                <template v-if="userRole === 'job_seeker'">
                    <div class="grid gap-4 md:grid-cols-3">
                        <Card class="shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                            <Link :href="cvReview()">
                                <CardHeader>
                                    <CardTitle class="flex items-center gap-2 group-hover:text-primary transition-colors">
                                        <FileText class="h-5 w-5" />
                                        CV Review
                                    </CardTitle>
                                    <CardDescription>Upload and get feedback on your resume</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="outline" class="w-full group-hover:border-primary">
                                        Get Started
                                    </Button>
                                </CardContent>
                            </Link>
                        </Card>
                        <Card class="shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                            <Link :href="atsScoring()">
                                <CardHeader>
                                    <CardTitle class="flex items-center gap-2 group-hover:text-primary transition-colors">
                                        <Target class="h-5 w-5" />
                                        ATS Scoring
                                    </CardTitle>
                                    <CardDescription>Check resume compatibility with job descriptions</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="outline" class="w-full group-hover:border-primary">
                                        Analyze Now
                                    </Button>
                                </CardContent>
                            </Link>
                        </Card>
                        <Card class="shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                            <Link :href="portfolio()">
                                <CardHeader>
                                    <CardTitle class="flex items-center gap-2 group-hover:text-primary transition-colors">
                                        <FolderKanban class="h-5 w-5" />
                                        Portfolio
                                    </CardTitle>
                                    <CardDescription>Build and showcase your project portfolio</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="outline" class="w-full group-hover:border-primary">
                                        View Portfolio
                                    </Button>
                                </CardContent>
                            </Link>
                        </Card>
                    </div>
                </template>

                <!-- HR Professional Quick Actions -->
                <template v-else-if="userRole === 'hr_professional'">
                    <div class="grid gap-4 md:grid-cols-3">
                        <Card class="shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                            <Link :href="postJobs()">
                                <CardHeader>
                                    <CardTitle class="flex items-center gap-2 group-hover:text-primary transition-colors">
                                        <Briefcase class="h-5 w-5" />
                                        Post Jobs
                                    </CardTitle>
                                    <CardDescription>Create new job postings</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="outline" class="w-full group-hover:border-primary">
                                        Post Job
                                    </Button>
                                </CardContent>
                            </Link>
                        </Card>
                        <Card class="shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                            <Link :href="reviewCandidates()">
                                <CardHeader>
                                    <CardTitle class="flex items-center gap-2 group-hover:text-primary transition-colors">
                                        <Users class="h-5 w-5" />
                                        Review Candidates
                                    </CardTitle>
                                    <CardDescription>Browse and review candidate profiles</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="outline" class="w-full group-hover:border-primary">
                                        View Candidates
                                    </Button>
                                </CardContent>
                            </Link>
                        </Card>
                    </div>
                </template>

                <!-- Admin Quick Actions -->
                <template v-else>
                    <div class="grid gap-4 md:grid-cols-3">
                        <Card class="shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                            <Link :href="userManagement()">
                                <CardHeader>
                                    <CardTitle class="flex items-center gap-2 group-hover:text-primary transition-colors">
                                        <Users class="h-5 w-5" />
                                        User Management
                                    </CardTitle>
                                    <CardDescription>Manage all platform users</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="outline" class="w-full group-hover:border-primary">
                                        Manage Users
                                    </Button>
                                </CardContent>
                            </Link>
                        </Card>
                        <Card class="shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                            <Link :href="analytics()">
                                <CardHeader>
                                    <CardTitle class="flex items-center gap-2 group-hover:text-primary transition-colors">
                                        <BarChart3 class="h-5 w-5" />
                                        Analytics
                                    </CardTitle>
                                    <CardDescription>View platform analytics and insights</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="outline" class="w-full group-hover:border-primary">
                                        View Analytics
                                    </Button>
                                </CardContent>
                            </Link>
                        </Card>
                        <Card class="shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                            <Link :href="payments()">
                                <CardHeader>
                                    <CardTitle class="flex items-center gap-2 group-hover:text-primary transition-colors">
                                        <CreditCard class="h-5 w-5" />
                                        Payments
                                    </CardTitle>
                                    <CardDescription>Manage payments and subscriptions</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="outline" class="w-full group-hover:border-primary">
                                        Manage Payments
                                    </Button>
                                </CardContent>
                            </Link>
                        </Card>
                    </div>
                </template>
            </div>

            <!-- Recent Activity -->
            <div>
                <h2 class="text-xl font-semibold mb-4">Recent Activity</h2>
                <Card class="shadow-sm">
                    <CardContent class="pt-6">
                        <div class="flex flex-col items-center justify-center py-8 text-center">
                            <Clock class="h-12 w-12 text-muted-foreground mb-4" />
                            <p class="text-sm text-muted-foreground">
                                No recent activity. Start using our tools to see your progress here.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
