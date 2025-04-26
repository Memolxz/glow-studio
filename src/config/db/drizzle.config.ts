import 'dotenv/config';

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/config/db/tables/*",
  out: "./src/config/db/migrations/",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
