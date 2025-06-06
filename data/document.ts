"use server";

import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth";

export const createDocument = async (name: string) => {
    const user = await currentUser();
    if (!user?.id) throw new Error("Unauthorized");

    const document = await db.document.create({
        data: {
            name,
            userId: user.id,
        },
    });
    return document;
}

export const updateDocumentName = async (id: string, name: string) => {
    return await db.document.update({
        where: { id },
        data: { name },
    });
};
export const updateDocumentAuth = async(id:string, isPublic: boolean)=>{
    return await db.document.update({
        where:{id},
        data: {isPublic},
    })
}

export const deleteDocument = async (id: string) => {
    return await db.document.delete({
        where: { id },
    });
};

export const getDocument = async (id: string) => {
    const document = await db.document.findUnique({
        where: { id },
        include: {
            content: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
        }
    });
    return document;
}

export const createDocumentContent = async (id: string) => {
    return await db.document.update({
        where: { id },
        data: {
            content: {
                create: [
                    { content: "" },
                ]
            }
        }
    })
}
export const updateDocumentContent = async (contextId: string, content: string) => {
    return await db.context.update({
        where: { id: contextId },
        data: { content }
    });
}

export const deleteDocumentContent = async (contextId: string) => {
    return await db.context.delete({
        where: { id: contextId }
    })
}

export const publicDocuments = async () => {
    return db.document.findMany({
        where: {
            isPublic: true,
        },
        include: {
            content: true,
            user: {
                select: {
                    name: true,
                }
            }
        }
    })
}