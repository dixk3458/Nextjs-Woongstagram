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
    <article className="shadow-md border-gray-500  rounded-lg">
      <div className="flex items-center">
        <Avatar image={userImage} highlight={true} size="medium" />
        <p className="font-bold ml-2 text-sm">{username}</p>
      </div>
      <Image
        className="w-full object-cover aspect-square"
        src={image}
        alt={`Photo by ${username}`}
        width={500}
        height={500}
      />
      <div className="flex justify-between items-center px-4 py-2">
        <HeartIcon />
        <BookmarkIconn />
      </div>
      <div className="px-4">
        <p className="font-bold text-sm">{`${likes?.length ?? 0}${
          likes?.length > 1 ? 'likes' : 'like'
        }`}</p>
        <p className="mt-1">
          <span className="text-sm font-bold mr-2">{username}</span>
          {text}
        </p>
        <p className="my-1 mb-2 text-neutral-500 text-xs uppercase">
          {parseDate(createdAt)}
        </p>
      </div>
      <form className="flex items-center p-4 border-t">
        <input
          className="w-full outline-none border-none "
          type="text"
          placeholder="Add a comment..."
        />
        <button className="font-bold text-indigo-600">Post</button>
      </form>
    </article>
  );
}
