'use client'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AuthJWTLSKey } from './app/global'
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const cookie = request.cookies.get(AuthJWTLSKey)  
    const token = cookie?.value || '';
    // console.log(token, token.length)
    if (token.length === 0) {
        return NextResponse.redirect(new URL('/authentication/login', request.url))
    }
    const response = NextResponse.next()
    response.cookies.set(AuthJWTLSKey, token, {maxAge: 86400*7});   
    return response;    
}
 
export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      '/((?!api|authentication|images|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',

    ],
  }