'use server';

import { prisma } from '@/lib/db/client';
import { revalidatePath, revalidateTag } from 'next/cache';
import { invalidateProjectsCache } from '@/lib/db/queries/projects';

export async function createProject(data: any) {
  try {
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    await prisma.project.create({
      data: {
        ...data,
        slug,
      },
    });

    await invalidateProjectsCache();
    revalidateTag('projects');
    revalidatePath('/admin/portfolio');
    revalidatePath('/portfolio');
    return { success: true };
  } catch (error) {
    console.error('Error creating project:', error);
    return { success: false, error: 'Failed to create project' };
  }
}

export async function updateProject(id: string, data: any) {
  try {
    const project = await prisma.project.update({
      where: { id },
      data,
    });

    await invalidateProjectsCache(project.slug);
    revalidateTag('projects');
    revalidatePath('/admin/portfolio');
    revalidatePath('/portfolio');
    revalidatePath(`/portfolio/${project.slug}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating project:', error);
    return { success: false, error: 'Failed to update project' };
  }
}

export async function deleteProject(id: string) {
  try {
    const project = await prisma.project.delete({ where: { id } });
    await invalidateProjectsCache(project.slug);
    revalidateTag('projects');
    revalidatePath('/admin/portfolio');
    revalidatePath('/portfolio');
    return { success: true };
  } catch (error) {
    console.error('Error deleting project:', error);
    return { success: false, error: 'Failed to delete project' };
  }
}
