'use server';

import { prisma } from '@/lib/db/client';
import bcrypt from 'bcryptjs';

export async function updateAdminCredentials(formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email) {
      return { success: false, error: 'Email is required' };
    }

    // Prepare update data
    const updateData: any = {
      email,
    };

    // If password is provided, hash it and update it
    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.passwordHash = hashedPassword;
    }

    // Ensure the admin account exists first (in case this is run before first login)
    const adminExists = await prisma.adminAccount.findUnique({
      where: { id: 'admin' },
    });

    if (!adminExists) {
      // Fallback to env password if it doesn't exist and no password was provided
      let finalPasswordHash = updateData.passwordHash;
      if (!finalPasswordHash) {
        finalPasswordHash = process.env.ADMIN_PASSWORD_HASH || '';
      }
      
      await prisma.adminAccount.create({
        data: {
          id: 'admin',
          email,
          passwordHash: finalPasswordHash,
        }
      });
    } else {
      await prisma.adminAccount.update({
        where: { id: 'admin' },
        data: updateData,
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to update admin credentials:', error);
    return { success: false, error: 'Failed to update credentials. Email might already be taken.' };
  }
}
