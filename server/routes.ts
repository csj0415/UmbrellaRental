import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUmbrellaRentalSchema, insertAdvertiserApplicationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/rentals", async (req, res) => {
    try {
      const data = insertUmbrellaRentalSchema.parse(req.body);
      const rental = await storage.createRental(data);
      res.json(rental);
    } catch (error) {
      res.status(400).json({ error: "Invalid rental data" });
    }
  });

  app.get("/api/rentals", async (req, res) => {
    const rentals = await storage.getAllRentals();
    res.json(rentals);
  });

  app.post("/api/advertisers", async (req, res) => {
    try {
      const data = insertAdvertiserApplicationSchema.parse(req.body);
      const advertiser = await storage.createAdvertiser(data);
      res.json(advertiser);
    } catch (error) {
      res.status(400).json({ error: "Invalid advertiser data" });
    }
  });

  app.get("/api/advertisers", async (req, res) => {
    const advertisers = await storage.getAllAdvertisers();
    res.json(advertisers);
  });

  app.post("/api/admin/login", async (req, res) => {
    const { username, password } = req.body;
    const admin = await storage.getAdminByUsername(username);
    
    if (!admin || admin.password !== password) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    
    res.json({ success: true });
  });

  const httpServer = createServer(app);

  return httpServer;
}
