"use client"

import { LoginButton } from "@/components/auth/login-button"
import { Button } from "@/components/ui/button"
import { NavUser } from "@/components/nav-user"
import { UserCircleIcon } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";

export function NavLoginButton() {
    const user = useCurrentUser()
    if (user) {
        const userInfo = {
            name: user.name,
            email: user.email,
            image: user.image,
        }
        return (
            <NavUser user={userInfo} />
        )
    }
    return (
        <LoginButton mode="modal" asChild>
            <Button
                variant="outline"
                className="flex w-full min-w-0 gap-1 rounded-full font-medium">
                <UserCircleIcon className="h-8 w-8 rounded-lg" />
                <span className="truncate">Sign In</span>
            </Button>
        </LoginButton>
    )
}