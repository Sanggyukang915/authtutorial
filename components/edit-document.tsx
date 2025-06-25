"use client";

import { useState, useTransition } from "react";
import { deleteDocumentContent, getDocument, updateDocumentContent } from "@/data/document";
import { Button } from "./ui/button";
import { SimpleEditor } from "./tiptap-templates/simple/simple-editor";
import { Document } from "@/app/(protected)/doc/[id]/page";

import "@/components/tiptap-node/code-block-node/code-block-node.scss"
import "@/components/tiptap-node/list-node/list-node.scss"
import "@/components/tiptap-node/image-node/image-node.scss"
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss"

import "@/components/tiptap-templates/simple/simple-editor.scss"

interface Propts {
    contextId: string;
    content: string;
    isCurrentUserDoc: boolean;
    document: Document | null;
    setDocument: React.Dispatch<React.SetStateAction<Document | null>>;
}

export default function EditDocument({ contextId, content, isCurrentUserDoc, document, setDocument }: Propts) {
    const [value, setValue] = useState<string>(content);
    const [isPending, startTransition] = useTransition();
    const [isEditing, setIsEditing] = useState(false)

    const handleChange = () => {
        startTransition(async () => {
            await updateDocumentContent(contextId, value)
            if (document?.id) {
                const doc = await getDocument(document?.id)
                setDocument(doc);
            }
        })
    }
    const handleDelete = () => {
        startTransition(async () => {
            await deleteDocumentContent(contextId)
            if (document?.id) {
                const doc = await getDocument(document?.id)
                setDocument(doc);
            }
        });
    };
    return (
        <>
            {isCurrentUserDoc && (
                isEditing ? (
                    <div className="flex gap-2 mb-3">
                        <Button variant="outline" disabled={isPending} onClick={() => {
                            handleChange();
                            setIsEditing(false)
                        }}>
                            {isPending ? "Saving..." : "Confirm"}
                        </Button>
                        <Button variant="outline" onClick={() => {
                            setValue(content)
                            setIsEditing(false)
                        }}>
                            Cancel
                        </Button>
                    </div>
                ) : (
                    <div className="flex gap-2 mb-3">
                        <Button variant="outline" onClick={() => setIsEditing(true)}>
                            Edit
                        </Button>
                        <Button variant="outline" disabled={isPending} onClick={handleDelete}>
                            {isPending ? "Deleting..." : "Delete"}
                        </Button>
                    </div>
                )
            )}
            {isEditing ? (
                <SimpleEditor content={value} onChange={setValue} />
            ) : (

                <div className="content-wrapper">
                    <div className="tiptap ProseMirror ProseMirror-focused">
                        <div dangerouslySetInnerHTML={{ __html: value }} />
                    </div>
                </div>
            )}
        </>
    )
}