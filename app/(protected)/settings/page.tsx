"use client";
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/user-current-user";

const SettingsPage = () => {
    const user = useCurrentUser();
    const onClick = () => {
        logout();
    }
    return (
        <div className="p-10 rounded-xl">
            <button onClick={onClick} type="submit">Sign out</button>
        </div>
    )
}
export default SettingsPage;