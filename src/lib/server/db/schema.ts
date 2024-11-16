import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
});

export const userCredentials = pgTable("user_credentials", {
  id: text("id")
    .primaryKey()
    .references(() => user.id),
  passwordHash: text("password_hash").notNull(),
});

export const userGoogle = pgTable("user_google", {
  id: text("id")
    .primaryKey()
    .references(() => user.id),
  googleId: text("google_id").notNull().unique(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type UserCredentials = typeof userCredentials.$inferSelect;
export type UserGoogle = typeof userGoogle.$inferSelect;
