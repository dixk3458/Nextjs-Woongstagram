import {
  getBookmarkedPostsOf,
  getLikedPostsOf,
  getPostsOf,
} from '@/service/post';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { slug: string[] };
};

export async function GET(_: NextRequest, context: Context) {
  // 전달받은 slug로 요청을해야한다.
  // 일단 유효성검사

  const slug = context.params.slug;

  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new Response('Bad Request', { status: 400 });
  }

  // 요청이 잘 왔다면, Sanity에 요청
  const [username, query] = slug;

  // query에 따라서 적절한 함수 호출

  let request = getPostsOf;

  if (query === 'liked') {
    request = getLikedPostsOf;
  } else if (query === 'bookmarked') {
    request = getBookmarkedPostsOf;
  }

  return request(username).then(data => NextResponse.json(data));
}
