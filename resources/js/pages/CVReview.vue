<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cvReview } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { Upload, FileText, CheckCircle2 } from 'lucide-vue-next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'CV Review',
        href: cvReview().url,
    },
];
</script>

<template>
    <Head title="CV Review" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 p-6">
            <!-- Page Header -->
            <div>
                <h1 class="text-3xl font-bold tracking-tight">CV Review</h1>
                <p class="text-muted-foreground mt-2">
                    Upload your resume and get personalized feedback to improve your CV
                </p>
            </div>

            <!-- Upload Section -->
            <Card class="shadow-sm">
                <CardHeader>
                    <CardTitle>Upload Your Resume</CardTitle>
                    <CardDescription>
                        Supported formats: PDF, DOC, DOCX (Max 10MB)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 hover:border-primary/50 transition-colors">
                        <Upload class="h-12 w-12 text-muted-foreground mb-4" />
                        <p class="text-sm text-muted-foreground mb-2">
                            Drag and drop your resume here, or click to browse
                        </p>
                        <Button variant="outline">
                            <Upload class="mr-2 h-4 w-4" />
                            Choose File
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <!-- Recent Reviews -->
            <div>
                <h2 class="text-xl font-semibold mb-4">Recent Reviews</h2>
                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card class="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div class="flex items-center justify-between">
                                <CardTitle class="text-lg">Senior Developer CV</CardTitle>
                                <CheckCircle2 class="h-5 w-5 text-green-500" />
                            </div>
                            <CardDescription>Reviewed 2 days ago</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p class="text-sm text-muted-foreground">
                                Overall score: 8.5/10
                            </p>
                        </CardContent>
                    </Card>
                    <Card class="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div class="flex items-center justify-between">
                                <CardTitle class="text-lg">Frontend Developer CV</CardTitle>
                                <FileText class="h-5 w-5 text-blue-500" />
                            </div>
                            <CardDescription>Reviewed 1 week ago</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p class="text-sm text-muted-foreground">
                                Overall score: 7.2/10
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

