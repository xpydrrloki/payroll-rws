import prisma from '@/prisma';

interface CreateDeductionServiceArgs {
  name: string;
  amount: number;
  description: string;
}

export const createDeductionService = async (
  payload: CreateDeductionServiceArgs,
) => {
  try {
    const { amount, name, description } = payload;
    await prisma.potongan.create({
      data: { name, amount, description },
    });

    return { message: 'Data potongan berhasil ditambahkan' };
  } catch (error) {
    throw error;
  }
};
