"use client";

import Link from "next/link";
import {
    ChevronRight,
    FolderIcon,
    HistoryIcon,
    BookIcon,
    ThumbsUpIcon
} from "lucide-react";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "./ui/sidebar";
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from "./ui/collapsible";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";

const items = [
    {
        title: "History",
        url: "/history",
        icon: HistoryIcon,
        auth: true,
    },
    {
        title: "Liked",
        url: "/liked",
        icon: ThumbsUpIcon,
        auth: true,
    },
]

export const PersonalSection = () => {
    const user = useCurrentUser();
    const router = useRouter();
    return (
        <SidebarGroup>
            <SidebarGroupLabel>You</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                tooltip={item.title}
                                asChild
                                isActive={false}
                                onClick={(e) => {
                                    if (!user && item.auth) {
                                        e.preventDefault();
                                        router.push('/auth/login');
                                    }
                                }}
                            >
                                <Link href={item.url} className="flex items-center gap-4">
                                    <item.icon />
                                    <span className="text-sm">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    <Collapsible defaultOpen className="group/collapsible">
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton className="flex items-center gap-4" tooltip="Docs">
                                    <FolderIcon />
                                    <span>Documents</span>
                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuButton asChild>
                                            <Link href="/">
                                                <span>All</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuButton asChild>
                                                <Link href="/">
                                                    <span>study</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuButton asChild>
                                                <Link href="/">
                                                    <span>Algorithm</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuButton asChild>
                                                <Link href="/">
                                                    <span>Research Paper</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}