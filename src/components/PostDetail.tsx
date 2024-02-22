import { FullPost, SimplePost } from '@/model/post';
import Image from 'next/image';
import useSWR from 'swr';
import PostUserAvatar from './PostUserAvatar';
import ActionBar from './ActionBar';
import CommentForm from './CommentForm';
import Avatar from './Avatar';
import Link from 'next/link';
import usePosts from '@/hook/usePosts';

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, image, username, userImage, createdAt, likes } = post;

  const { postComment } = usePosts();

  const handlePostComment = (comment: string) => {
    // 네트워크 요청을 PostListCard에서 하지말고 커스텀 훅으로 처리해주자.
    postComment(post, comment);
  };

  // SimplePost에는 comments의 개수만 있지, 상세 정보가 없다.
  // id를 이용해 받아오자.
  const { data } = useSWR<FullPost>(`/api/post/${id}`);
  const comments = data?.comments;

  return (
    <section className="flex w-full h-full">
      <div className="relative basis-3/5">
        <Image
          className="object-cover"
          src={image}
          alt={`Photo by ${username}`}
          fill
          sizes="650px"
        />
      </div>
      <div className="basis-2/5 flex flex-col">
        <PostUserAvatar userImage={userImage} username={username} />
        <ul className="border-t border-gray-200 h-full overflow-y-auto p-4">
          {comments &&
            comments.map(
              (
                { username: commentUserName, image: commentUserImage, comment },
                index
              ) => (
                <li key={index} className="flex items-center mb-1">
                  <Link href={`/user/${commentUserName}`}>
                    <Avatar
                      image={commentUserImage}
                      size="small"
                      highlight={username === commentUserName}
                    />
                  </Link>
                  <div className="ml-2">
                    <span className="font-bold mr-1">{commentUserName}</span>
                    <span>{comment}</span>
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar post={post} />
        <CommentForm onPostComment={comment => handlePostComment(comment)} />
      </div>
    </section>
  );
}
