"use client";

import Link from "next/link";
import {
    ChevronRight,
    FolderIcon,
    HistoryIcon,
    Plus,
    Heart,
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
import { useCurrentDocuments } from "@/hooks/use-current-document";
import { createDocument, deleteDocument, updateDocumentName } from "@/data/document";
import { useEffect, useState } from "react";
import { Document } from "@prisma/client";
import { EditSideVarDocument } from "./edit-sidevar-document";

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
        icon: Heart,
        auth: true,
    },
]

export const PersonalSection = () => {
    const user = useCurrentUser();
    const router = useRouter();
    const docs = useCurrentDocuments();
    const [documents, setDocuments] = useState<Document[]>();
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        setDocuments(docs);
    }, [])

    const handleAdd = async () => {
        const newDoc = await createDocument("Untitled");
        setDocuments(prev => [...prev || [], newDoc]);
    }
    const handleRename = async (id: string, newName: string) => {
        const updateed = await updateDocumentName(id, newName);
        setDocuments(prev => prev?.map(doc => (doc.id === id ? { ...doc, name: updateed.name } : doc)))
    }

    const handleDelete = async (id: string) => {
        await deleteDocument(id);
        setDocuments(prev => prev?.filter(doc => doc.id !== id));
    }

    const visibleDocuments = showAll ? documents : documents?.slice(0, 5);
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
                                    {visibleDocuments?.map(doc => (
                                        <EditSideVarDocument
                                            key={doc.id}
                                            id={doc.id}
                                            name={doc.name}
                                            onRename={handleRename}
                                            onDelete={handleDelete}
                                        />
                                    ))}
                                    {documents && documents.length > 5 && (
                                        <SidebarMenuButton
                                            onClick={() => setShowAll(prev => !prev)}
                                            className="flex items-center gap-4 text-sm text-muted-foreground hover:text-primary"
                                            tooltip="Toggle Documents"
                                        >
                                            <span>{showAll ? "Show Less" : "Show More"}</span>
                                            <ChevronRight className={`ml-auto transition-transform duration-200 ${showAll ? "-rotate-90" : "rotate-90"}`} />
                                        </SidebarMenuButton>
                                    )}
                                    <SidebarMenuSubItem>
                                        <button
                                            onClick={handleAdd}
                                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Add Document
                                        </button>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup >
    )
}