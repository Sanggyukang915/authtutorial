import { getDocument } from "@/data/document";
import { notFound } from "next/navigation";

export default async function DocumentPage({
  params,
}: {
  params: { id: string };
}
) {
  const { id } = params;
  const document = await getDocument(id);

  if (!document) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{document.name}</h1>
      <p className="text-gray-600">Document ID: {document.id}</p>
      <p className="mt-4 text-sm text-gray-500">
        Created at: {document.createdAt.toLocaleString()}
      </p>
    </div>
  );
}
