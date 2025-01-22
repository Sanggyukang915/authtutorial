import { LoginButton } from "@/components/auth/login-button"
import { Button } from "@/components/ui/button"
import { NavUser } from "@/components/nav-user"

interface UserButtonProps {
    user: any
}

export function NavLoginButton({ user }: UserButtonProps) {
    if (user) {
        return (
            <NavUser user={user} />
        )
    }
    return (
        <LoginButton mode="modal" asChild>
            <Button className="truncate"> 
                Sign In
            </Button>
        </LoginButton>
    )
}