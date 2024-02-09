'use client';

import { SimplePost } from '@/model/post';
import Avatar from './Avatar';
import Image from 'next/image';
import CommentForm from './CommentForm';
import ActionBar from './ActionBar';
import { useState } from 'react';
import ModalPortal from './ModalPortal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { userImage, username, image, likes, text, createdAt } = post;

  // modal을 보여줄 수 있도록 상태를 관리
  const [openModal, setOpenModal] = useState(false);
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
        onClick={() => setOpenModal(true)}
      />
      <ActionBar
        likes={likes}
        username={username}
        text={text}
        createdAt={createdAt}
      />
      <CommentForm />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
