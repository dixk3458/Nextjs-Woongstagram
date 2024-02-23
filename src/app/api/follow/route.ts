import { follow, unFollow } from '@/service/user';
import { authOptions } from '@/util/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  // 서버측에서 사용자의 정보를 검사해야한다.

  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  //   클라이언트로부터 follow하라고 전달받으면 즉 isFollow가 true라면 follow를 해주자.
  const { targetId, isFollow } = await req.json();
  if (!targetId || isFollow === undefined) {
    return new Response('Bad Request', { status: 400 });
  }

  const request = isFollow ? follow : unFollow;

  return request(user.userid, targetId)
    .then(res => NextResponse.json(res))
    .catch(error => new NextResponse(JSON.stringify(error)));
}
