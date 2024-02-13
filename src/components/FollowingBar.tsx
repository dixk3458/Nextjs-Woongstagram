'use client';

import { HomeUser } from '@/model/user';
import Link from 'next/link';
import { PropagateLoader } from 'react-spinners';
import useSWR from 'swr';
import Avatar from './Avatar';
import ScrollableBar from './ui/ScrollableBar';

export default function FollowingBar() {
  // useSWR()로 받아오는 User의 타입을 명시해주자.
  const { data, isLoading: loading, error } = useSWR<HomeUser>('/api/me');

  // const users = data?.following;
  const users = data?.following;

  return (
    <section className="overflow-auto w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] relative z-0">
      {loading ? (
        <PropagateLoader color="#818cf8" size={8} />
      ) : (
        (!users || users.length === 0) && <p>You don&#39;t have following</p>
      )}
      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map(({ username, image }) => {
            return (
              <Link
                key={username}
                href={`/user/${username}`}
                className="flex flex-col items-center w-20"
              >
                <Avatar image={image} highlight={true} />
                <p className="w-full text-sm text-center text-ellipsis overflow-hidden hidden md:block">
                  {username}
                </p>
              </Link>
            );
          })}
        </ScrollableBar>
      )}
    </section>
  );
}
