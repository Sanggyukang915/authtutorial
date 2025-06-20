"use client"

import { getDocument, getLiked } from "@/data/document";
import { notFound, useParams } from "next/navigation";
import { newContent } from "@/actions/new-content";
import { Button } from "@/components/ui/button";
import EditDocument from "@/components/edit-document";
import { TogglePublic } from "@/components/toggle-public";;
import { Togglelikes } from "@/components/toggle-likes";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useMobile } from "@/hooks/use-mobile";
import { incr } from "@/actions/incr";
import { toast } from "sonner";
import { views } from "@/data/view";

interface Document {
  id: string;
  name: string;
  createdAt: Date;
  userId: string;
  isPublic: boolean;
  content: {
    id: string;
    createdAt: Date;
    content: string;
    documentId: string;
  }[];
}
interface Viewers {
  mobileViewers: number;
  desktopViewers: number;
}

export default function DocumentPage() {
  const id = useParams().id as string
  const [document, setDocument] = useState<Document | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isCurrentUserDoc, setIsCurrentUserDoc] = useState(false);
  const [viewers, setViewers] = useState<Viewers>({ mobileViewers: 0, desktopViewers: 0 });

  const currentUser = useCurrentUser();
  const isMobile = useMobile();

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const doc = await getDocument(id);

        if (!doc) {
          notFound()
        }

        setDocument(doc);

        const liked = await getLiked(doc.id, currentUser?.id);
        setIsLiked(liked);

        setIsCurrentUserDoc(doc.userId === currentUser?.id);

        const result = await incr("home", isMobile);
        if (result.error) toast.error(result.error);
        if (result.message) toast.success(result.message);

        const viewCount = await views("home");
        setViewers(viewCount);
      } catch (err) {
        toast.error(`Something went wrong!:${err}`)
      }
    };

    fetchData();
  }, [id, currentUser?.id, isMobile]);

  if (!document) return <div>Loading...</div>;

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div>{viewers?.desktopViewers}</div>
        <div>{viewers?.mobileViewers}</div>
        <div className="flex justify-between text-3xl font-semibold mb-2">
          <p>{document.name}</p>
          {isCurrentUserDoc ? (
            <TogglePublic documentId={document.id} isPublic={document.isPublic} />
          ) : (
            <Togglelikes documentId={document.id} userId={currentUser?.id} isLiked={isLiked} />
          )}
        </div>
        <p className="text-gray-600 text-sm">Document ID: {document.id}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Created at: {document.createdAt.toLocaleString()}
        </p>

        {document.content?.map((ctx) => (
          <div
            key={ctx.id}
            className="mt-6 rounded-xl border bg-white dark:bg-zinc-900 shadow-sm p-4"
          >
            <EditDocument contextId={ctx.id} content={ctx.content} isCurrentUserDoc={isCurrentUserDoc} />
          </div>
        ))}
        {isCurrentUserDoc && (
          <form action={newContent} className="mt-6">
            <input type="hidden" name="documentId" value={id} />
            <Button type="submit" variant="outline">
              + New Content Add
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
