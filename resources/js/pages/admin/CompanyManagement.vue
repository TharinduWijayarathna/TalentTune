<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { companyManagement } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { Building2, Plus } from 'lucide-vue-next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Company Management',
        href: companyManagement().url,
    },
];
</script>

<template>
    <Head title="Company Management" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 p-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Company Management</h1>
                    <p class="text-muted-foreground mt-2">
                        Manage company profiles and organizations on the platform
                    </p>
                </div>
                <Button>
                    <Plus class="mr-2 h-4 w-4" />
                    Add Company
                </Button>
            </div>

            <Card class="shadow-sm">
                <CardHeader>
                    <CardTitle>Registered Companies</CardTitle>
                    <CardDescription>View and manage all companies</CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="flex flex-col items-center justify-center py-8 text-center">
                        <Building2 class="h-12 w-12 text-muted-foreground mb-4" />
                        <p class="text-sm text-muted-foreground">
                            Company management interface will be displayed here
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>

