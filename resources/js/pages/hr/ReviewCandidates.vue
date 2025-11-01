<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { reviewCandidates } from '@/routes';
import reviewCandidatesRoutes from '@/routes/review-candidates';
import InputError from '@/components/InputError.vue';
import { Label } from '@/components/ui/label';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/vue3';
import { Users, UserCheck, Mail, Calendar, FileText, CheckCircle2, XCircle, Clock } from 'lucide-vue-next';
import { ref, computed } from 'vue';

const props = defineProps<{
    applications?: Array<{
        id: number;
        status: string;
        cover_letter?: string;
        applied_at: string;
        user: {
            id: number;
            name: string;
            email: string;
        };
        job: {
            id: number;
            title: string;
        };
    }>;
}>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Review Candidates',
        href: reviewCandidates().url,
    },
];

const selectedApplication = ref<any>(null);
const isDialogOpen = ref(false);
const page = usePage();
const errors = computed(() => page.props.errors || {});
const form = ref({
    status: '',
    notes: '',
});

const openDialog = (application: any) => {
    selectedApplication.value = application;
    form.value = {
        status: application.status,
        notes: application.notes || '',
    };
    router.reload({ only: ['errors'], preserveState: false });
    isDialogOpen.value = true;
};

const updateApplication = () => {
    router.put(
        reviewCandidatesRoutes.update(selectedApplication.value.id).url,
        form.value,
        {
            onSuccess: () => {
                isDialogOpen.value = false;
                selectedApplication.value = null;
            },
            onError: () => {
                // Keep dialog open to show errors
            },
        }
    );
};

const getStatusIcon = (status: string) => {
    const icons: Record<string, any> = {
        pending: Clock,
        reviewing: Clock,
        shortlisted: UserCheck,
        interviewed: UserCheck,
        accepted: CheckCircle2,
        rejected: XCircle,
    };
    return icons[status] || Clock;
};

const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        pending: 'bg-yellow-100 text-yellow-800',
        reviewing: 'bg-blue-100 text-blue-800',
        shortlisted: 'bg-purple-100 text-purple-800',
        interviewed: 'bg-indigo-100 text-indigo-800',
        accepted: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
    };
    return colors[status] || colors.pending;
};
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
                    <div v-if="applications && applications.length > 0" class="space-y-4">
                        <div
                            v-for="application in applications"
                            :key="application.id"
                            class="p-4 border rounded-lg hover:bg-accent transition-colors"
                        >
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-2">
                                        <UserCheck class="h-5 w-5 text-primary" />
                                        <h3 class="font-semibold text-lg">{{ application.user.name }}</h3>
                                        <component
                                            :is="getStatusIcon(application.status)"
                                            :class="['h-4 w-4', getStatusColor(application.status).replace('bg-', 'text-')]"
                                        />
                                    </div>
                                    <div class="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                        <span class="flex items-center gap-1">
                                            <Mail class="h-4 w-4" />
                                            {{ application.user.email }}
                                        </span>
                                        <span class="flex items-center gap-1">
                                            <Calendar class="h-4 w-4" />
                                            Applied {{ new Date(application.applied_at).toLocaleDateString() }}
                                        </span>
                                    </div>
                                    <div class="mb-2">
                                        <p class="text-sm font-medium">Applied for: {{ application.job.title }}</p>
                                    </div>
                                    <p v-if="application.cover_letter" class="text-sm text-muted-foreground mb-2 line-clamp-2">
                                        {{ application.cover_letter }}
                                    </p>
                                    <span :class="['inline-block px-2 py-1 rounded text-xs', getStatusColor(application.status)]">
                                        {{ application.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
                                    </span>
                                </div>
                                <Button @click="openDialog(application)">Review</Button>
                            </div>
                        </div>
                    </div>
                    <div v-else class="flex flex-col items-center justify-center py-8 text-center">
                        <Users class="h-12 w-12 text-muted-foreground mb-4" />
                        <p class="text-sm text-muted-foreground">
                            No candidates to review yet. Candidates will appear here once they apply to your job postings.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Dialog :open="isDialogOpen" @update:open="(val) => { isDialogOpen = val; if (!val) selectedApplication = null; }">
                <DialogContent class="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Review Application</DialogTitle>
                        <DialogDescription>
                            Review and update the status of {{ selectedApplication?.user?.name }}'s application
                        </DialogDescription>
                    </DialogHeader>
                    <div v-if="selectedApplication" class="space-y-6">
                        <div>
                            <h3 class="font-semibold mb-2">Candidate Information</h3>
                            <div class="space-y-1 text-sm">
                                <p><strong>Name:</strong> {{ selectedApplication.user.name }}</p>
                                <p><strong>Email:</strong> {{ selectedApplication.user.email }}</p>
                                <p><strong>Job:</strong> {{ selectedApplication.job.title }}</p>
                                <p><strong>Applied:</strong> {{ new Date(selectedApplication.applied_at).toLocaleDateString() }}</p>
                            </div>
                        </div>
                        <div v-if="selectedApplication.cover_letter">
                            <h3 class="font-semibold mb-2">Cover Letter</h3>
                            <p class="text-sm text-muted-foreground whitespace-pre-wrap">{{ selectedApplication.cover_letter }}</p>
                        </div>
                        <div class="grid gap-2">
                            <Label for="status">Status</Label>
                            <select
                                id="status"
                                v-model="form.status"
                                class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm h-9"
                                :class="errors.status ? 'border-destructive' : ''"
                            >
                                <option value="pending">Pending</option>
                                <option value="reviewing">Reviewing</option>
                                <option value="shortlisted">Shortlisted</option>
                                <option value="interviewed">Interviewed</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                            </select>
                            <InputError :message="errors.status" />
                        </div>
                        <div class="grid gap-2">
                            <Label for="notes">Notes</Label>
                            <textarea
                                id="notes"
                                v-model="form.notes"
                                class="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                                :class="errors.notes ? 'border-destructive' : ''"
                                placeholder="Add notes about this candidate..."
                            />
                            <InputError :message="errors.notes" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" @click="isDialogOpen = false">Cancel</Button>
                        <Button @click="updateApplication">Update Status</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    </AppLayout>
</template>
