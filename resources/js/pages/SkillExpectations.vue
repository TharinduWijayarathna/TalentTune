<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { skillExpectations } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { Target, TrendingUp, Plus } from 'lucide-vue-next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Skill Expectations',
        href: skillExpectations().url,
    },
];
</script>

<template>
    <Head title="Skill Expectations" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 p-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Skill Improvement Expectations</h1>
                    <p class="text-muted-foreground mt-2">
                        Set and track skill improvement goals for your career growth
                    </p>
                </div>
                <Button>
                    <Plus class="mr-2 h-4 w-4" />
                    Add Skill Goal
                </Button>
            </div>

            <Card class="shadow-sm">
                <CardHeader>
                    <CardTitle>My Skill Goals</CardTitle>
                    <CardDescription>Track your progress on skill improvements</CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="flex flex-col items-center justify-center py-8 text-center">
                        <Target class="h-12 w-12 text-muted-foreground mb-4" />
                        <p class="text-sm text-muted-foreground">
                            No skill goals set yet. Add your first skill improvement goal to get started.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>

