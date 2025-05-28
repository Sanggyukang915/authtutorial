"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
            <div className="flex gap-x-2">
                <Button
                    asChild
                    variant={pathname === "/settings" ? "default" : "outline"}
                >
                    <Link href="/settings/">
                        Settings
                    </Link>
                </Button>
                <Button
                    asChild
                    variant={pathname === "/settings/server" ? "default" : "outline"}
                >
                    <Link href="/settings/server">
                        Server
                    </Link>
                </Button>
                <Button
                    asChild
                    variant={pathname === "/settings/client" ? "default" : "outline"}
                >
                    <Link href="/settings/client">
                        Client
                    </Link>
                </Button>
                <Button
                    asChild
                    variant={pathname === "/settings/admin" ? "default" : "outline"}
                >
                    <Link href="/settings/admin">
                        Admin
                    </Link>
                </Button>
            </div>
        </nav>
    )
}
