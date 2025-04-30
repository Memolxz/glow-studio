import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { userSkinTypeTable } from "./user_skin_type";

export const skinTypeTable = pgTable('skinType', {
  id: uuid('id').primaryKey().defaultRandom(),
  Name: text('Name').notNull(),
})

export const SkinTypeTableRelations = relations(skinTypeTable, ({ many }) => ({
  skinType: many(userSkinTypeTable)
}));

export type SkinType = typeof skinTypeTable.$inferSelect;
export type SkinTypeInsert = typeof skinTypeTable.$inferInsert;