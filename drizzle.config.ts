import { defineConfig } from "drizzle-kit";

if (
  !process.env.POSTGRES_USER ||
  !process.env.POSTGRES_PASSWORD ||
  !process.env.POSTGRES_DB ||
  !process.env.POSTGRES_DOMAIN ||
  !process.env.POSTGRES_PORT
) {
  throw new Error(
    "POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_DOMAIN, and/or POSTGRES_PORT not set",
  );
}

export default defineConfig({
  schema: "./src/lib/server/db/schema.ts",

  dbCredentials: {
    url: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_DOMAIN}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
  },

  verbose: true,
  strict: true,
  dialect: "postgresql",
});
