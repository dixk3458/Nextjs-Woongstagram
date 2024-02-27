import { addBookmark, removeBookmark } from '@/service/user';
import { withSessionUser } from '@/util/session';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  return withSessionUser(async user => {
    const { postId, bookmark } = await req.json();

    if (!postId || bookmark == null) {
      return new Response('Bad Request', { status: 400 });
    }

    const request = bookmark ? addBookmark : removeBookmark;

    return request(user.userid, postId)
      .then(res => NextResponse.json(res))
      .catch(error => new NextResponse(JSON.stringify(error), { status: 500 }));
  });
}
