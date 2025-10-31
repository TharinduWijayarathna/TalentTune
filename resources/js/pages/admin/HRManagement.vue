<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { hrManagement } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { Users, UserCog } from 'lucide-vue-next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'HR Professionals Management',
        href: hrManagement().url,
    },
];
</script>

<template>
    <Head title="HR Professionals Management" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 p-6">
            <div>
                <h1 class="text-3xl font-bold tracking-tight">HR Professionals Management</h1>
                <p class="text-muted-foreground mt-2">
                    Manage HR professionals and their accounts on the platform
                </p>
            </div>

            <Card class="shadow-sm">
                <CardHeader>
                    <CardTitle>HR Professionals</CardTitle>
                    <CardDescription>View and manage HR professional accounts</CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="flex flex-col items-center justify-center py-8 text-center">
                        <UserCog class="h-12 w-12 text-muted-foreground mb-4" />
                        <p class="text-sm text-muted-foreground">
                            HR professional management interface will be displayed here
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>

