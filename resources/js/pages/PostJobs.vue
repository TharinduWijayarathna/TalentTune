<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { postJobs } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { Briefcase, Plus, MapPin, DollarSign } from 'lucide-vue-next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Post Jobs',
        href: postJobs().url,
    },
];
</script>

<template>
    <Head title="Post Jobs" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 p-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Post Job Vacancies</h1>
                    <p class="text-muted-foreground mt-2">
                        Create and manage job postings for your organization
                    </p>
                </div>
                <Button>
                    <Plus class="mr-2 h-4 w-4" />
                    Post New Job
                </Button>
            </div>

            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card class="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle class="text-lg">No jobs posted</CardTitle>
                        <CardDescription>Start posting job vacancies to attract candidates</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" class="w-full">
                            <Plus class="mr-2 h-4 w-4" />
                            Create First Job Posting
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>

