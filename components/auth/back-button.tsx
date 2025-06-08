"use client"

import Link from "next/link"
import { Button } from "../ui/button"

interface BackButtonProps {
    href: string
    label: string
    onClick?: ()=>void
};

export const BackButton = ({
    href,
    label,
    onClick
}: BackButtonProps) => {
    return (
        <Button
            variant="link"
            className="font-normal w-full"
            size="sm"
            onClick={onClick}
            asChild
        >
            <Link href={href} >
                {label}
            </Link>
        </Button>
    )
}