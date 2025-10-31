<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { reviewCandidates } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { Users, Search, UserCheck } from 'lucide-vue-next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Review Candidates',
        href: reviewCandidates().url,
    },
];
</script>

<template>
    <Head title="Review Candidates" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 p-6">
            <div>
                <h1 class="text-3xl font-bold tracking-tight">Review Candidates</h1>
                <p class="text-muted-foreground mt-2">
                    Browse and review candidate profiles and applications
                </p>
            </div>

            <Card class="shadow-sm">
                <CardHeader>
                    <CardTitle>Candidate Profiles</CardTitle>
                    <CardDescription>View candidate profiles and application details</CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="flex flex-col items-center justify-center py-8 text-center">
                        <Users class="h-12 w-12 text-muted-foreground mb-4" />
                        <p class="text-sm text-muted-foreground">
                            No candidates to review yet. Candidates will appear here once they apply to your job postings.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>

