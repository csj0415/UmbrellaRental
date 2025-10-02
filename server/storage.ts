import { 
  type UmbrellaRental, 
  type InsertUmbrellaRental,
  type AdvertiserApplication,
  type InsertAdvertiserApplication,
  type Admin,
  type InsertAdmin
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createRental(rental: InsertUmbrellaRental): Promise<UmbrellaRental>;
  getAllRentals(): Promise<UmbrellaRental[]>;
  
  createAdvertiser(advertiser: InsertAdvertiserApplication): Promise<AdvertiserApplication>;
  getAllAdvertisers(): Promise<AdvertiserApplication[]>;
  
  getAdminByUsername(username: string): Promise<Admin | undefined>;
}

export class MemStorage implements IStorage {
  private rentals: Map<string, UmbrellaRental>;
  private advertisers: Map<string, AdvertiserApplication>;
  private admins: Map<string, Admin>;

  constructor() {
    this.rentals = new Map();
    this.advertisers = new Map();
    this.admins = new Map();
    
    const adminId = randomUUID();
    const admin: Admin = {
      id: adminId,
      username: "admin",
      password: "123456",
    };
    this.admins.set(adminId, admin);
  }

  async createRental(insertRental: InsertUmbrellaRental): Promise<UmbrellaRental> {
    const id = randomUUID();
    const rental: UmbrellaRental = { 
      ...insertRental, 
      id,
      createdAt: new Date(),
    };
    this.rentals.set(id, rental);
    return rental;
  }

  async getAllRentals(): Promise<UmbrellaRental[]> {
    return Array.from(this.rentals.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createAdvertiser(insertAdvertiser: InsertAdvertiserApplication): Promise<AdvertiserApplication> {
    const id = randomUUID();
    const advertiser: AdvertiserApplication = { 
      ...insertAdvertiser, 
      id,
      createdAt: new Date(),
    };
    this.advertisers.set(id, advertiser);
    return advertiser;
  }

  async getAllAdvertisers(): Promise<AdvertiserApplication[]> {
    return Array.from(this.advertisers.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    return Array.from(this.admins.values()).find(
      (admin) => admin.username === username,
    );
  }
}

export const storage = new MemStorage();
