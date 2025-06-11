import { getDocument, getLiked } from "@/data/document";
import { notFound } from "next/navigation";
import { newContent } from "@/actions/new-content";
import { Button } from "@/components/ui/button";
import EditDocument from "@/components/edit-document";
import { TogglePublic } from "@/components/toggle-public";
import { currentUser } from "@/lib/auth";
import { Togglelikes } from "@/components/toggle-likes";

interface DocumentPageProps {
  params: Promise<{ id: string }>
}

export default async function DocumentPage({ params }: DocumentPageProps) {
  const id = (await params).id;
  const document = await getDocument(id);
  const curUser = await currentUser();
  
  if (!document) {
    notFound();
  }
  
  const isCurrentUserDoc = (document.userId === curUser?.id)
  const isLiked = await getLiked(document.id, curUser?.id)

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between text-3xl font-semibold mb-2">
          <p>{document.name}</p>
          {isCurrentUserDoc ? (
            <TogglePublic documentId={document.id} isPublic={document.isPublic} />
          ) : (
            <Togglelikes documentId={document.id} userId={curUser?.id} isLiked={isLiked} />
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
