"use client"
import { useCurrentUser } from "@/hooks/use-current-user";
const LogOutPage = () => {
    const user = useCurrentUser()
    if (user) {
        window.location.reload()
    }


    return (
        <div>logOut</div>
    )
}
export default LogOutPage;