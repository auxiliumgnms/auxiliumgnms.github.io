import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const speakers = pgTable("speakers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  topic: text("topic").notNull(),
  bio: text("bio"),
  photoUrl: text("photo_url"), // Placeholder or URL
  displayOrder: integer("display_order").notNull(),
});

export const insertSpeakerSchema = createInsertSchema(speakers).omit({ id: true });

export type Speaker = typeof speakers.$inferSelect;
export type InsertSpeaker = z.infer<typeof insertSpeakerSchema>;
