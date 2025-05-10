import { relations } from "drizzle-orm";
import { pgTable, serial } from "drizzle-orm/pg-core";

import { usersTable } from "./users";
import { skinTypeTable } from "./skin_type";

export const userSkinTypeTable = pgTable('userSkinType', {
  id: serial('id').primaryKey(),
  userId: serial('userId').references(() => usersTable.id).notNull(),
  skinTypeId: serial('skinTypeId').notNull()
})

export const usersSkinTypeTableRelations = relations(userSkinTypeTable, ({ one }) => ({
  users: one(usersTable, {
      fields: [userSkinTypeTable.userId],
      references: [usersTable.id]
    }),
  skinType: one(skinTypeTable, {
    fields: [userSkinTypeTable.skinTypeId],
    references: [skinTypeTable.id]
  })
}));

export type UserSkinType = typeof userSkinTypeTable.$inferSelect;
export type UserSkinTypeInsert = typeof userSkinTypeTable.$inferInsert;