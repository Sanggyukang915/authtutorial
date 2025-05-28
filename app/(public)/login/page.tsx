"use client"
import { useCurrentUser } from "@/hooks/use-current-user";
const LogInPage = ()=>{
    const user = useCurrentUser()
    if(!user) {
        window.location.href = "/";
    }

    return(
        <div>login</div>
    )
}
export default LogInPage;