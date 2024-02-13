import UserPosts from '@/components/UserPosts';
import UserProfile from '@/components/UserProfile';
import { getUserForProfile } from '@/service/user';
import { notFound } from 'next/navigation';

type Props = {
  params: { username: string };
};

export default async function UserPage({ params: { username } }: Props) {
  // 서버 컴포넌트로 서버에서 렌더링될때 사용자 정보를 가져와야한다.

  const user = await getUserForProfile(username);

  if (!user) {
    notFound();
  }

  return (
    <section className="w-full">
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}
