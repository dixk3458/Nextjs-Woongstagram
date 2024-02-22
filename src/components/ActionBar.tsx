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
import usePosts from '@/hook/usePosts';
import useMe from '@/hook/useMe';

type Props = {
  post: SimplePost;
  children:React.ReactNode
};

export default function ActionBar({ post,children }: Props) {
  const { likes, username, text, createdAt } = post;
  const { data: session } = useSession();

  const { setLike } = usePosts();
  const { user, setBookmark } = useMe();

  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user ? user.bookmarks.includes(post.id) : false;

  const handleLiked = (like: boolean) => {
    user && setLike(post, user.username, like);
  };

  const handleBookmarked = (bookmark: boolean) => {
    user && setBookmark(post.id, bookmark);
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
          onToggle={toggle => handleBookmarked(toggle)}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIconn />}
        />
      </div>
      <div className="px-4">
        <p className="font-bold text-sm">{`${likes?.length ?? 0}${
          likes?.length > 1 ? 'likes' : 'like'
        }`}</p>
        {children}
        <p className="my-1 mb-2 text-neutral-500 text-xs uppercase">
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}
