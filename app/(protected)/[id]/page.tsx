import { getDocument } from "@/data/document";
import { notFound } from "next/navigation";

interface DocumentPageProps {
  params: { id: string };
}

export default async function DocumentPage({ params }: DocumentPageProps) {
  const { id } = await params;
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
      <p> {document.content}
      </p>

      {/* 나중에 이 자리에 에디터, 콘텐츠 렌더링 등도 가능 */}
    </div>
  );
}
