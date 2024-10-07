import prisma from '@/prisma';

export const deleteDeductionService = async (id: number) => {
  try {
    const existingData = await prisma.potongan.findFirst({
      where: { id, deletedAt: null },
    });
    if (!existingData) {
      throw new Error('Data tidak ditemukan.');
    }
    await prisma.potongan.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Data berhasil dihapus' };
  } catch (error) {
    throw error;
  }
};
