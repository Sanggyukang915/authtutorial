import {useSession} from "next-auth/react";

export const useCurrentDocuments =()=>{
    const session = useSession();

    return session.data?.user.documents;
}