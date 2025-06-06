'use client';

import { useState, useTransition } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { updateDocumentAuth } from '@/data/document';
import { Button } from './ui/button';

type Props = {
    documentId: string;
    isPublic: boolean;
};

export function TogglePublic({ documentId, isPublic }: Props) {
    const [docPublic, setDocPublic] = useState<boolean>(isPublic)
    const [pending, startTransition] = useTransition();

    return (
        <Button variant="outline" onClick={() => {
            startTransition(() => {
                updateDocumentAuth(documentId, !docPublic)
                setDocPublic(!docPublic)
            })
        }}>
            {docPublic ? (
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
