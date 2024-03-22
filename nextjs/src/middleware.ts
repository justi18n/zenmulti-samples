import { NextRequest, NextResponse } from "next/server";
import { locales } from "./i18n/dictionaries";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

export async function middleware(request: NextRequest) {
  console.log(request.url);
  const pathname = request.nextUrl.pathname;
  let pathnameIsMissingLocale = pathname === "" || pathname === "/";

  if (!pathnameIsMissingLocale) {
    let path = pathname.split("/")[1];
    let index = path.indexOf("-");
    if (index > 0) {
      path = path.substring(0, index);
    }
    pathnameIsMissingLocale = locales.every((locale) => {
      return locale !== path;
    });
  }
  if (pathnameIsMissingLocale) {
    let headers = { "accept-language": request.headers.get("accept-language") || "en-US,en;q=0.5" };
    let languages = new Negotiator({ headers }).languages();
    const locale = match(languages, locales, "en");
    let url = `/${locale}/${pathname}`;
    if (request.nextUrl.search && request.nextUrl.search.length > 0) {
      url += request.nextUrl.search;
    }
    return NextResponse.redirect(new URL(url, request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|assets|favicon.ico|favicon.svg|sw.js|sitemap.xml|auth|robots.txt|logo.png|manifest.json).*)"],
};
