import { getDocument } from "@/data/document";
import { notFound } from "next/navigation";
import { newContent } from "@/actions/new-content";
import { Button } from "@/components/ui/button";
import EditDocument from "@/components/edit-document";

interface DocumentPageProps {
  params: Promise<{ id: string }>
}

export default async function DocumentPage({ params }: DocumentPageProps) {
  const id = (await params).id;
  const document = await getDocument(id);

  if (!document) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-2">{document.name}</h1>
        <p className="text-gray-600 text-sm">Document ID: {document.id}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Created at: {document.createdAt.toLocaleString()}
        </p>

        {document.content?.map((ctx) => (
          <div
            key={ctx.id}
            className="mt-6 rounded-xl border bg-white dark:bg-zinc-900 shadow-sm p-4"
          >
            <EditDocument contextId={ctx.id} content={ctx.content} />
          </div>
        ))}

        <form action={newContent} className="mt-6">
          <input type="hidden" name="documentId" value={id} />
          <Button type="submit" variant="outline">
            + New Content Add
          </Button>
        </form>
      </div>
    </div>
  );
}
