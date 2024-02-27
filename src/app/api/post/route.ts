import { getServerSession } from 'next-auth';
import { createPost, getFollowingPostsOf } from '@/service/post';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/util/authOptions';

export async function GET() {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return getFollowingPostsOf(user.username).then(data =>
    NextResponse.json(data)
  );
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const formData = await req.formData();
  const text = formData.get('text')?.toString();
  const file = formData.get('file') as Blob;

  if (!text || !file) {
    return new Response('Bad Request', { status: 400 });
  }

  return createPost(user.userid, text, file).then(data =>
    NextResponse.json(data)
  );
}
