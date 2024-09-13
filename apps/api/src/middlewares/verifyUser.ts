import { jwtSecretKey } from '@/config';
import prisma from '@/prisma';
import { Role, User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError, verify } from 'jsonwebtoken';

const secretKey = jwtSecretKey;

interface PayloadToken extends Pick<User, 'id' | 'role'> {}

declare global {
  namespace Express {
    interface Request {
      user?: PayloadToken | null;
    }
  }
}

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id: number = res.locals.user.id;
  try {
    const user = await prisma.user.findFirst({ where: { id } });

    if (!user) {
      throw new Error(
        'User tidak memiliki otorisasi untuk melakukan tindakan ini.',
      );
    }
  } catch (error) {
    throw error;
  }

  next();
};
