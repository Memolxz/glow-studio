import { users } from "@prisma/client";
import { Request } from 'express';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      JWT_SECRET: string;
      JWT_REFRESH_SECRET: string;
    }
  }
  namespace Express {
    interface Request {
      user?: Pick<users, 'id' | 'email' | 'isAdmin'>
    }
  }
}

export interface AuthenticatedRequest extends Request {
  user: Pick<users, 'id' | 'email' | 'isAdmin'>;
}

export interface ErrorWithMessage {
  message: string;
}