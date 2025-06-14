import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userRole = pgEnum("role", ["ADMIN", "BASIC"]);
export const timestamps = {
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
};
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text("user_name").notNull(),
  email: text("user_email").notNull().unique(),
  picture: text("user_picture"),
  role: userRole("user_role").default("BASIC"),
  lastLogin: timestamp("user_last_login"),
  ...timestamps,
});
