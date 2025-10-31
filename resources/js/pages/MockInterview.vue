<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockInterview } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { Video, Play, Mic, Clock, TrendingUp } from 'lucide-vue-next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Mock Interview',
        href: mockInterview().url,
    },
];
</script>

<template>
    <Head title="Mock Interview" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 p-6">
            <!-- Page Header -->
            <div>
                <h1 class="text-3xl font-bold tracking-tight">Mock Interview</h1>
                <p class="text-muted-foreground mt-2">
                    Practice with AI-powered interviews and get detailed feedback on your performance
                </p>
            </div>

            <!-- Quick Start Card -->
            <Card class="shadow-sm bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                    <CardTitle class="flex items-center gap-2">
                        <Video class="h-5 w-5" />
                        Start New Interview
                    </CardTitle>
                    <CardDescription>
                        Choose your interview type and difficulty level
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="grid gap-4 md:grid-cols-3 mb-6">
                        <Button variant="outline" class="h-auto flex-col py-6">
                            <Mic class="h-8 w-8 mb-2" />
                            <span>Technical</span>
                        </Button>
                        <Button variant="outline" class="h-auto flex-col py-6">
                            <Mic class="h-8 w-8 mb-2" />
                            <span>Behavioral</span>
                        </Button>
                        <Button variant="outline" class="h-auto flex-col py-6">
                            <Mic class="h-8 w-8 mb-2" />
                            <span>Mixed</span>
                        </Button>
                    </div>
                    <Button size="lg" class="w-full">
                        <Play class="mr-2 h-4 w-4" />
                        Start Interview Session
                    </Button>
                </CardContent>
            </Card>

            <!-- Interview Stats -->
            <div class="grid gap-4 md:grid-cols-3">
                <Card class="shadow-sm">
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Total Interviews</CardTitle>
                        <Video class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">--</div>
                        <p class="text-xs text-muted-foreground">Practice sessions completed</p>
                    </CardContent>
                </Card>

                <Card class="shadow-sm">
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Average Score</CardTitle>
                        <TrendingUp class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">--</div>
                        <p class="text-xs text-muted-foreground">Overall performance rating</p>
                    </CardContent>
                </Card>

                <Card class="shadow-sm">
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Time Practiced</CardTitle>
                        <Clock class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">--</div>
                        <p class="text-xs text-muted-foreground">Hours of practice</p>
                    </CardContent>
                </Card>
            </div>

            <!-- Recent Interviews -->
            <div>
                <h2 class="text-xl font-semibold mb-4">Recent Interviews</h2>
                <Card class="shadow-sm">
                    <CardContent class="pt-6">
                        <p class="text-sm text-muted-foreground text-center py-8">
                            No interviews yet. Start your first mock interview to see your results here.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>

