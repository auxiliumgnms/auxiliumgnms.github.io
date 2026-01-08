import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.speakers.list.path, async (req, res) => {
    const speakers = await storage.getSpeakers();
    res.json(speakers);
  });

  // Seed data on startup
  await seedDatabase();

  return httpServer;
}

export async function seedDatabase() {
  const existing = await storage.getSpeakers();
  if (existing.length === 0) {
    const dummySpeakers = [
      { name: "Alex Chen", topic: "The Future of AI in Classrooms", bio: "Grade 12 Student, CS Enthusiast", displayOrder: 1 },
      { name: "Sarah Johnson", topic: "Sustainable Living on Campus", bio: "Environmental Science Teacher", displayOrder: 2 },
      { name: "Michael Wong", topic: "Music as a Universal Language", bio: "Concert Pianist & Alumnus", displayOrder: 3 },
      { name: "Priya Patel", topic: "Breaking Cultural Barriers", bio: "Grade 11 Student", displayOrder: 4 },
      { name: "David Kim", topic: "The Mathematics of Beauty", bio: "Math Department Head", displayOrder: 5 },
      { name: "Emma Wilson", topic: "Mental Health in the Digital Age", bio: "School Counselor", displayOrder: 6 },
    ];
    
    for (const s of dummySpeakers) {
      await storage.createSpeaker(s);
    }
    console.log("Database seeded with speakers");
  }
}
