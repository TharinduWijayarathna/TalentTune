<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { userManagement } from '@/routes';
import userManagementRoutes from '@/routes/user-management';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/vue3';
import { Users, Search, Filter, Edit, Trash2, Mail, Shield } from 'lucide-vue-next';
import { ref } from 'vue';

const props = defineProps<{
    users?: {
        data?: Array<{
            id: number;
            name: string;
            email: string;
            role: string;
            created_at: string;
        }>;
    };
    filters?: {
        role?: string;
        search?: string;
    };
}>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: userManagement().url,
    },
];

const isDialogOpen = ref(false);
const editingUser = ref<any>(null);
const searchQuery = ref(props.filters?.search || '');
const roleFilter = ref(props.filters?.role || '');

const form = ref({
    name: '',
    email: '',
    role: 'job_seeker',
});

const openDialog = (user?: any) => {
    editingUser.value = user || null;
    if (user) {
        form.value = {
            name: user.name || '',
            email: user.email || '',
            role: user.role || 'job_seeker',
        };
    } else {
        form.value = {
            name: '',
            email: '',
            role: 'job_seeker',
        };
    }
    isDialogOpen.value = true;
};

const submitForm = () => {
    router.put(
        userManagementRoutes.update(editingUser.value.id).url,
        form.value,
        {
            onSuccess: () => {
                isDialogOpen.value = false;
                editingUser.value = null;
            },
        }
    );
};

const deleteUser = (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
        router.delete(userManagementRoutes.destroy(id).url);
    }
};

const applyFilters = () => {
    router.get(userManagement().url, {
        search: searchQuery.value,
        role: roleFilter.value,
    }, {
        preserveState: true,
        preserveScroll: true,
    });
};

const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
        admin: 'bg-red-100 text-red-800',
        hr_professional: 'bg-blue-100 text-blue-800',
        job_seeker: 'bg-green-100 text-green-800',
    };
    return colors[role] || colors.job_seeker;
};
</script>

<template>
    <Head title="User Management" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 p-6">
            <div>
                <h1 class="text-3xl font-bold tracking-tight">User Management</h1>
                <p class="text-muted-foreground mt-2">
                    Manage all platform users, job seekers, and their profiles
                </p>
            </div>

            <Card class="shadow-sm">
                <CardHeader>
                    <CardTitle class="flex items-center gap-2">
                        <Filter class="h-5 w-5" />
                        Filters
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="flex gap-4">
                        <div class="flex-1">
                            <Input
                                v-model="searchQuery"
                                placeholder="Search by name or email..."
                                @keyup.enter="applyFilters"
                            />
                        </div>
                        <div>
                            <select
                                v-model="roleFilter"
                                class="rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                <option value="">All Roles</option>
                                <option value="admin">Admin</option>
                                <option value="hr_professional">HR Professional</option>
                                <option value="job_seeker">Job Seeker</option>
                            </select>
                        </div>
                        <Button @click="applyFilters">
                            <Search class="mr-2 h-4 w-4" />
                            Search
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card class="shadow-sm">
                <CardHeader>
                    <CardTitle>All Users</CardTitle>
                    <CardDescription>View and manage user accounts</CardDescription>
                </CardHeader>
                <CardContent>
                    <div v-if="users?.data && users.data.length > 0" class="space-y-4">
                        <div
                            v-for="user in users.data"
                            :key="user.id"
                            class="p-4 border rounded-lg hover:bg-accent transition-colors"
                        >
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-2">
                                        <Users class="h-5 w-5 text-primary" />
                                        <h3 class="font-semibold text-lg">{{ user.name }}</h3>
                                        <span :class="['px-2 py-1 rounded text-xs', getRoleBadgeColor(user.role)]">
                                            {{ user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
                                        </span>
                                    </div>
                                    <div class="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                        <span class="flex items-center gap-1">
                                            <Mail class="h-4 w-4" />
                                            {{ user.email }}
                                        </span>
                                        <span>Joined {{ new Date(user.created_at).toLocaleDateString() }}</span>
                                    </div>
                                </div>
                                <div class="flex gap-2 ml-4">
                                    <Button variant="ghost" size="sm" @click="openDialog(user)">
                                        <Edit class="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" @click="deleteUser(user.id)">
                                        <Trash2 class="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="flex flex-col items-center justify-center py-8 text-center">
                        <Users class="h-12 w-12 text-muted-foreground mb-4" />
                        <p class="text-sm text-muted-foreground">
                            User management interface will be displayed here
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Dialog :open="isDialogOpen" @update:open="(val) => { isDialogOpen = val; if (!val) editingUser = null; }">
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>Update user information</DialogDescription>
                    </DialogHeader>
                    <div class="space-y-6">
                        <div class="grid gap-2">
                            <Label for="name">Name</Label>
                            <Input id="name" v-model="form.name" required />
                        </div>
                        <div class="grid gap-2">
                            <Label for="email">Email</Label>
                            <Input id="email" v-model="form.email" type="email" required />
                        </div>
                        <div class="grid gap-2">
                            <Label for="role">Role</Label>
                            <select
                                id="role"
                                v-model="form.role"
                                class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm h-9"
                            >
                                <option value="admin">Admin</option>
                                <option value="hr_professional">HR Professional</option>
                                <option value="job_seeker">Job Seeker</option>
                            </select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" @click="isDialogOpen = false">Cancel</Button>
                        <Button @click="submitForm">Update</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    </AppLayout>
</template>
