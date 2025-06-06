"use client";

import { useState, useTransition } from "react";
import { JSONContent } from "@tiptap/react";
import { deleteDocumentContent, updateDocumentContent } from "@/data/document";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { SimpleEditor } from "./tiptap-templates/simple/simple-editor";

interface Propts {
    contextId: string;
    content: string;
    isCurrentUserDoc: boolean;
}

export default function EditDocument({ contextId, content, isCurrentUserDoc }: Propts) {
    const [value, setValue] = useState<string>(content);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false)

    const handleChange = () => {
        startTransition(() => {
            updateDocumentContent(contextId, value)
        })
    }
    const handleDelete = () => {
        startTransition(() => {
            deleteDocumentContent(contextId);
        });
        router.refresh()
    };
    return (
        <>
            {isCurrentUserDoc && (
                isEditing ? (
                    <div className="flex gap-2 mb-3">
                        <Button variant="outline" onClick={() => {
                            handleChange();
                            setIsEditing(false)
                        }}>
                            Confirm
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
                        <Button variant="outline" onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                )
            )}
            {isEditing ? (
                <SimpleEditor contextId={contextId} content={value} onChange={setValue} />
            ) : (
                <div dangerouslySetInnerHTML={{ __html: value ?? "" }} />
            )}
        </>
    )
}