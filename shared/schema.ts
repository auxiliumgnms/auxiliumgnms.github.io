import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const speakers = pgTable("speakers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  designation: text("designation"),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  photoUrl: text("photo_url"),
  displayOrder: integer("display_order").notNull(),
});

export const insertSpeakerSchema = createInsertSchema(speakers).omit({ id: true });

export type Speaker = typeof speakers.$inferSelect;
export type InsertSpeaker = z.infer<typeof insertSpeakerSchema>;
