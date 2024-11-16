import { Google } from "arctic";
import { env } from "$env/dynamic/private";

if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
  throw new Error("GOOGLE_CLIENT_ID and/or GOOGLE_CLIENT_SECRET not set");
}

export const github = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  "https://localhost:5173/login/google/callback",
);
