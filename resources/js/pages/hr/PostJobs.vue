<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { postJobs } from '@/routes';
import postJobsRoutes from '@/routes/post-jobs';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/vue3';
import { Briefcase, Plus, MapPin, DollarSign, Edit, Trash2, Clock } from 'lucide-vue-next';
import { ref } from 'vue';

const props = defineProps<{
    jobs?: Array<{
        id: number;
        title: string;
        description: string;
        location?: string;
        type: string;
        remote: string;
        salary_min?: number;
        salary_max?: number;
        salary_currency?: string;
        status: string;
        company?: {
            name: string;
        };
    }>;
    companies?: Array<{
        id: number;
        name: string;
    }>;
}>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Post Jobs',
        href: postJobs().url,
    },
];

const isDialogOpen = ref(false);
const editingJob = ref<any>(null);

const form = ref({
    company_id: '',
    title: '',
    description: '',
    requirements: '',
    location: '',
    type: 'full_time',
    remote: 'on_site',
    salary_min: '',
    salary_max: '',
    salary_currency: 'USD',
    skills: [] as string[],
    status: 'draft',
    expires_at: '',
});

const skillInput = ref('');

const openDialog = (job?: any) => {
    editingJob.value = job || null;
    if (job) {
        form.value = {
            company_id: job.company_id || '',
            title: job.title || '',
            description: job.description || '',
            requirements: job.requirements || '',
            location: job.location || '',
            type: job.type || 'full_time',
            remote: job.remote || 'on_site',
            salary_min: job.salary_min || '',
            salary_max: job.salary_max || '',
            salary_currency: job.salary_currency || 'USD',
            skills: job.skills || [],
            status: job.status || 'draft',
            expires_at: job.expires_at || '',
        };
    } else {
        form.value = {
            company_id: '',
            title: '',
            description: '',
            requirements: '',
            location: '',
            type: 'full_time',
            remote: 'on_site',
            salary_min: '',
            salary_max: '',
            salary_currency: 'USD',
            skills: [],
            status: 'draft',
            expires_at: '',
        };
    }
    isDialogOpen.value = true;
};

const addSkill = () => {
    if (skillInput.value.trim() && !form.value.skills.includes(skillInput.value.trim())) {
        form.value.skills.push(skillInput.value.trim());
        skillInput.value = '';
    }
};

const removeSkill = (skill: string) => {
    form.value.skills = form.value.skills.filter(s => s !== skill);
};

const submitForm = () => {
    if (editingJob.value) {
        router.put(postJobsRoutes.update(editingJob.value.id).url, form.value, {
            onSuccess: () => {
                isDialogOpen.value = false;
                editingJob.value = null;
            },
        });
    } else {
        router.post(postJobsRoutes.store().url, form.value, {
            onSuccess: () => {
                isDialogOpen.value = false;
                editingJob.value = null;
            },
        });
    }
};

const deleteJob = (id: number) => {
    if (confirm('Are you sure you want to delete this job posting?')) {
        router.delete(postJobsRoutes.destroy(id).url);
    }
};

