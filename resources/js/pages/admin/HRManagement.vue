<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { hrManagement } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { Users, UserCog, Mail, Calendar } from 'lucide-vue-next';

const props = defineProps<{
    hrProfessionals?: Array<{
        id: number;
        name: string;
        email: string;
        created_at: string;
    }>;
}>();

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
                    <div v-if="hrProfessionals && hrProfessionals.length > 0" class="space-y-4">
                        <div
                            v-for="hr in hrProfessionals"
                            :key="hr.id"
                            class="p-4 border rounded-lg hover:bg-accent transition-colors"
                        >
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-2">
                                        <UserCog class="h-5 w-5 text-primary" />
                                        <h3 class="font-semibold text-lg">{{ hr.name }}</h3>
                                    </div>
                                    <div class="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span class="flex items-center gap-1">
                                            <Mail class="h-4 w-4" />
                                            {{ hr.email }}
                                        </span>
                                        <span class="flex items-center gap-1">
                                            <Calendar class="h-4 w-4" />
                                            Joined {{ new Date(hr.created_at).toLocaleDateString() }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="flex flex-col items-center justify-center py-8 text-center">
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
