import {useSession} from "next-auth/react";

export const useCurrentProject =()=>{
    const session = useSession();

    return session.data?.user.projects;
}