"use client"

import { useRouter } from "next/navigation"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { LoginForm } from "@/components/auth/login-form"

interface LoginButtonProps {
    children: React.ReactNode
    mode?: "modal" | "redirect"
    asChild?: boolean
};

export const LoginButton = ({
    children,
    mode = "redirect",
    asChild
}: LoginButtonProps) => {
    const router = useRouter()

    const onClick = () => {
        router.push("/auth/login")
    }

    if (mode === "modal") {
        return (
            <Dialog>
                <DialogTrigger asChild={asChild}>
                    {children}
                </DialogTrigger>
                <DialogDescription hidden>
                    login modal
                </DialogDescription>
                <DialogContent className="p-1 w-auto bg-transparent border-none">
                    <DialogTitle>Login Form</DialogTitle>
                        <LoginForm />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}