import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BookOpen,
    Folder,
    LayoutGrid,
    Upload,
    Target,
    Brain,
    Lightbulb,
    FileText,
    History,
    TrendingUp,
    MessageCircle,
    Briefcase,
    GraduationCap,
    Users,
    BarChart3,
    FolderOpen
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Resume Management',
        href: '/resume',
        icon: Upload,
    },
    {
        title: 'My Skill Profile',
        href: '/skills',
        icon: Target,
    },
    {
        title: 'Job Matching',
        href: '/job-matching',
        icon: Briefcase,
    },
    {
        title: 'Learning & Development',
        href: '/learning',
        icon: GraduationCap,
    },
    {
        title: 'Interview Prep',
        href: '/interview',
        icon: Users,
    },
    {
        title: 'Career Analytics',
        href: '/career-analytics',
        icon: BarChart3,
    },
    {
        title: 'Portfolio & Projects',
        href: '/portfolio',
        icon: FolderOpen,
    },
    {
        title: 'Quizzes',
        href: '/quizzes',
        icon: Brain,
    },
    {
        title: 'Suggestions',
        href: '/recommendations',
        icon: Lightbulb,
    },
    {
        title: 'Ask AI',
        href: '/ai-chat',
        icon: MessageCircle,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'GitHub Repository',
        href: 'https://github.com/your-username/skilldrift',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://skilldrift.com/docs',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
