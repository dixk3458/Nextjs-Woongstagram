import { searchUsers } from '@/service/user';
import { NextResponse } from 'next/server';

export async function GET() {
  // keyword가 없어 전체 사용자를 가져올것이다.
  return searchUsers().then(data => NextResponse.json(data));
}
