import { prisma } from '@/lib/db/client';

export async function createContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  return prisma.contactMessage.create({
    data,
  });
}

export async function getAllContactMessages() {
  return prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function updateContactMessageStatus(id: string, status: string) {
  return prisma.contactMessage.update({
    where: { id },
    data: { status },
  });
}

export async function deleteContactMessage(id: string) {
  return prisma.contactMessage.delete({
    where: { id },
  });
}
