import prisma from '@/prisma';

interface CreateAllowanceServiceArgs {
  name: string;
  amount: number;
  description: string;
}

export const createAllowanceService = async (
  payload: CreateAllowanceServiceArgs,
) => {
  try {
    const { amount, name, description } = payload;
    await prisma.tunjangan.create({
      data: { name, amount, description },
    });

    return { message: 'Data Tunjangan berhasil ditambahkan' };
  } catch (error) {
    throw error;
  }
};
