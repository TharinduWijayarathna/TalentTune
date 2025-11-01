<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { mockInterview } from '@/routes';
import mockInterviewRoutes from '@/routes/mock-interview';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/vue3';
import { Video, Play, Mic, Clock, TrendingUp, CheckCircle2, TrendingDown, MessageSquare, Volume2 } from 'lucide-vue-next';
import { ref } from 'vue';

const props = defineProps<{
    sessions?: Array<{
        id: number;
        type: string;
        difficulty: string;
        status: string;
        score?: number;
        completed_at?: string;
        created_at: string;
    }>;
    stats?: {
        total: number;
        average_score: number;
        total_time: number;
    };
}>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Mock Interview',
        href: mockInterview().url,
    },
];

const selectedMode = ref<string>(''); // 'text' or 'voice'
const selectedType = ref<string>('');
const selectedDifficulty = ref<string>('intermediate');

const selectType = (type: string) => {
    selectedType.value = type;
};

const selectMode = (mode: string) => {
    selectedMode.value = mode;
};

const startInterview = () => {
    if (!selectedMode.value) {
        alert('Please select a mode (Voice or Text)');
        return;
    }
    if (!selectedType.value) {
        alert('Please select an interview type');
        return;
    }

    router.post(mockInterviewRoutes.store().url, {
        mode: selectedMode.value,
        type: selectedType.value,
        difficulty: selectedDifficulty.value,
    });
};

const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
        technical: 'Technical',
        behavioral: 'Behavioral',
        mixed: 'Mixed',
    };
    return labels[type] || type;
};

const getDifficultyLabel = (difficulty: string) => {
    const labels: Record<string, string> = {
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
    };
    return labels[difficulty] || difficulty;
};

const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        pending: 'bg-gray-100 text-gray-800',
        in_progress: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
};

