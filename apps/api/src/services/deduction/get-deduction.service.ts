import prisma from '@/prisma';

export const getDeductionService = async (id: number) => {
  try {
    const deduction = await prisma.potongan.findFirst({
      where: { id, deletedAt: null },
    });
    if (!deduction) {
      throw new Error('Data tidak ditemukan.');
    }

    return deduction;
  } catch (error) {
    throw error;
  }
};
