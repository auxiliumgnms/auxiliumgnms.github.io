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
    const speakersData = [
      {
        name: "Ahad Yousuf",
        designation: "External Speaker",
        title: "The Blueprint for a Purposeful Path",
        summary: "Ahad reflects on his evolving relationship with choice, direction, and uncertainty in a fast-paced, high-pressure world. Drawing from early career decisions and building an AI business, he traces how clarity gradually emerged through discipline and reflection.",
        displayOrder: 1
      },
      {
        name: "Nadi Choueiri",
        designation: "External Speaker",
        title: "The Missing Picture: Reconstructing the Way Forward",
        summary: "When he lost his central vision at a young age, Nadi was forced to find direction differently. He shares how uncertainty can sharpen self-trust and lead us forward even when the path is no longer clear.",
        displayOrder: 2
      },
      {
        name: "Drishti Chawla",
        designation: "External Speaker",
        title: "Don’t let Failure be an Option",
        summary: "Drishti shares essential lessons learned from building startups and scaling technology, reflecting on the mindset and self-knowledge that shaped her path through startups and IBM.",
        displayOrder: 3
      },
      {
        name: "Katriel Fernandes",
        designation: "External Speaker",
        title: "From Fear to Followers: Finding Confidence Through Content Creation",
        summary: "Explores how fear can be transformed into a strength through consistency, storytelling, and intentional creation, showing how embracing vulnerability can lead to meaningful success.",
        displayOrder: 4
      },
      {
        name: "Samantha Santosh",
        designation: "Internal Speaker",
        title: "The Unconquerable Whys",
        summary: "Explores how unanswered 'whys' create inner conflict and push us toward purpose. Drawing parallels between an athlete's journey and life.",
        displayOrder: 5
      },
      {
        name: "Sumeet Ramesh",
        designation: "Internal Speaker",
        title: "Who decides you?",
        summary: "Explores how validation shapes what we like and believe—and why navigating today’s new frontier is about trusting your inner compass enough to stay different.",
        displayOrder: 6
      },
      {
        name: "Salomi Thomas",
        designation: "Internal Speaker",
        title: "A new language for Monday morning",
        summary: "Explores how following your inner fire changes how we experience work, transforming dread into choice.",
        displayOrder: 7
      }
    ];

    for (const s of speakersData) {
      await storage.createSpeaker(s);
    }
    
    console.log("Database seeded with speakers for TEDxNMS");
  }
}