const formatTime = (minutes: number) => {
    if (minutes < 60) {
        return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};
</script>

<template>
    <Head title="Mock Interview" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 p-6">
            <!-- Page Header -->
            <div>
                <h1 class="text-3xl font-bold tracking-tight">Mock Interview</h1>
                <p class="text-muted-foreground mt-2">
                    Practice with AI-powered interviews and get detailed feedback on your performance
                </p>
            </div>

            <!-- Quick Start Card -->
            <Card class="shadow-sm bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                    <CardTitle class="flex items-center gap-2">
                        <Video class="h-5 w-5" />
                        Start New Interview
                    </CardTitle>
                    <CardDescription>
                        Choose your interview mode, type and difficulty level
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="space-y-6">
                        <div>
                            <Label class="mb-3 block">Select Interview Mode</Label>
                            <div class="grid gap-4 md:grid-cols-2 mb-6">
                                <Button
                                    variant="outline"
                                    class="h-auto flex-col py-6"
                                    :class="selectedMode === 'voice' ? 'border-primary bg-primary/5' : ''"
                                    @click="selectMode('voice')"
                                >
                                    <Volume2 class="h-8 w-8 mb-2" :class="selectedMode === 'voice' ? 'text-primary' : ''" />
                                    <span>Voice Mode</span>
                                    <p class="text-xs text-muted-foreground mt-1">Speak your answers</p>
                                    <CheckCircle2 v-if="selectedMode === 'voice'" class="h-4 w-4 mt-1 text-primary" />
                                </Button>
                                <Button
                                    variant="outline"
                                    class="h-auto flex-col py-6"
                                    :class="selectedMode === 'text' ? 'border-primary bg-primary/5' : ''"
                                    @click="selectMode('text')"
                                >
                                    <MessageSquare class="h-8 w-8 mb-2" :class="selectedMode === 'text' ? 'text-primary' : ''" />
                                    <span>Text Mode</span>
                                    <p class="text-xs text-muted-foreground mt-1">Type your answers</p>
                                    <CheckCircle2 v-if="selectedMode === 'text'" class="h-4 w-4 mt-1 text-primary" />
                                </Button>
                            </div>
                        </div>
                        <div>
                            <Label class="mb-3 block">Select Interview Type</Label>
                            <div class="grid gap-4 md:grid-cols-3">
                                <Button
                                    variant="outline"
                                    class="h-auto flex-col py-6"
                                    :class="selectedType === 'technical' ? 'border-primary bg-primary/5' : ''"
                                    @click="selectType('technical')"
                                >
                                    <Mic class="h-8 w-8 mb-2" :class="selectedType === 'technical' ? 'text-primary' : ''" />
                                    <span>Technical</span>
                                    <CheckCircle2 v-if="selectedType === 'technical'" class="h-4 w-4 mt-1 text-primary" />
                                </Button>
                                <Button
                                    variant="outline"
                                    class="h-auto flex-col py-6"
                                    :class="selectedType === 'behavioral' ? 'border-primary bg-primary/5' : ''"
                                    @click="selectType('behavioral')"
                                >
                                    <Mic class="h-8 w-8 mb-2" :class="selectedType === 'behavioral' ? 'text-primary' : ''" />
                                    <span>Behavioral</span>
                                    <CheckCircle2 v-if="selectedType === 'behavioral'" class="h-4 w-4 mt-1 text-primary" />
                                </Button>
                                <Button
                                    variant="outline"
                                    class="h-auto flex-col py-6"
                                    :class="selectedType === 'mixed' ? 'border-primary bg-primary/5' : ''"
                                    @click="selectType('mixed')"
                                >
                                    <Mic class="h-8 w-8 mb-2" :class="selectedType === 'mixed' ? 'text-primary' : ''" />
                                    <span>Mixed</span>
                                    <CheckCircle2 v-if="selectedType === 'mixed'" class="h-4 w-4 mt-1 text-primary" />
                                </Button>
                            </div>
                        </div>
                        <div class="grid gap-2">
                            <Label for="difficulty">Difficulty Level</Label>
                            <select
                                id="difficulty"
                                v-model="selectedDifficulty"
                                class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm h-9"
                            >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>
                        <Button size="lg" class="w-full" :disabled="!selectedMode || !selectedType" @click="startInterview">
                            <Play class="mr-2 h-4 w-4" />
                            Start Interview Session
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <!-- Interview Stats -->
            <div class="grid gap-4 md:grid-cols-3">
                <Card class="shadow-sm">
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Total Interviews</CardTitle>
                        <Video class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ stats?.total || 0 }}</div>
                        <p class="text-xs text-muted-foreground">Practice sessions completed</p>
                    </CardContent>
                </Card>

                <Card class="shadow-sm">
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Average Score</CardTitle>
                        <TrendingUp class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ stats?.average_score ? Math.round(stats.average_score) : '--' }}</div>
                        <p class="text-xs text-muted-foreground">Overall performance rating</p>
                    </CardContent>
                </Card>

                <Card class="shadow-sm">
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Time Practiced</CardTitle>
                        <Clock class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ stats?.total_time ? formatTime(stats.total_time) : '--' }}</div>
                        <p class="text-xs text-muted-foreground">Hours of practice</p>
                    </CardContent>
                </Card>
            </div>

            <!-- Recent Interviews -->
            <div>
                <h2 class="text-xl font-semibold mb-4">Recent Interviews</h2>
                <Card class="shadow-sm">
                    <CardContent class="pt-6">
                        <div v-if="sessions && sessions.length > 0" class="space-y-4">
                            <div
                                v-for="session in sessions"
                                :key="session.id"
                                class="p-4 border rounded-lg hover:bg-accent transition-colors"
                            >
                                <div class="flex items-start justify-between">
                                    <div class="flex-1">
                                        <div class="flex items-center gap-2 mb-2">
                                            <h3 class="font-semibold text-lg">
                                                {{ getTypeLabel(session.type) }} Interview
                                            </h3>
                                            <span class="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                                                {{ getDifficultyLabel(session.difficulty) }}
                                            </span>
                                            <span :class="['px-2 py-1 rounded text-xs font-medium', getStatusColor(session.status)]">
                                                {{ session.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
                                            </span>
                                        </div>
                                        <div class="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                            <span class="flex items-center gap-1">
                                                <Clock class="h-4 w-4" />
                                                {{ new Date(session.created_at).toLocaleDateString() }}
                                            </span>
                                            <span v-if="session.score !== null && session.score !== undefined" class="flex items-center gap-1">
                                                <TrendingUp class="h-4 w-4" />
                                                Score: {{ session.score !== null && session.score !== undefined ? Math.round(session.score) : 0 }}/100
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        v-if="session.status === 'completed'"
                                        variant="outline"
                                        size="sm"
                                        @click="router.visit(mockInterviewRoutes.session(session.id).url)"
                                    >
                                        View Results
                                    </Button>
                                    <Button
                                        v-else-if="session.status === 'in_progress'"
                                        size="sm"
                                        @click="router.visit(mockInterviewRoutes.session(session.id).url)"
                                    >
                                        Continue
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <p v-else class="text-sm text-muted-foreground text-center py-8">
                            No interviews yet. Start your first mock interview to see your results here.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>

