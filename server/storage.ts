import { db } from "./db";
import {
  speakers,
  type InsertSpeaker,
  type Speaker
} from "@shared/schema";

export interface IStorage {
  getSpeakers(): Promise<Speaker[]>;
  createSpeaker(speaker: InsertSpeaker): Promise<Speaker>;
  clearSpeakers(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getSpeakers(): Promise<Speaker[]> {
    return await db.select().from(speakers).orderBy(speakers.displayOrder);
  }

  async createSpeaker(speaker: InsertSpeaker): Promise<Speaker> {
    const [newSpeaker] = await db.insert(speakers).values(speaker).returning();
    return newSpeaker;
  }

  async clearSpeakers(): Promise<void> {
    await db.delete(speakers);
  }
}

export const storage = new DatabaseStorage();
