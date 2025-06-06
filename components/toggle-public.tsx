'use client';

import { useState, useTransition } from 'react';
import { Eye, EyeOff, Loader } from 'lucide-react';
import { updateDocumentAuth } from '@/data/document';
import { Button } from './ui/button';

type Props = {
    documentId: string;
    isPublic: boolean;
};

export function TogglePublic({ documentId, isPublic }: Props) {
    const [docPublic, setDocPublic] = useState<boolean>(isPublic)
    const [isPending, startTransition] = useTransition();

    return (
        <Button variant="outline" disabled={isPending} onClick={() => {
            startTransition(() => {
                updateDocumentAuth(documentId, !docPublic)
                setDocPublic(!docPublic)
            })
        }}>
            {isPending ? (
                <>
                    <Loader className="animate-spin" />
                    <span>Updating...</span>
                </>
            ) : docPublic ? (
                <>
                    <Eye />
                    <span>Public</span>
                </>
            ) : (
                <>
                    <EyeOff />
                    <span>Private</span>
                </>
            )}
        </Button>
    );
}
