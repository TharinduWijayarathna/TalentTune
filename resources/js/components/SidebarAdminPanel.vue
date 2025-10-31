<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { analytics, payments } from '@/routes';
import { Link } from '@inertiajs/vue3';
import { BarChart3, CreditCard, Shield } from 'lucide-vue-next';

interface Props {
    stats?: {
        totalUsers?: number;
        revenue?: string;
    };
}

const props = withDefaults(defineProps<Props>(), {
    stats: () => ({
        totalUsers: null,
        revenue: null,
    }),
});
</script>

<template>
    <SidebarGroup class="px-2 py-0">
        <SidebarGroupContent>
            <SidebarMenu>
                <SidebarMenuItem>
                    <div class="flex items-center gap-2 px-2 py-1.5">
                        <Shield class="h-4 w-4 text-primary" />
                        <span class="text-xs font-medium">Admin Panel</span>
                    </div>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton as-child size="sm" class="w-full">
                        <Link :href="analytics()" class="flex w-full items-center justify-between">
                            <div class="flex items-center gap-2">
                                <BarChart3 class="h-3.5 w-3.5" />
                                <span class="text-xs">Analytics</span>
                            </div>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton as-child size="sm" class="w-full">
                        <Link :href="payments()" class="flex w-full items-center justify-between">
                            <div class="flex items-center gap-2">
                                <CreditCard class="h-3.5 w-3.5" />
                                <span class="text-xs">Payments</span>
                            </div>
                            <Badge v-if="stats?.revenue" variant="secondary" class="text-xs">
                                {{ stats.revenue }}
                            </Badge>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroupContent>
    </SidebarGroup>
</template>

