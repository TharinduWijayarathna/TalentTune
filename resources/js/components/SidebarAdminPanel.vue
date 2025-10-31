<script setup lang="ts">
import { HelpCircle, ArrowRight } from 'lucide-vue-next';
</script>

<template>
    <a
        href="#"
        @click.prevent
        class="group relative block overflow-hidden rounded-lg border border-sidebar-border/70 bg-gradient-to-br from-sidebar-accent/50 to-transparent p-3.5 transition-all duration-300 hover:scale-[1.01] hover:border-sidebar-border hover:bg-sidebar-accent hover:shadow-md"
    >
        <div class="relative flex items-center justify-between gap-3">
            <div class="flex items-center gap-2.5">
                <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-muted/50 transition-transform group-hover:scale-105">
                    <HelpCircle class="h-4 w-4 text-muted-foreground" />
                </div>
                <div class="flex flex-col">
                    <span class="text-xs font-semibold leading-tight">Help & Support</span>
                    <span class="text-[10px] text-muted-foreground leading-tight">
                        Get assistance
                    </span>
                </div>
            </div>
            <ArrowRight class="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </div>
    </a>
</template>

