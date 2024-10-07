import prisma from '@/prisma';
import { Potongan, Tunjangan } from '@prisma/client';

interface UpdateAllowanceArgs extends Omit<Potongan, 'id' | 'deletedAt'> {}
export const updateDeductionService = async (
  body: UpdateAllowanceArgs,
  id: number,
) => {
  try {
    const existingData = await prisma.potongan.findFirst({
      where: { id, deletedAt: null },
    });
    if (!existingData) {
      throw new Error('Data tidak ditemukan.');
    }
    await prisma.potongan.update({
      where: { id },
      data: { ...body },
    });
    return { message: 'Data berhasil diubah.' };
  } catch (error) {
    throw error;
  }
};
