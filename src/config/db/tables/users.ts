import { relations } from "drizzle-orm";
import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";

import { userSkinTypeTable } from "./user_skin_type";

export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  isAdmin: boolean('isAdmin').default(false).notNull()
})

// Indicamos las relaciones de nuestra tabla users con otras tablas, en este caso:
// one user -> many posts
export const usersTableRelations = relations(usersTable, ({ many }) => ({
  userSkinType: many(userSkinTypeTable)
}));

export type User = typeof usersTable.$inferSelect;
export type UserInsert = typeof usersTable.$inferInsert;