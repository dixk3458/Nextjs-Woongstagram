import { FullPost, SimplePost } from '@/model/post';
import Image from 'next/image';
import useSWR from 'swr';
import PostUserAvatar from './PostUserAvatar';
import ActionBar from './ActionBar';
import CommentForm from './CommentForm';
import Avatar from './Avatar';
import Link from 'next/link';

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, image, username, userImage, createdAt, likes } = post;

  // SimplePost에는 comments의 개수만 있지, 상세 정보가 없다.
  // id를 이용해 받아오자.
  const { data } = useSWR<FullPost>(`/api/post/${id}`);
  const comments = data?.comments;

  return (
    <section>
      <div className="relative">
        <Image src={image} alt={`Photo by ${username}`} fill sizes="650px" />
      </div>
      <div>
        <PostUserAvatar userImage={userImage} username={username} />
        <ul>
          {comments &&
            comments.map(
              (
                { username: commentUserName, image: commentUserImage, comment },
                index
              ) => (
                <li key={index}>
                  <Link href={`/user/${commentUserName}`}>
                    <Avatar
                      image={commentUserImage}
                      size="small"
                      highlight={username === commentUserName}
                    />
                  </Link>
                  <div>
                    <span>{commentUserName}</span>
                    <span>{comment}</span>
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar username={username} createdAt={createdAt} likes={likes} />
        <CommentForm />
      </div>
    </section>
  );
}
