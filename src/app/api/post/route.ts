import { createPost, getFollowingPostsOf } from '@/service/post';
import { NextRequest, NextResponse } from 'next/server';
import { withSessionUser } from '@/util/session';

export async function GET() {
  return withSessionUser(async user => {
    return getFollowingPostsOf(user.username).then(data =>
      NextResponse.json(data)
    );
  });
}

export async function POST(req: NextRequest) {
  return withSessionUser(async user => {
    const formData = await req.formData();
    const text = formData.get('text')?.toString();
    const file = formData.get('file') as Blob;

    if (!text || !file) {
      return new Response('Bad Request', { status: 400 });
    }

    return createPost(user.userid, text, file).then(data =>
      NextResponse.json(data)
    );
  });
}
