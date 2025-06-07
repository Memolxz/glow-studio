import { users } from "@prisma/client";

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
      user?: Pick<users, 'id' | 'email'>
    }
  }
}