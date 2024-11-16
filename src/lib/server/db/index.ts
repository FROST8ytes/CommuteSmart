import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "$env/dynamic/private";

if (
  !env.POSTGRES_USER ||
  !env.POSTGRES_PASSWORD ||
  !env.POSTGRES_DB ||
  !env.POSTGRES_DOMAIN ||
  !env.POSTGRES_PORT
) {
  throw new Error(
    "POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_DOMAIN, and/or POSTGRES_PORT not set",
  );
}
const client = postgres(
  `postgresql://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_DOMAIN}:${env.POSTGRES_PORT}/${env.POSTGRES_DB}`,
);
export const db = drizzle(client);
