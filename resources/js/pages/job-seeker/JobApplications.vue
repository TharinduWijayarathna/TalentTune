<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { jobApplications } from '@/routes';
import jobApplicationsRoutes from '@/routes/job-applications';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/vue3';
import { FileSearch, Clock, CheckCircle2, XCircle, Trash2, Building2, MapPin, DollarSign } from 'lucide-vue-next';

const props = defineProps<{
    applications?: Array<{
        id: number;
        status: string;
        applied_at: string;
        cover_letter?: string;
        job: {
            id: number;
            title: string;
            location?: string;
            company?: {
                name: string;
            };
        };
    }>;
    stats?: {
        total: number;
        pending: number;
        accepted: number;
        rejected: number;
    };
}>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Job Applications',
        href: jobApplications().url,
    },
];

const deleteApplication = (id: number) => {
    if (confirm('Are you sure you want to withdraw this application?')) {
        router.delete(jobApplicationsRoutes.destroy(id).url);
    }
};

const getStatusIcon = (status: string) => {
    const icons: Record<string, any> = {
        pending: Clock,
        reviewing: Clock,
        shortlisted: CheckCircle2,
        interviewed: CheckCircle2,
        accepted: CheckCircle2,
        rejected: XCircle,
    };
    return icons[status] || Clock;
};

const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        pending: 'text-yellow-600',
        reviewing: 'text-blue-600',
        shortlisted: 'text-purple-600',
        interviewed: 'text-indigo-600',
        accepted: 'text-green-600',
        rejected: 'text-red-600',
    };
    return colors[status] || 'text-gray-600';
};
</script>

<template>
    <Head title="Job Applications" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 p-6">
            <div>
                <h1 class="text-3xl font-bold tracking-tight">Job Applications</h1>
                <p class="text-muted-foreground mt-2">
                    Track your job applications and suggested positions
                </p>
            </div>

            <div class="grid gap-4 md:grid-cols-4">
                <Card class="shadow-sm">
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Total</CardTitle>
                        <FileSearch class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ stats?.total || 0 }}</div>
                        <p class="text-xs text-muted-foreground">Applications sent</p>
                    </CardContent>
                </Card>

                <Card class="shadow-sm">
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Pending</CardTitle>
                        <Clock class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ stats?.pending || 0 }}</div>
                        <p class="text-xs text-muted-foreground">Under review</p>
                    </CardContent>
                </Card>

                <Card class="shadow-sm">
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Accepted</CardTitle>
                        <CheckCircle2 class="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ stats?.accepted || 0 }}</div>
                        <p class="text-xs text-muted-foreground">Successful</p>
                    </CardContent>
                </Card>

                <Card class="shadow-sm">
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Rejected</CardTitle>
                        <XCircle class="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ stats?.rejected || 0 }}</div>
                        <p class="text-xs text-muted-foreground">Not selected</p>
                    </CardContent>
                </Card>
            </div>

            <Card class="shadow-sm">
                <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Your latest job applications</CardDescription>
                </CardHeader>
                <CardContent>
                    <div v-if="applications && applications.length > 0" class="space-y-4">
                        <div
                            v-for="application in applications"
                            :key="application.id"
                            class="p-4 border rounded-lg hover:bg-accent transition-colors"
                        >
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-2">
                                        <h3 class="font-semibold text-lg">{{ application.job.title }}</h3>
                                        <component
                                            :is="getStatusIcon(application.status)"
                                            :class="['h-4 w-4', getStatusColor(application.status)]"
                                        />
                                    </div>
                                    <div class="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                        <span v-if="application.job.company" class="flex items-center gap-1">
                                            <Building2 class="h-4 w-4" />
                                            {{ application.job.company.name }}
                                        </span>
                                        <span v-if="application.job.location" class="flex items-center gap-1">
                                            <MapPin class="h-4 w-4" />
                                            {{ application.job.location }}
                                        </span>
                                    </div>
                                    <p class="text-xs text-muted-foreground mb-2">
                                        Applied on {{ new Date(application.applied_at).toLocaleDateString() }}
                                    </p>
                                    <span :class="['inline-block px-2 py-1 rounded text-xs', getStatusColor(application.status)]">
                                        {{ application.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
                                    </span>
                                </div>
                                <Button variant="ghost" size="sm" @click="deleteApplication(application.id)">
                                    <Trash2 class="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div v-else class="flex flex-col items-center justify-center py-8 text-center">
                        <FileSearch class="h-12 w-12 text-muted-foreground mb-4" />
                        <p class="text-sm text-muted-foreground">
                            No applications yet. Start applying to suggested positions to see them here.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
