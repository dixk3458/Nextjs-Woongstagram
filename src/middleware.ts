import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export { default } from 'next-auth/middleware';

export const config = {
  // 이 부분은 꼭 미들웨어를 거쳐감
  // 즉 서버측까지 가서 유효성검사를 실행하지 않고 미들웨어에서 유효성검사를 진행하자.
  matcher: [
    '/new',
    '/',
    '/api/bookmark',
    '/api/comment',
    '/api/like',
    '/api/follow',
    '/api/me',
    '/api/post/:path*',
  ],
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    if (req.nextUrl.pathname.startsWith('/api')) {
      return new NextResponse('Authentication Error', { status: 401 });
    }

    const { pathname, search, origin, basePath } = req.nextUrl;
    const signInUrl = new URL(`${basePath}/auth/signin`, origin);

    signInUrl.searchParams.append(
      'callbackUrl',
      `${basePath}${pathname}${search}`
    );

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}
