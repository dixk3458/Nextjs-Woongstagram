'use client';

import { ProfileUser } from '@/model/user';
import { useState } from 'react';
import useSWR from 'swr';
import PostIcon from './ui/icon/PostIcon';
import HeartIcon from './ui/icon/HeartIcon';
import BookmarkIconn from './ui/icon/BookmarkIcon';
import user from '../../sanity-studio/schemas/user';
import PostsGrid from './PostsGrid';

type Props = {
  user: ProfileUser;
};

const tabs = [
  {
    type: 'post',
    icon: <PostIcon />,
  },
  {
    type: 'liked',
    icon: <HeartIcon className="w-4 h-4" />,
  },
  {
    type: 'bookmarked',
    icon: <BookmarkIconn className="w-4 h-4" />,
  },
];

export default function UserPosts({ user: { username } }: Props) {
  // 선택된 tab에 따라서 post를 보여줘야한다.
  const [query, setQuery] = useState('post');

  return (
    <section>
      {
        <ul>
          {tabs.map(({ icon, type }) => (
            <li key={type} onClick={() => setQuery(type)}>
              <button>{icon}</button>
              <span>{type}</span>
            </li>
          ))}
        </ul>
      }
      <PostsGrid username={username} query={query} />
    </section>
  );
}
