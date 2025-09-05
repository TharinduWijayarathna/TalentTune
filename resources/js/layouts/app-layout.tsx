import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    onNewThread?: () => void;
    onToggleLibrary?: () => void;
    showChatControls?: boolean;
}

export default ({ children, breadcrumbs, onNewThread, onToggleLibrary, showChatControls, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate
        breadcrumbs={breadcrumbs}
        onNewThread={onNewThread}
        onToggleLibrary={onToggleLibrary}
        showChatControls={showChatControls}
        {...props}
    >
        {children}
    </AppLayoutTemplate>
);
