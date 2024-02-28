'use client';

import { ProfileUser } from '@/model/user';
import { useState } from 'react';
import useSWR from 'swr';
import PostIcon from './ui/icon/PostIcon';
import HeartIcon from './ui/icon/HeartIcon';
import BookmarkIconn from './ui/icon/BookmarkIcon';
import user from '../../sanity-studio/schemas/user';
import PostsGrid from './PostsGrid';
import { CacheKeysContext } from '@/context/CacheKeysContext';

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
        <ul className="flex justify-center uppercase">
          {tabs.map(({ icon, type }) => (
            <li
              key={type}
              onClick={() => setQuery(type)}
              className={`flex items-center px-12 py-4 border-indigo-300 ${
                type === query && 'font-bold border-t-2'
              }`}
            >
              <button className="scale-150 md:scale-100">{icon}</button>
              <span className="hidden md:inline">{type}</span>
            </li>
          ))}
        </ul>
      }
      <CacheKeysContext.Provider
        value={{ postKey: `/api/user/${username}/${query}` }}
      >
        <PostsGrid />
      </CacheKeysContext.Provider>
    </section>
  );
}
