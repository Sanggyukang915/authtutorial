"use client"
import { useCurrentUser } from "@/hooks/use-current-user";
const logInPage = ()=>{
    const user = useCurrentUser()
    if(!user) {
        window.location.href = "/";
    }

    return(
        <div>login</div>
    )
}
export default logInPage;