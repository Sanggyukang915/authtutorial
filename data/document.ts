"use server";

import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth";

export const createDocument = async (name: string) => {
  const user = await currentUser();
  if (!user?.id) throw new Error("Unauthorized");

  const document = await db.document.create({
    data: {
      name,
      userId: user.id,
    },
  });
  return document;
}

export const updateDocumentName = async (id: string, name: string) => {
  return await db.document.update({
    where: { id },
    data: { name },
  });
};
export const updateDocumentAuth = async (id: string, isPublic: boolean) => {
  return await db.document.update({
    where: { id },
    data: { isPublic },
  })
}

export const deleteDocument = async (id: string) => {
  return await db.document.delete({
    where: { id },
  });
};

export const getDocument = async (id: string) => {
  const document = await db.document.findUnique({
    where: { id },
    include: {
      content: {
        orderBy: {
          createdAt: 'asc',
        },
      },
    }
  });
  return document;
}

export const createDocumentContent = async (id: string) => {
  return await db.document.update({
    where: { id },
    data: {
      content: {
        create: [
          { content: "" },
        ]
      }
    }
  })
}
export const updateDocumentContent = async (contextId: string, content: string) => {
  return await db.context.update({
    where: { id: contextId },
    data: { content }
  });
}

export const deleteDocumentContent = async (contextId: string) => {
  return await db.context.delete({
    where: { id: contextId }
  })
}

export const publicDocuments = async () => {
  return await db.document.findMany({
    where: {
      isPublic: true,
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
      user: {
        select: {
          name: true,
        },
      },
      content: {
        take: 1, // 가장 첫 번째 내용만 가져옴
        select: {
          content: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export const publicDocumentsNameId = async () => {
  return await db.document.findMany({
    where: {
      isPublic: true,
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function publicDocumentsPaginated(page: number, pageSize: number) {
  return await db.document.findMany({
    where: { isPublic: true },
    select: {
      id: true,
      name: true,
      createdAt: true,
      user: {
        select: { name: true },
      },
      content: {
        take: 1,
        select: { content: true },
      },
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: "desc" },
  })
}


export async function publicDocumentsCount(pageSize: number) {
  const count = await db.document.count({
    where: { isPublic: true },
  })
  const totalPages = Math.ceil(count / pageSize)

  return totalPages
}

export async function getLiked(documentId: string, userId: string | undefined) {
  if (!userId) {
    return false;
  }
  const liked = await db.document.findFirst({
    where: {
      id: documentId,
      likes: {
        some: {
          id: userId,
        },
      },
    },
    select: { id: true },
  });
  return Boolean(liked);
}

export async function getLikedCount(documentId: string) {
  const document = await db.document.findUnique({
    where: { id: documentId, },
    select: {
      _count: {
        select: { likes: true },
      },
    },
  });
  return document?._count.likes ?? 0;
}

export async function toggleLiked(isLiked: boolean, documentId: string, userId: string) {
  if (isLiked) {
    await db.document.update({
      where: { id: documentId },
      data: {
        likes: {
          disconnect: { id: userId },
        },
      },
    });
  }
  else {
    await db.document.update({
      where: { id: documentId },
      data: {
        likes: {
          connect: { id: userId },
        },
      },
    });

  }
}