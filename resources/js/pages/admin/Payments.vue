<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { payments } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { CreditCard, DollarSign, TrendingUp } from 'lucide-vue-next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Payment Management',
        href: payments().url,
    },
];
</script>

<template>
    <Head title="Payment Management" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 p-6">
            <div>
                <h1 class="text-3xl font-bold tracking-tight">Payment Management</h1>
                <p class="text-muted-foreground mt-2">
                    Manage payments, subscriptions, and billing across the platform
                </p>
            </div>

            <div class="grid gap-4 md:grid-cols-3">
                <Card class="shadow-sm">
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">$0</div>
                        <p class="text-xs text-muted-foreground">All time revenue</p>
                    </CardContent>
                </Card>

                <Card class="shadow-sm">
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Active Subscriptions</CardTitle>
                        <CreditCard class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">0</div>
                        <p class="text-xs text-muted-foreground">Current subscriptions</p>
                    </CardContent>
                </Card>

                <Card class="shadow-sm">
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Monthly Revenue</CardTitle>
                        <TrendingUp class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">$0</div>
                        <p class="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                </Card>
            </div>

            <Card class="shadow-sm">
                <CardHeader>
                    <CardTitle>Payment Transactions</CardTitle>
                    <CardDescription>View and manage all payment transactions</CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="flex flex-col items-center justify-center py-8 text-center">
                        <CreditCard class="h-12 w-12 text-muted-foreground mb-4" />
                        <p class="text-sm text-muted-foreground">
                            Payment transactions and billing history will be displayed here
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>

