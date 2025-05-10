import { relations } from "drizzle-orm";
import { pgTable, text, serial } from "drizzle-orm/pg-core";

import { userSkinTypeTable } from "./user_skin_type";

export const skinTypeTable = pgTable('skinType', {
  id: serial('id').primaryKey(),
  Name: text('Name').notNull(),
})

export const SkinTypeTableRelations = relations(skinTypeTable, ({ many }) => ({
  skinType: many(userSkinTypeTable)
}));

export type SkinType = typeof skinTypeTable.$inferSelect;
export type SkinTypeInsert = typeof skinTypeTable.$inferInsert;