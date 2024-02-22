'use client';

import { Comment, SimplePost } from '@/model/post';
import Image from 'next/image';
import CommentForm from './CommentForm';
import ActionBar from './ActionBar';
import { useState } from 'react';
import ModalPortal from './ModalPortal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';
import PostUserAvatar from './PostUserAvatar';
import usePosts from '@/hook/usePosts';

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { userImage, username, image, comments, text } = post;

  const { postComment } = usePosts();

  const handlePostComment = (comment: Comment) => {
    // 네트워크 요청을 PostListCard에서 하지말고 커스텀 훅으로 처리해주자.
    postComment(post, comment);
  };

  // modal을 보여줄 수 있도록 상태를 관리
  const [openModal, setOpenModal] = useState(false);
  return (
    <article className="shadow-md border-gray-500  rounded-lg">
      <PostUserAvatar userImage={userImage} username={username} />
      <Image
        className="w-full object-cover aspect-square"
        src={image}
        alt={`Photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar post={post} onComment={comment => handlePostComment(comment)}>
        <p className="mt-1">
          <span className="text-sm font-bold mr-2">{username}</span>
          {text}
        </p>
        {comments > 1 && (
          <button onClick={() => setOpenModal(true)}>
            <p className="font-bold text-indigo-500">{`View all ${comments} comments`}</p>
          </button>
        )}
      </ActionBar>
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
