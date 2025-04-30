import { relations } from "drizzle-orm";
import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";

import { usersTable } from "./users";

export const userToDeleteTable = pgTable('userToDelete', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId').references(() => usersTable.id).notNull(),
  addedDate: timestamp().defaultNow()
})

export const usersSkinTypeTableRelations = relations(userToDeleteTable, ({ one }) => ({
  users: one(usersTable, {
      fields: [userToDeleteTable.userId],
      references: [usersTable.id]
    })
}));

export type UserToDelete = typeof userToDeleteTable.$inferSelect;
export type UserToDeleteInsert = typeof userToDeleteTable.$inferInsert;