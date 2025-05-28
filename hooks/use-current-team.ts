import {useSession} from "next-auth/react";

export const useCurrentTeam =()=>{
    const session = useSession();

    return session.data?.user.teams;
}