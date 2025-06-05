"use server";

import { createDocumentContent } from "@/data/document";
import { revalidatePath } from "next/cache";

export const newContent = async (formData: FormData)=>{
    const documentId = formData.get("documentId") as string;
    await createDocumentContent(documentId);
    revalidatePath(`/${documentId}`)
}