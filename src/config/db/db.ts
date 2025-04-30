import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// Importamos todas las tablas y relaciones
import * as users from "./tables/users";
import * as user_skin_type from "./tables/user_skin_type";
import * as users_delete from "./tables/users_delete";
import * as skin_type from "./tables/skin_type";

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle({
  client: sql, schema: { // Le pasamos nuestras tablas a drizzle para tener autocompletado
    ...users,
    ...users_delete,
    ...user_skin_type,
    ...skin_type
  }
});
