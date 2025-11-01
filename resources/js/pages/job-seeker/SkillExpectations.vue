<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { skillExpectations } from '@/routes';
import skillExpectationsRoutes from '@/routes/skill-expectations';
import InputError from '@/components/InputError.vue';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/vue3';
import { Plus, Target, TrendingUp, Edit, Trash2, Calendar } from 'lucide-vue-next';
import { ref, computed } from 'vue';

const props = defineProps<{
    skills?: Array<{
        id: number;
        skill_name: string;
        description?: string;
        current_level: number;
        target_level: number;
        target_date?: string;
        status: string;
    }>;
}>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Skill Expectations',
        href: skillExpectations().url,
    },
];

const isDialogOpen = ref(false);
const editingSkill = ref<any>(null);
const page = usePage();
const errors = computed(() => page.props.errors || {});

const form = ref({
    skill_name: '',
    description: '',
    current_level: 0,
    target_level: 0,
    target_date: '',
    status: 'not_started',
});

const openDialog = (skill?: any) => {
    editingSkill.value = skill || null;
    if (skill) {
        form.value = {
            skill_name: skill.skill_name || '',
            description: skill.description || '',
            current_level: skill.current_level || 0,
            target_level: skill.target_level || 0,
            target_date: skill.target_date || '',
            status: skill.status || 'not_started',
        };
    } else {
        form.value = {
            skill_name: '',
            description: '',
            current_level: 0,
            target_level: 0,
            target_date: '',
            status: 'not_started',
        };
    }
    router.reload({ only: ['errors'], preserveState: false });
    isDialogOpen.value = true;
};

const submitForm = () => {
    if (editingSkill.value) {
        router.put(skillExpectationsRoutes.update(editingSkill.value.id).url, form.value, {
            onSuccess: () => {
                isDialogOpen.value = false;
                editingSkill.value = null;
            },
            onError: () => {
                // Keep dialog open to show errors
            },
        });
    } else {
        router.post(skillExpectationsRoutes.store().url, form.value, {
            onSuccess: () => {
                isDialogOpen.value = false;
                editingSkill.value = null;
            },
            onError: () => {
                // Keep dialog open to show errors
            },
        });
    }
};

const deleteSkill = (id: number) => {
    if (confirm('Are you sure you want to delete this skill goal?')) {
        router.delete(skillExpectationsRoutes.destroy(id).url);
    }
};

const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        not_started: 'bg-gray-100 text-gray-800',
        in_progress: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
        on_hold: 'bg-yellow-100 text-yellow-800',
    };
    return colors[status] || colors.not_started;
};

const getProgress = (current: number, target: number) => {
    if (target === 0) return 0;
    return Math.min((current / target) * 100, 100);
};
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
                <Dialog :open="isDialogOpen" @update:open="(val) => { isDialogOpen = val; if (!val) editingSkill = null; }">
                    <DialogTrigger as-child>
                        <Button @click="openDialog()">
                            <Plus class="mr-2 h-4 w-4" />
                            Add Skill Goal
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{{ editingSkill ? 'Edit Skill Goal' : 'Add Skill Goal' }}</DialogTitle>
                            <DialogDescription>Set a goal for skill improvement</DialogDescription>
                        </DialogHeader>
                        <div class="space-y-6">
                            <div class="grid gap-2">
                                <Label for="skill_name">Skill Name</Label>
                                <Input id="skill_name" v-model="form.skill_name" placeholder="e.g., JavaScript, Python" required :class="errors.skill_name ? 'border-destructive' : ''" />
                                <InputError :message="errors.skill_name" />
                            </div>
                            <div class="grid gap-2">
                                <Label for="description">Description</Label>
                                <textarea
                                    id="description"
                                    v-model="form.description"
                                    class="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    :class="errors.description ? 'border-destructive' : ''"
                                    placeholder="Describe what you want to achieve"
                                />
                                <InputError :message="errors.description" />
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="grid gap-2">
                                    <Label for="current_level">Current Level (0-100)</Label>
                                    <Input id="current_level" v-model.number="form.current_level" type="number" min="0" max="100" :class="errors.current_level ? 'border-destructive' : ''" />
                                    <InputError :message="errors.current_level" />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="target_level">Target Level (0-100)</Label>
                                    <Input id="target_level" v-model.number="form.target_level" type="number" min="0" max="100" :class="errors.target_level ? 'border-destructive' : ''" />
                                    <InputError :message="errors.target_level" />
                                </div>
                            </div>
                            <div class="grid gap-2">
                                <Label for="target_date">Target Date</Label>
                                <Input id="target_date" v-model="form.target_date" type="date" :class="errors.target_date ? 'border-destructive' : ''" />
                                <InputError :message="errors.target_date" />
                            </div>
                            <div class="grid gap-2">
                                <Label for="status">Status</Label>
                                <select
                                    id="status"
                                    v-model="form.status"
                                    class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm h-9"
                                    :class="errors.status ? 'border-destructive' : ''"
                                >
                                    <option value="not_started">Not Started</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="on_hold">On Hold</option>
                                </select>
                                <InputError :message="errors.status" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" @click="isDialogOpen = false">Cancel</Button>
                            <Button @click="submitForm">{{ editingSkill ? 'Update' : 'Create' }}</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card class="shadow-sm">
                <CardHeader>
                    <CardTitle>My Skill Goals</CardTitle>
                    <CardDescription>Track your progress on skill improvements</CardDescription>
                </CardHeader>
                <CardContent>
                    <div v-if="skills && skills.length > 0" class="space-y-4">
                        <div
                            v-for="skill in skills"
                            :key="skill.id"
                            class="p-4 border rounded-lg space-y-3"
                        >
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-2">
                                        <Target class="h-5 w-5 text-primary" />
                                        <h3 class="font-semibold text-lg">{{ skill.skill_name }}</h3>
                                        <span :class="['px-2 py-1 rounded text-xs', getStatusColor(skill.status)]">
                                            {{ skill.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
                                        </span>
                                    </div>
                                    <p v-if="skill.description" class="text-sm text-muted-foreground mb-2">
                                        {{ skill.description }}
                                    </p>
                                    <div class="flex items-center gap-4 mb-2">
                                        <span class="text-sm">
                                            Current: <strong>{{ skill.current_level }}</strong>/100
                                        </span>
                                        <span class="text-sm">
                                            Target: <strong>{{ skill.target_level }}</strong>/100
                                        </span>
                                        <span v-if="skill.target_date" class="text-sm text-muted-foreground flex items-center gap-1">
                                            <Calendar class="h-4 w-4" />
                                            {{ skill.target_date }}
                                        </span>
                                    </div>
                                    <div class="space-y-1">
                                        <div class="flex justify-between text-xs text-muted-foreground">
                                            <span>Progress</span>
                                            <span>{{ Math.round(getProgress(skill.current_level, skill.target_level)) }}%</span>
                                        </div>
                                        <div class="w-full bg-secondary rounded-full h-2">
                                            <div
                                                class="bg-primary h-2 rounded-full transition-all"
                                                :style="{ width: `${getProgress(skill.current_level, skill.target_level)}%` }"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="flex gap-2 ml-4">
                                    <Button variant="ghost" size="sm" @click="openDialog(skill)">
                                        <Edit class="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" @click="deleteSkill(skill.id)">
                                        <Trash2 class="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="flex flex-col items-center justify-center py-8 text-center">
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
