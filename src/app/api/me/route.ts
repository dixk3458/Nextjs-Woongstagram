import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { getUserByUserId } from '@/service/user';
import { authOptions } from '@/util/authOptions';

export async function GET() {
  // 서버측에서 유효성 검사를 해주자.

  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    // 유저가 없다면, 401 응답을 해주자.
    return new Response('Authentication Error', { status: 401 });
  }

  // 유저가 있다면, 로그인한 사용자에대한 정보를 Sanity로부터 받아와 리턴

  // 로직을 분리해 유지보수성을 높여보자.
  // username은 email에서 앞부분으로 고유하다.
  return getUserByUserId(user.username).then(data => NextResponse.json(data));
}
