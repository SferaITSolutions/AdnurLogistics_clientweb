// import createMiddleware from "next-intl/middleware";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { routing } from "./i18n/routing";

// const intlMiddleware = createMiddleware(routing);

// export function middleware(req: NextRequest) {
//   const url = req.nextUrl.pathname;
//   const validRoles = ["startup", "partner", "investor", "vc", "accelerator", "mentor", "comunity_member"];

//   // Извлекаем локаль (en, uz, ru) из URL
//   const localeMatch = url.match(/^\/(en|uz|ru)\//);
//   const locale = localeMatch ? localeMatch[1] : "uz"; // По умолчанию 'uz'

//   // Проверяем, начинается ли URL с "/{locale}/register/" и содержит ли он невалидную роль
//   const registerMatch = url.match(new RegExp(`^/${locale}/register/([^/]+)`));
//   const roleFromUrl = registerMatch ? registerMatch[1] : null;

//   if (roleFromUrl && !validRoles.includes(roleFromUrl)) {
//     return NextResponse.redirect(new URL(`/${locale}/register/comunity_member`, req.url));
//   }

//   // Если всё нормально, передаём управление next-intl middleware
//   return intlMiddleware(req);
// }

// // Оставляем тот же matcher
// export const config = {
//   matcher: ["/", "/(en|uz|ru)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
// };


import createMiddleware from "next-intl/middleware";
import { routing } from "./assets/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(en|uz|ru)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};