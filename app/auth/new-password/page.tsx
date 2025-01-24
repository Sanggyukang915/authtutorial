import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { NewPasswordForm } from "@/components/auth/new-password-form";
import PathNav from "@/components/auth/pathnav";

const NewPasswordPage = () => {
    return (
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <PathNav prevPath={null} curPath={[{ pathName: "auth", path: "/auth" }, { pathName: "new password", path: "/new-password" }]} />
                </div>
            </header>
            <div className="h-full flex items-center justify-center">
                <NewPasswordForm />
            </div>
        </SidebarInset>
    )
}

export default NewPasswordPage;