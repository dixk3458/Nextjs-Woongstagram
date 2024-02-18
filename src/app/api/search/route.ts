import { searchUsers } from '@/service/user';
import { NextResponse } from 'next/server';

// Search 페이지는 Dynamic한 페이지이다.
// 사용자가 검색한 키워드에 따라서 렌더링을 수행해야하기때문이다.
// 하지만 아래의 작업을 하기 전에는 정적인 페이지로 표시되고있다.
// 별도의 요청없이 동일한 요청만 하기때문이다.
// 만약 정적인 페이지라면, 사용자가 검색을 할때 신규 사용자에 대해서는 검색이 안될것이다.

export const dynamic = 'force-dynamic';

export async function GET() {
  return searchUsers().then(data => NextResponse.json(data));
}
