import UserPosts from '@/components/UserPosts';
import UserProfile from '@/components/UserProfile';
import { getUserForProfile } from '@/service/user';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

type Props = {
  params: { username: string };
};

// 한번 렌더링 되는 사이클 내에서 동일한 함수를 여러번 호출하면 비효율적이다.
// 캐싱된 함수를 사용해주자.

const getUser = cache(async (username: string) => getUserForProfile(username));

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const user = await getUser(username);

  return {
    title: `${user?.name} (@${user?.username}) ∙ Woongstagram Photos`,
    description: `${user?.name}'s all Woongstagram posts`,
  };
}

export default async function UserPage({ params: { username } }: Props) {
  // 서버 컴포넌트로 서버에서 렌더링될때 사용자 정보를 가져와야한다.

  const user = await getUser(username);

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
