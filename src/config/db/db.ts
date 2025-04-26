import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// Importamos todas las tablas y relaciones
import * as users from "./tables/users";
import * as posts from "./tables/posts";

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle({
  client: sql, schema: { // Le pasamos nuestras tablas a drizzle para tener autocompletado
    ...users,
    ...posts
  }
});
