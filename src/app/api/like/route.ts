import { dislikePost, likePost } from '@/service/post';
import { withSessionUser } from '@/util/session';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  // 로그인한 사용자 파악
  return withSessionUser(async user => {
    // 요청에 대한 유효성검사
    // JSON 형식으로 전달된 req를 객체로 풀었다.
    const { postId, like } = await req.json();

    if (!postId || like === undefined) {
      return new Response('Bad Request', { status: 400 });
    }

    // 요청한 like에 따라 request가 달라진다.
    const request = like ? likePost : dislikePost;
    // Sanity 업데이트 요청
    return request(postId, user.userid)
      .then(res => NextResponse.json(res))
      .catch(error => new Response(JSON.stringify(error), { status: 500 }));
  });
}
