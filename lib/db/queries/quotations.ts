import { prisma } from '@/lib/db/client';

export async function getAllQuotations() {
  return prisma.quotationRequest.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function getQuotationById(id: string) {
  return prisma.quotationRequest.findUnique({ where: { id } });
}

export async function updateQuotationStatus(id: string, status: string) {
  return prisma.quotationRequest.update({ where: { id }, data: { status } });
}

export async function createQuotation(data: {
  name: string;
  email?: string;
  phone: string;
  services: string[];
  location?: string;
  areaSqft?: string;
  budgetRange?: string;
  message?: string;
}) {
  return prisma.quotationRequest.create({ data });
}
