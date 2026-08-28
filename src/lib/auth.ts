import { cookies } from "next/headers";
import { SESSION_COOKIE, verifyToken, type SessionPayload } from "./session";

/** Read and verify the current admin session from cookies (server components/actions). */
export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return verifyToken(token);
}
