<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { portfolio } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { Plus, FolderKanban, ExternalLink } from 'lucide-vue-next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Portfolio',
        href: portfolio().url,
    },
];
</script>

<template>
    <Head title="Portfolio" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 p-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Project Portfolio</h1>
                    <p class="text-muted-foreground mt-2">
                        Showcase your projects and build a compelling portfolio
                    </p>
                </div>
                <Button>
                    <Plus class="mr-2 h-4 w-4" />
                    Add Project
                </Button>
            </div>

            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card class="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle>No projects yet</CardTitle>
                        <CardDescription>
                            Start building your portfolio by adding your first project
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" class="w-full">
                            <Plus class="mr-2 h-4 w-4" />
                            Create First Project
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>

