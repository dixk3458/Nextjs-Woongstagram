import { addComment } from '@/service/post';
import { withSessionUser } from '@/util/session';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // 로그인한 사용자가 Post 스키마를 업데이트 하는것이다.
  return withSessionUser(async user => {
    // 로그인한 사용자가 업데이트 하기위해서 받아올 정보
    const { postId, comment } = await req.json();

    if (!postId || !comment) {
      return new Response('Bad Request', { status: 400 });
    }

    // Sanity에 업데이트 요청
    return addComment(postId, user.userid, comment)
      .then(res => NextResponse.json(res))
      .catch(error => new NextResponse(JSON.stringify(error), { status: 500 }));
  });
}
