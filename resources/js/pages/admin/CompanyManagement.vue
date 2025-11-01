<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { companyManagement } from '@/routes';
import companyManagementRoutes from '@/routes/company-management';
import InputError from '@/components/InputError.vue';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/vue3';
import { Building2, Plus, Edit, Trash2, Globe, CheckCircle2 } from 'lucide-vue-next';
import { ref, computed } from 'vue';

const props = defineProps<{
    companies?: Array<{
        id: number;
        name: string;
        slug: string;
        description?: string;
        website?: string;
        industry?: string;
        size?: string;
        location?: string;
        is_verified: boolean;
    }>;
}>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Company Management',
        href: companyManagement().url,
    },
];

const isDialogOpen = ref(false);
const editingCompany = ref<any>(null);
const page = usePage();
const errors = computed(() => page.props.errors || {});

const form = ref({
    name: '',
    description: '',
    website: '',
    industry: '',
    size: '',
    location: '',
    address: '',
    phone: '',
    email: '',
    is_verified: false,
});

const openDialog = (company?: any) => {
    editingCompany.value = company || null;
    if (company) {
        form.value = {
            name: company.name || '',
            description: company.description || '',
            website: company.website || '',
            industry: company.industry || '',
            size: company.size || '',
            location: company.location || '',
            address: company.address || '',
            phone: company.phone || '',
            email: company.email || '',
            is_verified: company.is_verified || false,
        };
    } else {
        form.value = {
            name: '',
            description: '',
            website: '',
            industry: '',
            size: '',
            location: '',
            address: '',
            phone: '',
            email: '',
            is_verified: false,
        };
    }
    router.reload({ only: ['errors'], preserveState: false });
    isDialogOpen.value = true;
};

const submitForm = () => {
    if (editingCompany.value) {
        router.put(companyManagementRoutes.update(editingCompany.value.id).url, form.value, {
            onSuccess: () => {
                isDialogOpen.value = false;
                editingCompany.value = null;
            },
            onError: () => {
                // Keep dialog open to show errors
            },
        });
    } else {
        router.post(companyManagementRoutes.store().url, form.value, {
            onSuccess: () => {
                isDialogOpen.value = false;
                editingCompany.value = null;
            },
            onError: () => {
                // Keep dialog open to show errors
            },
        });
    }
};

const deleteCompany = (id: number) => {
    if (confirm('Are you sure you want to delete this company?')) {
        router.delete(companyManagementRoutes.destroy(id).url);
    }
};
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
                <Dialog :open="isDialogOpen" @update:open="(val) => { isDialogOpen = val; if (!val) editingCompany = null; }">
                    <DialogTrigger as-child>
                        <Button @click="openDialog()">
                            <Plus class="mr-2 h-4 w-4" />
                            Add Company
                        </Button>
                    </DialogTrigger>
                    <DialogContent class="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{{ editingCompany ? 'Edit Company' : 'Add New Company' }}</DialogTitle>
                            <DialogDescription>Manage company information</DialogDescription>
                        </DialogHeader>
                        <div class="space-y-6">
                            <div class="grid gap-2">
                                <Label for="name">Company Name *</Label>
                                <Input id="name" v-model="form.name" placeholder="Company name" required :class="errors.name ? 'border-destructive' : ''" />
                                <InputError :message="errors.name" />
                            </div>
                            <div class="grid gap-2">
                                <Label for="description">Description</Label>
                                <textarea
                                    id="description"
                                    v-model="form.description"
                                    class="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    :class="errors.description ? 'border-destructive' : ''"
                                    placeholder="Company description"
                                />
                                <InputError :message="errors.description" />
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="grid gap-2">
                                    <Label for="website">Website</Label>
                                    <Input id="website" v-model="form.website" type="url" placeholder="https://..." :class="errors.website ? 'border-destructive' : ''" />
                                    <InputError :message="errors.website" />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="email">Email</Label>
                                    <Input id="email" v-model="form.email" type="email" placeholder="contact@company.com" :class="errors.email ? 'border-destructive' : ''" />
                                    <InputError :message="errors.email" />
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="grid gap-2">
                                    <Label for="industry">Industry</Label>
                                    <Input id="industry" v-model="form.industry" placeholder="e.g., Technology" :class="errors.industry ? 'border-destructive' : ''" />
                                    <InputError :message="errors.industry" />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="size">Company Size</Label>
                                    <Input id="size" v-model="form.size" placeholder="e.g., 51-200" :class="errors.size ? 'border-destructive' : ''" />
                                    <InputError :message="errors.size" />
                                </div>
                            </div>
                            <div class="grid gap-2">
                                <Label for="location">Location</Label>
                                <Input id="location" v-model="form.location" placeholder="City, Country" :class="errors.location ? 'border-destructive' : ''" />
                                <InputError :message="errors.location" />
                            </div>
                            <div class="grid gap-2">
                                <Label for="address">Address</Label>
                                <Input id="address" v-model="form.address" placeholder="Street address" :class="errors.address ? 'border-destructive' : ''" />
                                <InputError :message="errors.address" />
                            </div>
                            <div class="grid gap-2">
                                <Label for="phone">Phone</Label>
                                <Input id="phone" v-model="form.phone" type="tel" placeholder="+1 (555) 123-4567" :class="errors.phone ? 'border-destructive' : ''" />
                                <InputError :message="errors.phone" />
                            </div>
                            <div class="flex items-center gap-2">
                                <input id="is_verified" v-model="form.is_verified" type="checkbox" class="rounded" />
                                <Label for="is_verified">Verified Company</Label>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" @click="isDialogOpen = false">Cancel</Button>
                            <Button @click="submitForm">{{ editingCompany ? 'Update' : 'Create' }}</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card class="shadow-sm">
                <CardHeader>
                    <CardTitle>Registered Companies</CardTitle>
                    <CardDescription>View and manage all companies</CardDescription>
                </CardHeader>
                <CardContent>
                    <div v-if="companies && companies.length > 0" class="space-y-4">
                        <div
                            v-for="company in companies"
                            :key="company.id"
                            class="p-4 border rounded-lg hover:bg-accent transition-colors"
                        >
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-2">
                                        <Building2 class="h-5 w-5 text-primary" />
                                        <h3 class="font-semibold text-lg">{{ company.name }}</h3>
                                        <CheckCircle2 v-if="company.is_verified" class="h-4 w-4 text-green-500" />
                                    </div>
                                    <p v-if="company.description" class="text-sm text-muted-foreground mb-2">
                                        {{ company.description }}
                                    </p>
                                    <div class="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                        <span v-if="company.industry">{{ company.industry }}</span>
                                        <span v-if="company.size">{{ company.size }} employees</span>
                                        <span v-if="company.location" class="flex items-center gap-1">
                                            <Globe class="h-4 w-4" />
                                            {{ company.location }}
                                        </span>
                                        <a
                                            v-if="company.website"
                                            :href="company.website"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="text-primary hover:underline flex items-center gap-1"
                                        >
                                            <Globe class="h-4 w-4" />
                                            Website
                                        </a>
                                    </div>
                                </div>
                                <div class="flex gap-2 ml-4">
                                    <Button variant="ghost" size="sm" @click="openDialog(company)">
                                        <Edit class="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" @click="deleteCompany(company.id)">
                                        <Trash2 class="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="flex flex-col items-center justify-center py-8 text-center">
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