const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        draft: 'bg-gray-100 text-gray-800',
        active: 'bg-green-100 text-green-800',
        closed: 'bg-red-100 text-red-800',
        expired: 'bg-yellow-100 text-yellow-800',
    };
    return colors[status] || colors.draft;
};
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
                <Dialog :open="isDialogOpen" @update:open="(val) => { isDialogOpen = val; if (!val) editingJob = null; }">
                    <DialogTrigger as-child>
                        <Button @click="openDialog()">
                            <Plus class="mr-2 h-4 w-4" />
                            Post New Job
                        </Button>
                    </DialogTrigger>
                    <DialogContent class="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{{ editingJob ? 'Edit Job Posting' : 'Post New Job' }}</DialogTitle>
                            <DialogDescription>Create a new job posting to attract candidates</DialogDescription>
                        </DialogHeader>
                        <div class="space-y-6">
                            <div class="grid gap-2">
                                <Label for="title">Job Title *</Label>
                                <Input id="title" v-model="form.title" placeholder="e.g., Senior Developer" required />
                            </div>
                            <div class="grid gap-2">
                                <Label for="company_id">Company</Label>
                                <select
                                    id="company_id"
                                    v-model="form.company_id"
                                    class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm h-9"
                                >
                                    <option value="">Select Company</option>
                                    <option v-for="company in companies" :key="company.id" :value="company.id">
                                        {{ company.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="grid gap-2">
                                <Label for="description">Description *</Label>
                                <textarea
                                    id="description"
                                    v-model="form.description"
                                    class="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    placeholder="Job description"
                                    required
                                />
                            </div>
                            <div class="grid gap-2">
                                <Label for="requirements">Requirements</Label>
                                <textarea
                                    id="requirements"
                                    v-model="form.requirements"
                                    class="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    placeholder="Job requirements"
                                />
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="grid gap-2">
                                    <Label for="location">Location</Label>
                                    <Input id="location" v-model="form.location" placeholder="City, Country" />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="remote">Remote Type</Label>
                                    <select
                                        id="remote"
                                        v-model="form.remote"
                                        class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm h-9"
                                    >
                                        <option value="on_site">On Site</option>
                                        <option value="remote">Remote</option>
                                        <option value="hybrid">Hybrid</option>
                                    </select>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="grid gap-2">
                                    <Label for="type">Job Type</Label>
                                    <select
                                        id="type"
                                        v-model="form.type"
                                        class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm h-9"
                                    >
                                        <option value="full_time">Full Time</option>
                                        <option value="part_time">Part Time</option>
                                        <option value="contract">Contract</option>
                                        <option value="freelance">Freelance</option>
                                        <option value="internship">Internship</option>
                                    </select>
                                </div>
                                <div class="grid gap-2">
                                    <Label for="status">Status</Label>
                                    <select
                                        id="status"
                                        v-model="form.status"
                                        class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm h-9"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="active">Active</option>
                                        <option value="closed">Closed</option>
                                        <option value="expired">Expired</option>
                                    </select>
                                </div>
                            </div>
                            <div class="grid grid-cols-3 gap-4">
                                <div class="grid gap-2">
                                    <Label for="salary_min">Min Salary</Label>
                                    <Input id="salary_min" v-model.number="form.salary_min" type="number" min="0" />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="salary_max">Max Salary</Label>
                                    <Input id="salary_max" v-model.number="form.salary_max" type="number" min="0" />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="salary_currency">Currency</Label>
                                    <Input id="salary_currency" v-model="form.salary_currency" maxlength="3" />
                                </div>
                            </div>
                            <div class="grid gap-2">
                                <Label>Required Skills</Label>
                                <div class="flex gap-2">
                                    <Input v-model="skillInput" placeholder="Add skill" @keyup.enter="addSkill" />
                                    <Button type="button" @click="addSkill">Add</Button>
                                </div>
                                <div v-if="form.skills.length > 0" class="flex flex-wrap gap-2 mt-2">
                                    <span
                                        v-for="skill in form.skills"
                                        :key="skill"
                                        class="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                                    >
                                        {{ skill }}
                                        <button type="button" @click="removeSkill(skill)" class="hover:text-destructive">×</button>
                                    </span>
                                </div>
                            </div>
                            <div class="grid gap-2">
                                <Label for="expires_at">Expiry Date</Label>
                                <Input id="expires_at" v-model="form.expires_at" type="date" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" @click="isDialogOpen = false">Cancel</Button>
                            <Button @click="submitForm">{{ editingJob ? 'Update' : 'Create' }}</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div v-if="jobs && jobs.length > 0" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card v-for="job in jobs" :key="job.id" class="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <div class="flex items-start justify-between">
                            <div class="flex-1">
                                <CardTitle class="text-lg">{{ job.title }}</CardTitle>
                                <CardDescription v-if="job.company">{{ job.company.name }}</CardDescription>
                            </div>
                            <div class="flex gap-2">
                                <Button variant="ghost" size="sm" @click="openDialog(job)">
                                    <Edit class="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" @click="deleteJob(job.id)">
                                    <Trash2 class="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent class="space-y-2">
                        <div class="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin class="h-4 w-4" />
                            <span>{{ job.location || 'Not specified' }}</span>
                        </div>
                        <div class="flex items-center gap-2 text-sm text-muted-foreground">
                            <Briefcase class="h-4 w-4" />
                            <span>{{ job.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) }}</span>
                        </div>
                        <div v-if="job.salary_min || job.salary_max" class="flex items-center gap-2 text-sm text-muted-foreground">
                            <DollarSign class="h-4 w-4" />
                            <span>
                                {{ job.salary_min ? `${job.salary_currency} ${job.salary_min}` : '' }}
                                {{ job.salary_min && job.salary_max ? ' - ' : '' }}
                                {{ job.salary_max ? `${job.salary_currency} ${job.salary_max}` : '' }}
                            </span>
                        </div>
                        <div>
                            <span :class="['inline-block px-2 py-1 rounded text-xs', getStatusColor(job.status)]">
                                {{ job.status.replace(/\b\w/g, l => l.toUpperCase()) }}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card class="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle class="text-lg">No jobs posted</CardTitle>
                        <CardDescription>Start posting job vacancies to attract candidates</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" class="w-full" @click="openDialog()">
                            <Plus class="mr-2 h-4 w-4" />
                            Create First Job Posting
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
