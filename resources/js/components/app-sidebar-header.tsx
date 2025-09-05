import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Plus, FolderOpen } from 'lucide-react';

interface AppSidebarHeaderProps {
    breadcrumbs?: BreadcrumbItemType[];
    onNewThread?: () => void;
    onToggleLibrary?: () => void;
    showChatControls?: boolean;
}

export function AppSidebarHeader({
    breadcrumbs = [],
    onNewThread,
    onToggleLibrary,
    showChatControls = false
}: AppSidebarHeaderProps) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2 flex-1">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            {/* Chat Controls */}
            {showChatControls && (
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onNewThread}
                        className="flex items-center gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        New Thread
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onToggleLibrary}
                        className="flex items-center gap-2"
                    >
                        <FolderOpen className="h-4 w-4" />
                        Library
                    </Button>
                </div>
            )}
        </header>
    );
}
