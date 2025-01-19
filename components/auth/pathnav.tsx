'use client';

import * as React from "react"
import Link from "next/link"
import { ChevronDown, Key, Slash } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface PathProps {
    pathName: string;
    path: string;
}

interface RouteProps {
    prevPath: PathProps[] | null;
    curPath: PathProps[];
}

const PATHES_TO_DISPLAY = 3

export default function PathNav({ prevPath, curPath }: RouteProps) {
    const [open, setOpen] = React.useState(false)
    if (prevPath !== null) {
        return (
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'>home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    {prevPath.length > PATHES_TO_DISPLAY ? (
                        <>
                            <BreadcrumbItem>
                                <DropdownMenu open={open} onOpenChange={setOpen}>
                                    <DropdownMenuTrigger
                                        className="flex items-center gap-1"
                                        aria-label="Toggle menu"
                                    >
                                        <BreadcrumbEllipsis className="h-4 w-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        {prevPath.slice(0, -2).map((item, index) => (
                                            <DropdownMenuItem key={index}>
                                                <Link href={`${item.path}`}>
                                                    {item.pathName}
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                        </>
                    ) : null}
                    {prevPath.slice(-PATHES_TO_DISPLAY + 1).map((item, index) => (
                        <ol key={index} className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    asChild
                                    className="max-w-20 truncate md:max-w-none"
                                >
                                    <Link href={`${item.path}`}>{item.pathName}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                        </ol>
                    ))}
                    {curPath.map((items, index) => (
                        <ol key={index} className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
                            <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
                                {`${items.pathName}`}
                            </BreadcrumbPage>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                        </ol>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        )
    }
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/'>home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                    <Slash />
                </BreadcrumbSeparator>
                {curPath.map((items, index) => (
                    <ol key={index} className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
                        <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
                            {`${items.pathName}`}
                        </BreadcrumbPage>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                    </ol>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}