import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";
import { Users } from '@prisma/client'
import { db } from '../db/db';

declare global {
  namespace Express {
    interface Request {
      user?: Users;
      refreshTokenAttempted?: boolean;
    }
  }
}

export const jwtAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: "No hay token!", code: "NO_TOKEN" })
    return;
  }

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET!) as Users;

    if (!decodedUser.id || !decodedUser.email) {
      throw new Error("Token inválido!")
    }

    req.user = decodedUser;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError' && !req.refreshTokenAttempted) {
      return res.status(401).json({ 
        error: "Token expirado", 
        code: "TOKEN_EXPIRED",
        refreshNeeded: true 
      });
    }

    res.status(403).json({ error: (error as Error).message })
  }
}

export const isAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: "No hay token!" })
    return;
  }

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET!) as Users;

    if (!decodedUser.id || !decodedUser.email) {
      throw new Error("Token invalido!")
    }

    req.user = decodedUser;

    const user = await db.users.findUnique({
      where: { id: decodedUser.id }
    });

    if (!user || !user.isAdmin) {
      res.status(403).json({ error: "Acceso denegado: No eres administrador." });
      return;
    }
    next();
  } catch (error) {
    res.status(403).json({ error: (error as Error).message })
  }
}