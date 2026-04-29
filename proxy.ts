import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { checkSession } from './lib/api/serverApi';
import { parse } from 'cookie';

const privateRoutes = ['/profile', '/journey', '/diary'];
const authRoutes = ['/auth'];

export const proxy = async (req: NextRequest) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const { pathname } = req.nextUrl;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (!accessToken) {
    if (refreshToken) {
      const { headers } = await checkSession();
      const setCookie = headers['set-cookie'];
      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed['Max-age']),
          };
          if (parsed.accessToken)
            cookieStore.set('accessToken', parsed.accessToken, options);
          if (parsed.refreshToken)
            cookieStore.set('refreshToken', parsed.refreshToken, options);
          if (parsed.sessionId)
            cookieStore.set('sessionId', parsed.sessionId, options);
        }

        if (isAuthRoute) {
          return NextResponse.redirect(new URL('/', req.url), {
            headers: { Cookie: cookieStore.toString() },
          });
        }
        if (isPrivateRoute) {
          return NextResponse.next({
            headers: { Cookie: cookieStore.toString() },
          });
        }
      }
    }
    if (isAuthRoute) {
      return NextResponse.next();
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }

  if (isAuthRoute) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  if (isPrivateRoute) {
    return NextResponse.next();
  }
};

export const config = {
  matcher: [
    '/auth/:path*',
    '/profile/:path*',
    '/journey/:path*',
    '/diary/:path*',
  ],
};
