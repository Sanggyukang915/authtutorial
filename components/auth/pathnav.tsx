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

export default function PathNav() {
    const pathname = usePathname()
    const segments = pathname.split('/').filter(Boolean)

    const items = segments.map((seg, i) => ({
        name: decodeURIComponent(seg),
        path: '/' + segments.slice(0, i + 1).join('/'),
    }))
    const nonClickable = ['doc']

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {items.map((item) => (
                    <React.Fragment key={item.path}>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            {nonClickable.includes(item.name) ? (
                                <span className="text-muted-foreground cursor-default">
                                    {item.name}
                                </span>
                            ) : (
                                <BreadcrumbLink href={item.path}>
                                    {item.name}
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}