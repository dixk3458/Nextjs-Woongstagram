import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { getPost } from '@/service/post';
import { authOptions } from '@/util/authOptions';

type Context = {
  params: { id: string };
};

export async function GET(req: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return getPost(context.params.id).then(data => NextResponse.json(data));
}
