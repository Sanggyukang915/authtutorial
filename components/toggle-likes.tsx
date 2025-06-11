'use client';

import { useEffect, useState, useTransition } from 'react';
import { Heart, Loader } from 'lucide-react';
import { getLikedCount, toggleLiked } from '@/data/document';
import { Button } from './ui/button';

type Props = {
    documentId: string;
    userId: string | undefined;
    isLiked: boolean;
};

export function Togglelikes({ documentId, userId, isLiked }: Props) {
    const [Liked, setLiked] = useState<boolean>(isLiked)
    const [isPending, startTransition] = useTransition()
    const [likedCounts, setLiekdCounts] = useState<number>(0)

    useEffect(() => {
        const handleCounts = async () => {
            const counts = await getLikedCount(documentId)
            setLiekdCounts(counts)
        }
        handleCounts()
    }, [])

    const toggleLikedButton = () => {
        if (!userId) return;
        startTransition(() => {
            toggleLiked(Liked, documentId, userId);
            if (Liked) {
                setLiekdCounts(likedCounts - 1)
            }
            else {
                setLiekdCounts(likedCounts + 1)
            }
            setLiked(!Liked)
        })
    }

    return (
        <Button variant="ghost" disabled={isPending} onClick={toggleLikedButton}>
            {isPending ? (
                <>
                    <Loader className="animate-spin" />
                    <span>Updating...</span>
                </>
            ) : Liked ? (
                <>
                    <Heart color="red" />
                    <span>{likedCounts}</span>
                </>
            ) : (
                <>
                    <Heart />
                    <span>{likedCounts}</span>
                </>
            )}
        </Button>
    );
}
