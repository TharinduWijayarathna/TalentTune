<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { atsScoring } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { Upload, TrendingUp, FileText, Target } from 'lucide-vue-next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'ATS Scoring',
        href: atsScoring().url,
    },
];
</script>

<template>
    <Head title="ATS Scoring" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 p-6">
            <!-- Page Header -->
            <div>
                <h1 class="text-3xl font-bold tracking-tight">ATS Scoring</h1>
                <p class="text-muted-foreground mt-2">
                    Analyze your resume compatibility with job descriptions using AI-powered ATS scanning
                </p>
            </div>

            <!-- Upload Section -->
            <div class="grid gap-6 md:grid-cols-2">
                <Card class="shadow-sm">
                    <CardHeader>
                        <CardTitle>Upload Your Resume</CardTitle>
                        <CardDescription>
                            Your current resume for ATS analysis
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 hover:border-primary/50 transition-colors">
                            <FileText class="h-10 w-10 text-muted-foreground mb-4" />
                            <p class="text-sm text-muted-foreground mb-2">
                                Resume uploaded
                            </p>
                            <Button variant="outline" size="sm">
                                <Upload class="mr-2 h-4 w-4" />
                                Change File
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card class="shadow-sm">
                    <CardHeader>
                        <CardTitle>Job Description</CardTitle>
                        <CardDescription>
                            Paste or upload the job posting
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <textarea
                            class="w-full min-h-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            placeholder="Paste job description here..."
                        ></textarea>
                        <Button class="mt-4 w-full">
                            <Target class="mr-2 h-4 w-4" />
                            Analyze Compatibility
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <!-- Score Card -->
            <Card class="shadow-sm bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                    <CardTitle class="flex items-center gap-2">
                        <TrendingUp class="h-5 w-5" />
                        Compatibility Score
                    </CardTitle>
                    <CardDescription>
                        Overall ATS compatibility rating
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="flex items-end gap-4">
                        <div class="text-6xl font-bold">--</div>
                        <div class="text-2xl text-muted-foreground mb-2">/100</div>
                    </div>
                    <p class="text-sm text-muted-foreground mt-4">
                        Upload a resume and job description to get your compatibility score
                    </p>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>

