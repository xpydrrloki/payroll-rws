import { jwtSecretKey } from '@/config';
import { User } from '@prisma/client';
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

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send({
      message: 'Token is missing. Silakan Login ulang.',
    });
  }
  verify(token, secretKey, (err, payload) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: 'Token expired. Silakan Login ulang.' });
      } else {
        return res.status(401).send({ message: 'Invalid token. Silakan Login ulang.' });
      }
    }
    res.locals.user = payload as PayloadToken;
    next();
  });
};
