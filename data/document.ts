"use server";

import {db} from "@/lib/db"
import { currentUser } from "@/lib/auth";

export const createDocument = async (name: string)=>{
    const user = await currentUser();
    if(!user?.id) throw new Error("Unauthorized");

    const document = await db.document.create({
        data: {
            name,
            userId: user.id,
        },
    });
    return document;
}

export const updateDocument = async (id: string, name: string)=>{
    return await db.document.update({
        where: {id},
        data: {name},
    });
};

export const deleteDocument = async (id: string)=>{
    return await db.document.delete({
        where: {id},
    });
};

export const getDocument = async (id:string) =>{
    const document = await db.document.findUnique({
        where: {id},
    });
    return document;
}