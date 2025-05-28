'use client';

import * as React from "react"
import { Slash } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation";

interface PathProps {
    pathName: string;
    path: string;
}

interface RouteProps {
    prevPath: PathProps[] | null;
    curPath: PathProps[];
}

const PATHES_TO_DISPLAY = 3

export default function PathNav() {
    const pathname = usePathname()
    const segments = pathname.split('/').filter(Boolean)

    const items = segments.map((seg, i) => ({
        name: decodeURIComponent(seg),
        path: '/' + segments.slice(0, i + 1).join('/'),
    }))
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {items.map((item, i) => (
                    <React.Fragment key={item.path}>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={item.path}>
                                {item.name}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}