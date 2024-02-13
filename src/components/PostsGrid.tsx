import useSWR from 'swr';
import BounceSpinner from './ui/BounceSpinner';
import { SimplePost } from '@/model/post';
import PostGridCard from './PostGridCard';

type Props = {
  username: string;
  query: string;
};

export default function PostsGrid({ username, query }: Props) {
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR<SimplePost[]>(`/api/user/${username}/${query}`);

  return (
    <div>
      {isLoading && <BounceSpinner />}
      {!isLoading && posts && posts.length < 1 && <p>현재 조용합니다 😅.</p>}
      <ul>
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
}
