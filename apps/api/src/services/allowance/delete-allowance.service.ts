import prisma from '@/prisma';

export const deleteAllowanceService = async (id: number) => {
  try {
    const existingData = await prisma.tunjangan.findFirst({
      where: { id, deletedAt: null },
    });
    if (!existingData) {
      throw new Error('Data tidak ditemukan.');
    }
    await prisma.tunjangan.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Data berhasil dihapus' };
  } catch (error) {
    throw error;
  }
};
