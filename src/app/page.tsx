import FollowingBar from '@/components/FollowingBar';
import PostList from '@/components/PostList';
import SideBar from '@/components/SideBar';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  // HomePage는 로그인한 사용자만 들어올수있다.
  // 즉 HomePage에서 로그인한 사용자 세션정보를 검사하자.

  // HomePage는 서버 컴포넌트이다.
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // 만약 user가 없으면 로그인 페이지로 redirect
  if (!user) {
    redirect('/auth/signin');
  }

  // 로그인 한 사용자라면 통과
  return (
    <section>
      <div>
        <FollowingBar />
        <PostList />
      </div>
      <SideBar user={user} />
    </section>
  );
}
