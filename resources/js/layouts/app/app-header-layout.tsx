import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';

export default function AppHeaderLayout({
    children,
    breadcrumbs,
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
        <AppShell>
            <AppHeader
                breadcrumbs={breadcrumbs}
                onNewThread={onNewThread}
                onToggleLibrary={onToggleLibrary}
                showChatControls={showChatControls}
            />
            <AppContent>{children}</AppContent>
        </AppShell>
    );
}
