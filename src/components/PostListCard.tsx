'use client';

import { SimplePost } from '@/model/post';
import Avatar from './Avatar';
import Image from 'next/image';
import CommentForm from './CommentForm';
import ActionBar from './ActionBar';

type Props = {
  post: SimplePost;
  priority?:boolean;
};

export default function PostListCard({ post,priority=false }: Props) {
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
        priority={priority}
      />
      <ActionBar
        likes={likes}
        username={username}
        text={text}
        createdAt={createdAt}
      />
      <CommentForm />
    </article>
  );
}
