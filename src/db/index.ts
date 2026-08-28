import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// The Neon HTTP endpoint occasionally drops a request ("fetch failed"),
// especially on cold starts. Retry transient network failures a few times.
const RETRIES = 3;
neonConfig.fetchFunction = async (url: string, init: RequestInit) => {
  let lastErr: unknown;
  for (let attempt = 0; attempt < RETRIES; attempt++) {
    try {
      return await fetch(url, init);
    } catch (err) {
      lastErr = err;
      // brief backoff before retrying
      await new Promise((r) => setTimeout(r, 200 * (attempt + 1)));
    }
  }
  throw lastErr;
};

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, { schema });
export * from "./schema";
