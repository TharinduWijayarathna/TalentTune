<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { filterCandidates } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { Filter, Search, SlidersHorizontal } from 'lucide-vue-next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Filter Candidates',
        href: filterCandidates().url,
    },
];
</script>

<template>
    <Head title="Filter Candidates" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 p-6">
            <div>
                <h1 class="text-3xl font-bold tracking-tight">Filter Candidates</h1>
                <p class="text-muted-foreground mt-2">
                    Search and filter job seekers by skills, experience, and qualifications
                </p>
            </div>

            <Card class="shadow-sm">
                <CardHeader>
                    <CardTitle class="flex items-center gap-2">
                        <SlidersHorizontal class="h-5 w-5" />
                        Filter Options
                    </CardTitle>
                    <CardDescription>Use filters to find the perfect candidates</CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="space-y-4">
                        <div>
                            <label class="text-sm font-medium mb-2 block">Skills</label>
                            <input
                                type="text"
                                placeholder="Search by skills..."
                                class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label class="text-sm font-medium mb-2 block">Experience Level</label>
                            <select class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                <option>Any</option>
                                <option>Entry Level</option>
                                <option>Mid Level</option>
                                <option>Senior Level</option>
                            </select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card class="shadow-sm">
                <CardHeader>
                    <CardTitle>Search Results</CardTitle>
                    <CardDescription>Matching candidates will appear here</CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="flex flex-col items-center justify-center py-8 text-center">
                        <Search class="h-12 w-12 text-muted-foreground mb-4" />
                        <p class="text-sm text-muted-foreground">
                            Apply filters above to search for candidates
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>

