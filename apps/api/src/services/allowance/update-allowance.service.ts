import prisma from '@/prisma';
import { Tunjangan } from '@prisma/client';

interface UpdateAllowanceArgs extends Omit<Tunjangan, 'id' | 'deletedAt'> {}
export const updateAllowanceService = async (
  body: UpdateAllowanceArgs,
  id: number,
) => {
  try {
    const existingData = await prisma.tunjangan.findFirst({
      where: { id, deletedAt: null },
    });
    if (!existingData) {
      throw new Error('Data tidak ditemukan.');
    }
    await prisma.tunjangan.update({
      where: { id },
      data: { ...body },
    });
    return { message: 'Data berhasil diubah.' };
  } catch (error) {
    throw error;
  }
};
