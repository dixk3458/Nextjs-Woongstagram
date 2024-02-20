'use client';

import parseDate from '@/util/time';
import BookmarkIconn from './ui/icon/BookmarkIcon';
import HeartIcon from './ui/icon/HeartIcon';
import { useState } from 'react';
import ToggleButton from './ui/ToggleButton';
import HeartFillIcon from './ui/icon/HeartFillIcon';
import BookmarkFillIcon from './ui/icon/BookmarkFillIcon';
import { useSession } from 'next-auth/react';
import { SimplePost } from '@/model/post';
import { useSWRConfig } from 'swr';

type Props = {
  post: SimplePost;
};

export default function ActionBar({ post }: Props) {
  const { id: postId, likes, username, text, createdAt } = post;
  const { data: session } = useSession();

  const { mutate } = useSWRConfig();
  const user = session?.user;

  const liked = user ? likes.includes(user.username) : false;
  const [bookmarked, setBookmarked] = useState(false);

  // 클라이언트 컴포넌트로 useSWR을 사용할 수 없다.
  const handleLiked = (like: boolean) => {
    fetch('/api/like', {
      method: 'PUT',
      body: JSON.stringify({
        postId: postId,
        like: like,
      }),
    }).then(() => mutate('/api/post'));
  };

  return (
    <>
      <div className="flex justify-between items-center px-4 py-2">
        <ToggleButton
          toggled={liked}
          onToggle={toggle => handleLiked(toggle)}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={toggle => setBookmarked(toggle)}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIconn />}
        />
      </div>
      <div className="px-4">
        <p className="font-bold text-sm">{`${likes?.length ?? 0}${
          likes?.length > 1 ? 'likes' : 'like'
        }`}</p>
        {text && (
          <p className="mt-1">
            <span className="text-sm font-bold mr-2">{username}</span>
            {text}
          </p>
        )}
        <p className="my-1 mb-2 text-neutral-500 text-xs uppercase">
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}
