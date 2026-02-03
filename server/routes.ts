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
  
  // Always update to latest speaker data with photos
  if (existing.length > 0) {
    await storage.clearSpeakers();
  }
  
  const speakersData = [
    {
      name: "Ahad Yousuf",
      designation: "External Speaker",
      title: "The Blueprint for a Purposeful Path",
      summary: "Ahad reflects on his evolving relationship with choice, direction, and uncertainty in a fast-paced, high-pressure world. Drawing from early career decisions and building an AI business, he traces how clarity gradually emerged through discipline and reflection.",
      photoUrl: "/images/speakers/speaker1.png",
      displayOrder: 1
    },
    {
      name: "Nadi Choueiri",
      designation: "External Speaker",
      title: "The Missing Picture: Reconstructing the Way Forward",
      summary: "When he lost his central vision at a young age, Nadi was forced to find direction differently. He shares how uncertainty can sharpen self-trust and lead us forward even when the path is no longer clear.",
      photoUrl: "/images/speakers/speaker2.png",
      displayOrder: 2
    },
    {
      name: "Drishti Chawla",
      designation: "External Speaker",
      title: "Don't let Failure be an Option",
      summary: "Drishti shares essential lessons learned from building startups and scaling technology, reflecting on the mindset and self-knowledge that shaped her path through startups and IBM.",
      photoUrl: "/images/speakers/speaker3.png",
      displayOrder: 3
    },
    {
      name: "Katriel Fernandes",
      designation: "External Speaker",
      title: "From Fear to Followers: Finding Confidence Through Content Creation",
      summary: "Explores how fear can be transformed into a strength through consistency, storytelling, and intentional creation, showing how embracing vulnerability can lead to meaningful success.",
      photoUrl: "/images/speakers/speaker4.png",
      displayOrder: 4
    },
    {
      name: "Samantha Santosh",
      designation: "Internal Speaker",
      title: "The Unconquerable Whys",
      summary: "Explores how unanswered 'whys' create inner conflict and push us toward purpose. Drawing parallels between an athlete's journey and life.",
      photoUrl: "/images/speakers/speaker5.jpg",
      displayOrder: 5
    },
    {
      name: "Sumeet Ramesh",
      designation: "Internal Speaker",
      title: "Who decides you?",
      summary: "Explores how validation shapes what we like and believe—and why navigating today's new frontier is about trusting your inner compass enough to stay different.",
      photoUrl: "/images/speakers/speaker6.jpg",
      displayOrder: 6
    },
    {
      name: "Salomi Thomas",
      designation: "Internal Speaker",
      title: "A new language for Monday morning",
      summary: "Explores how following your inner fire changes how we experience work, transforming dread into choice.",
      photoUrl: "/images/speakers/speaker7.png",
      displayOrder: 7
    },
    {
      name: "Heili",
      designation: "Internal Speaker",
      title: "The Pause Before the Path",
      summary: "Explores the idea of pausing and looking inwards before navigating a new frontier. The inner compass is not only a guide but also a mirror forcing us to return to our authentic self.",
      photoUrl: "/images/speakers/speaker8.jpg",
      displayOrder: 8
    },
    {
      name: "Maiza",
      designation: "Internal Speaker",
      title: "When the Map Ends, the Compass Begins",
      summary: "Reflects on a 55-day road journey across 21 countries, exploring why travel still matters in a world dominated by technology, and how presence and empathy create bonds no screen can replicate.",
      photoUrl: "/images/speakers/speaker9.png",
      displayOrder: 9
    },
    {
      name: "Soham Janjirkar",
      designation: "Internal Speaker",
      title: "The Eye of the Tempest: Deconstructing the Art of Disruption",
      summary: "Challenges the conventional definition of navigating new experiences, exploring how seemingly insignificant changes can lead to massive outcomes. It is only in the eye of disruption that humanity achieves progress.",
      photoUrl: "/images/speakers/speaker10.png",
      displayOrder: 10
    }
  ];

  for (const s of speakersData) {
    await storage.createSpeaker(s);
  }
  
  console.log("Database seeded with 10 speakers for TEDxNMS");
}
