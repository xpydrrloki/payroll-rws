import { jwtSecretKey } from '@/config';
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

export const verifyRole = (req: Request, res: Response, next: NextFunction) => {
  const role: Role = res.locals.user.role;

  if (role == 'ADMIN') {
    return res.status(401).send({
      message:
        'User tidak memiliki otorisasi untuk melakukan tindakan ini.',
    });
  }
  next();
};
