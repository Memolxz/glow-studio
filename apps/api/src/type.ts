import { Users } from "@prisma/client";
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
      user?: Pick<Users, 'id' | 'email'>
    }
  }
}

export interface ErrorWithMessage {
  message: string;
}