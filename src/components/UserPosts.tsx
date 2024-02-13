'use client';

import { ProfileUser } from '@/model/user';
import { useState } from 'react';
import useSWR from 'swr';

type Props = {
  user: ProfileUser;
};

export default function UserPosts({ user: { username } }: Props) {
  // 선택된 tab에 따라서 post를 보여줘야한다.
  const [tab, setTab] = useState('post');

  const {
    data: posts,
    isLoading,
    error,
  } = useSWR(`/api/user/${username}/${tab}`);
  console.log(posts);

  return <></>;
}
