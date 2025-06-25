"use server";

import { createDocumentContent } from "@/data/document";

export const newContent = async (formData: FormData) => {
    const documentId = formData.get("documentId") as string;
    await createDocumentContent(documentId);
}