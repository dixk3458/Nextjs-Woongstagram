'use client';

import { SimplePost } from '@/model/post';
import Avatar from './Avatar';
import Image from 'next/image';
import HeartIcon from './ui/icon/HeartIcon';
import BookmarkIconn from './ui/icon/BookmarkIcon';
import parseDate from '@/util/time';

type Props = {
  post: SimplePost;
};

export default function PostListCard({ post }: Props) {
  const { userImage, username, image, likes, text, createdAt } = post;
  return (
    <>
      <div>
        <Avatar image={userImage} highlight={true} />
        <p>{username}</p>
      </div>
      <Image
        src={image}
        alt={`Photo by ${username}`}
        width={500}
        height={500}
      />
      <div>
        <HeartIcon />
        <BookmarkIconn />
      </div>
      <div>
        <p>{`${likes?.length ?? 0}${likes?.length > 1 ? 'likes' : 'like'}`}</p>
        <p>
          <span>{username}</span>
          {text}
        </p>
        <p>{parseDate(createdAt)}</p>
      </div>
      <form>
        <input type="text" placeholder="Add a comment..." />
        <button>Post</button>
      </form>
    </>
  );
}
