<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { subscriptions } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { CreditCard, CheckCircle2, Crown } from 'lucide-vue-next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Subscriptions',
        href: subscriptions().url,
    },
];
</script>

<template>
    <Head title="Subscriptions" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 p-6">
            <div>
                <h1 class="text-3xl font-bold tracking-tight">Manage Subscriptions</h1>
                <p class="text-muted-foreground mt-2">
                    View and manage your subscription plans and billing
                </p>
            </div>

            <div class="grid gap-6 md:grid-cols-3">
                <Card class="shadow-sm">
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">
                            <Crown class="h-5 w-5 text-yellow-500" />
                            Basic Plan
                        </CardTitle>
                        <CardDescription>Current plan</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold mb-2">$0</div>
                        <p class="text-sm text-muted-foreground mb-4">per month</p>
                        <Button variant="outline" class="w-full">Upgrade</Button>
                    </CardContent>
                </Card>

                <Card class="shadow-sm border-primary">
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">
                            <Crown class="h-5 w-5 text-primary" />
                            Professional Plan
                        </CardTitle>
                        <CardDescription>Popular choice</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold mb-2">$49</div>
                        <p class="text-sm text-muted-foreground mb-4">per month</p>
                        <Button class="w-full">Subscribe</Button>
                    </CardContent>
                </Card>

                <Card class="shadow-sm">
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">
                            <Crown class="h-5 w-5 text-purple-500" />
                            Enterprise Plan
                        </CardTitle>
                        <CardDescription>For large teams</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold mb-2">$99</div>
                        <p class="text-sm text-muted-foreground mb-4">per month</p>
                        <Button variant="outline" class="w-full">Contact Sales</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>

