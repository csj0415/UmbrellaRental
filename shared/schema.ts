import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const umbrellaRentals = pgTable("umbrella_rentals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  department: text("department").notNull(),
  studentId: text("student_id").notNull(),
  phone: text("phone").notNull(),
  rentalDate: text("rental_date").notNull(),
  returnDate: text("return_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const advertiserApplications = pgTable("advertiser_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyName: text("company_name").notNull(),
  representative: text("representative").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const admins = pgTable("admins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUmbrellaRentalSchema = createInsertSchema(umbrellaRentals).omit({
  id: true,
  createdAt: true,
});

export const insertAdvertiserApplicationSchema = createInsertSchema(advertiserApplications).omit({
  id: true,
  createdAt: true,
});

export const insertAdminSchema = createInsertSchema(admins).omit({
  id: true,
});

export type InsertUmbrellaRental = z.infer<typeof insertUmbrellaRentalSchema>;
export type UmbrellaRental = typeof umbrellaRentals.$inferSelect;

export type InsertAdvertiserApplication = z.infer<typeof insertAdvertiserApplicationSchema>;
export type AdvertiserApplication = typeof advertiserApplications.$inferSelect;

export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type Admin = typeof admins.$inferSelect;
