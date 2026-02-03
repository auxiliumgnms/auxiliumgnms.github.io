import { db } from "./db";
import {
  speakers,
  teamMembers,
  type InsertSpeaker,
  type Speaker,
  type InsertTeamMember,
  type TeamMember
} from "@shared/schema";

export interface IStorage {
  getSpeakers(): Promise<Speaker[]>;
  createSpeaker(speaker: InsertSpeaker): Promise<Speaker>;
  getTeamMembers(): Promise<TeamMember[]>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
}

export class DatabaseStorage implements IStorage {
  async getSpeakers(): Promise<Speaker[]> {
    return await db.select().from(speakers).orderBy(speakers.displayOrder);
  }

  async createSpeaker(speaker: InsertSpeaker): Promise<Speaker> {
    const [newSpeaker] = await db.insert(speakers).values(speaker).returning();
    return newSpeaker;
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return await db.select().from(teamMembers).orderBy(teamMembers.displayOrder);
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const [newMember] = await db.insert(teamMembers).values(member).returning();
    return newMember;
  }
}

export const storage = new DatabaseStorage();
