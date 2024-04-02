import acceptLanguage from 'accept-language';
import { NextResponse } from "next/server";
import { fallbackLng, languages } from "./app/i18n/settings";
import { replacePath } from './Utils/CustomFunctions/ReplacePath';
import ConvertPermissionArr from './Utils/CustomFunctions/ConvertPermissionArr';
import { selfData } from './Utils/AxiosUtils/API';

acceptLanguage.languages(languages)

const cookieName = 'i18next'

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  let lng
  if (request.cookies.has(cookieName)) lng = acceptLanguage.get(request.cookies.get(cookieName).value)
  if (!lng) lng = acceptLanguage.get(request.headers.get('Accept-Language'))
  if (!lng) lng = fallbackLng

  if (path.split("/")[2] !== "auth" && !request.cookies.has("uat")) {
    return NextResponse.redirect(new URL(`/admin/${lng}/auth/login`, request.url));
  }

  if (path.split("/")[2] == "auth" && request.cookies.has("uat")) {
    return NextResponse.redirect(new URL(`/admin/${lng}/dashboard`, request.url));
  }

  if (path != `/${lng}/auth/login`) {
    if (path == `/${lng}/auth/otp-verification` && !request.cookies.has("ue")) {
      return NextResponse.redirect(new URL(`/admin/${lng}/auth/login`, request.url));
    }
    if (path == `/${lng}/auth/update-password` && (!request.cookies.has("uo") || !request.cookies.has("ue"))) {
      return NextResponse.redirect(new URL(`/admin/${lng}/auth/login`, request.url));
    }
  }

  if (request.headers.get("x-redirected")) {
    // Request is already redirected, skip middleware
    return NextResponse.next();
  }

  // Redirect if lng in path is not supported
  if (
    !languages.some(loc => request.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !request.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/admin/${lng}${request.nextUrl.pathname}`, request.url))
  }
  if (request.headers.has('referer')) {
    const refererUrl = new URL(request.headers.get('referer'))
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
    const response = NextResponse.next()
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
    return response
  }

  if (request.cookies.has("uat") && path.split("/dashboard")[2]) {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${request.cookies.get("uat")?.value}`);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let data;
    if (!request.cookies.has('uat')) {
      data = await (await fetch(process.env.API_PROD_URL + selfData, requestOptions))?.json();
    } else {
      data = request.cookies.get("account")
    }
    setTimeout(() => {
      const securePaths = data?.permission?.length && ConvertPermissionArr(data.permission);
      if (!securePaths?.find((item) => item?.name == replacePath(path?.split("/")[2]))?.permissionsArr.length > 0) {
        return NextResponse.redirect(new URL("/403", request.url));
      }
    }, 1000);
  }

}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};