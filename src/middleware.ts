import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

/**
 * ==============================
 * CONFIG
 * ==============================
 */
const RATE_LIMIT = 200; // 100 request
const WINDOW_MS = 60_000; // 1 daqiqa

const validRoles = [
  'startup',
  'partner',
  'investor',
  'vc',
  'accelerator',
  'mentor',
  'comunity_member',
];

// ❗ Edge-compatible simple in-memory store
const ipStore = new Map<string, { count: number; start: number }>();

/**
 * next-intl middleware
 */
const intlMiddleware = createMiddleware(routing);

export function middleware(req: NextRequest | any) {
  const { pathname } = req.nextUrl;

  /**
   * ==============================
   * RATE LIMIT (DoS protection)
   * ==============================
   */
  const ip =
    req.ip ??
    req.headers.get('x-forwarded-for')?.split(',')[0] ??
    'anonymous';

  const now = Date.now();
  const record = ipStore.get(ip);

  if (!record) {
    ipStore.set(ip, { count: 1, start: now });
  } else {
    if (now - record.start > WINDOW_MS) {
      ipStore.set(ip, { count: 1, start: now });
    } else {
      record.count++;
      if (record.count > RATE_LIMIT) {
        return new NextResponse(
          JSON.stringify({ message: 'Too many requests' }),
          { status: 429 }
        );
      }
    }
  }

  /**
   * ==============================
   * LOCALE DETECTION
   * ==============================
   */
  const localeMatch = pathname.match(/^\/(en|uz|ru|tr|zh)(\/|$)/);
  const locale = localeMatch?.[1] ?? routing.defaultLocale;

  /**
   * ==============================
   * ROLE VALIDATION
   * ==============================
   * /{locale}/register/:role
   */
  const registerMatch = pathname.match(
    new RegExp(`^/${locale}/register/([^/]+)`)
  );

  const roleFromUrl = registerMatch?.[1];

  if (roleFromUrl && !validRoles.includes(roleFromUrl)) {
    const redirectUrl = new URL(
      `/${locale}/register/comunity_member`,
      req.url
    );
    return NextResponse.redirect(redirectUrl);
  }

  /**
   * ==============================
   * PASS TO next-intl
   * ==============================
   */
  return intlMiddleware(req);
}

/**
 * ==============================
 * MATCHER
 * ==============================
 */
export const config = {
  matcher: [
    '/',
    '/(en|uz|ru|tr|zh)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
