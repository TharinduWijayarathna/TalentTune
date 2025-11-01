<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { portfolio } from '@/routes';
import portfolioRoutes from '@/routes/portfolio';
import { type BreadcrumbItem } from '@/types';
import { Head, Form, router } from '@inertiajs/vue3';
import { Plus, ExternalLink, Edit, Trash2, Github, Calendar } from 'lucide-vue-next';
import { ref } from 'vue';

const props = defineProps<{
    projects?: Array<{
        id: number;
        title: string;
        description?: string;
        url?: string;
        repository_url?: string;
        technologies?: string[];
        start_date?: string;
        end_date?: string;
        image?: string;
        is_featured: boolean;
    }>;
}>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Portfolio',
        href: portfolio().url,
    },
];

const isDialogOpen = ref(false);
const editingProject = ref<any>(null);

const form = ref({
    title: '',
    description: '',
    url: '',
    repository_url: '',
    technologies: [] as string[],
    start_date: '',
    end_date: '',
    image: '',
    is_featured: false,
});

const techInput = ref('');

const openDialog = (project?: any) => {
    editingProject.value = project || null;
    if (project) {
        form.value = {
            title: project.title || '',
            description: project.description || '',
            url: project.url || '',
            repository_url: project.repository_url || '',
            technologies: project.technologies || [],
            start_date: project.start_date || '',
            end_date: project.end_date || '',
            image: project.image || '',
            is_featured: project.is_featured || false,
        };
    } else {
        form.value = {
            title: '',
            description: '',
            url: '',
            repository_url: '',
            technologies: [],
            start_date: '',
            end_date: '',
            image: '',
            is_featured: false,
        };
    }
    isDialogOpen.value = true;
};

const addTechnology = () => {
    if (techInput.value.trim() && !form.value.technologies.includes(techInput.value.trim())) {
        form.value.technologies.push(techInput.value.trim());
        techInput.value = '';
    }
};

const removeTechnology = (tech: string) => {
    form.value.technologies = form.value.technologies.filter(t => t !== tech);
};

const submitForm = () => {
    if (editingProject.value) {
        router.put(portfolioRoutes.update(editingProject.value.id).url, form.value, {
            onSuccess: () => {
                isDialogOpen.value = false;
                editingProject.value = null;
            },
        });
    } else {
        router.post(portfolioRoutes.store().url, form.value, {
            onSuccess: () => {
                isDialogOpen.value = false;
                editingProject.value = null;
            },
        });
    }
};

const deleteProject = (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
        router.delete(portfolioRoutes.destroy(id).url, {
            onSuccess: () => {
                // Project deleted
            },
        });
    }
};
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
                <Dialog :open="isDialogOpen" @update:open="(val) => { isDialogOpen = val; if (!val) editingProject = null; }">
                    <DialogTrigger as-child>
                        <Button @click="openDialog()">
                            <Plus class="mr-2 h-4 w-4" />
                            Add Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent class="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{{ editingProject ? 'Edit Project' : 'Add New Project' }}</DialogTitle>
                            <DialogDescription>Add details about your project to showcase your skills</DialogDescription>
                        </DialogHeader>
                        <div class="space-y-6">
                            <div class="grid gap-2">
                                <Label for="title">Title</Label>
                                <Input id="title" v-model="form.title" placeholder="Project title" required />
                            </div>
                            <div class="grid gap-2">
                                <Label for="description">Description</Label>
                                <textarea
                                    id="description"
                                    v-model="form.description"
                                    class="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    placeholder="Project description"
                                />
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="grid gap-2">
                                    <Label for="url">Project URL</Label>
                                    <Input id="url" v-model="form.url" type="url" placeholder="https://..." />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="repository_url">Repository URL</Label>
                                    <Input id="repository_url" v-model="form.repository_url" type="url" placeholder="https://github.com/..." />
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="grid gap-2">
                                    <Label for="start_date">Start Date</Label>
                                    <Input id="start_date" v-model="form.start_date" type="date" />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="end_date">End Date</Label>
                                    <Input id="end_date" v-model="form.end_date" type="date" />
                                </div>
                            </div>
                            <div class="grid gap-2">
                                <Label>Technologies</Label>
                                <div class="flex gap-2">
                                    <Input v-model="techInput" placeholder="Add technology" @keyup.enter="addTechnology" />
                                    <Button type="button" @click="addTechnology">Add</Button>
                                </div>
                                <div v-if="form.technologies.length > 0" class="flex flex-wrap gap-2 mt-2">
                                    <span
                                        v-for="tech in form.technologies"
                                        :key="tech"
                                        class="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                                    >
                                        {{ tech }}
                                        <button type="button" @click="removeTechnology(tech)" class="hover:text-destructive">×</button>
                                    </span>
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                <input id="is_featured" v-model="form.is_featured" type="checkbox" class="rounded" />
                                <Label for="is_featured">Feature this project</Label>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" @click="isDialogOpen = false">Cancel</Button>
                            <Button @click="submitForm">{{ editingProject ? 'Update' : 'Create' }}</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div v-if="projects && projects.length > 0" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card v-for="project in projects" :key="project.id" class="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <div class="flex items-start justify-between">
                            <CardTitle class="text-lg">{{ project.title }}</CardTitle>
                            <div class="flex gap-2">
                                <Button variant="ghost" size="sm" @click="openDialog(project)">
                                    <Edit class="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" @click="deleteProject(project.id)">
                                    <Trash2 class="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        </div>
                        <CardDescription v-if="project.description">{{ project.description }}</CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-3">
                        <div v-if="project.technologies && project.technologies.length > 0" class="flex flex-wrap gap-1">
                            <span
                                v-for="tech in project.technologies"
                                :key="tech"
                                class="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                            >
                                {{ tech }}
                            </span>
                        </div>
                        <div v-if="project.start_date || project.end_date" class="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar class="h-4 w-4" />
                            <span>{{ project.start_date }} - {{ project.end_date || 'Present' }}</span>
                        </div>
                        <div class="flex gap-2">
                            <Button v-if="project.url" variant="outline" size="sm" as-child>
                                <a :href="project.url" target="_blank" rel="noopener noreferrer">
                                    <ExternalLink class="mr-2 h-4 w-4" />
                                    View
                                </a>
                            </Button>
                            <Button v-if="project.repository_url" variant="outline" size="sm" as-child>
                                <a :href="project.repository_url" target="_blank" rel="noopener noreferrer">
                                    <Github class="mr-2 h-4 w-4" />
                                    Code
                                </a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card class="shadow-sm">
                    <CardHeader>
                        <CardTitle>No projects yet</CardTitle>
                        <CardDescription>
                            Start building your portfolio by adding your first project
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" class="w-full" @click="openDialog()">
                            <Plus class="mr-2 h-4 w-4" />
                            Create First Project
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
