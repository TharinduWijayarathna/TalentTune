import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
    onNewThread,
    onToggleLibrary,
    showChatControls = false
}: PropsWithChildren<{
    breadcrumbs?: BreadcrumbItem[];
    onNewThread?: () => void;
    onToggleLibrary?: () => void;
    showChatControls?: boolean;
}>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader
                    breadcrumbs={breadcrumbs}
                    onNewThread={onNewThread}
                    onToggleLibrary={onToggleLibrary}
                    showChatControls={showChatControls}
                />
                {children}
            </AppContent>
        </AppShell>
    );
}
