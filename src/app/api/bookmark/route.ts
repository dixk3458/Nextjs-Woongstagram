import { addBookmark, removeBookmark } from '@/service/user';
import { authOptions } from '@/util/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const { postId, bookmark } = await req.json();

  if (!postId || bookmark === undefined) {
    return new Response('Bad Request', { status: 400 });
  }

  const request = bookmark ? addBookmark : removeBookmark;

  return request(user.userid, postId)
    .then(res => NextResponse.json(res))
    .catch(error => new NextResponse(JSON.stringify(error), { status: 500 }));
}
