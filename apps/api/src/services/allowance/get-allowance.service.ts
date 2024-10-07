import prisma from '@/prisma';

export const getAllowanceService = async (id: number) => {
  try {
    const allowance = await prisma.tunjangan.findFirst({ where: { id , deletedAt: null} });
    if (!allowance) {
      throw new Error('Data tidak ditemukan.');
    }

    return allowance;
  } catch (error) {
    throw error;
  }
};
