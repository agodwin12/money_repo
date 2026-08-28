import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { SESSION_COOKIE, verifyToken } from "./lib/session";

const intlMiddleware = createMiddleware(routing);

const ADMIN_RE = /^\/(en|de|es)\/admin(?:\/(.*))?$/;

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /:locale/admin/** (login lives at /:locale/login, so it's not matched here).
  const match = pathname.match(ADMIN_RE);
  if (match) {
    const locale = match[1];
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    const session = await verifyToken(token);
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = `/${locale}/login`;
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
