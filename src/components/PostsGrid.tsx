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
      <div className="w-full flex justify-center mt-[30px]">
        {isLoading && <BounceSpinner color="#818cf8" />}
        {!isLoading && posts && posts.length < 1 && <p>현재 조용합니다 😅.</p>}
      </div>
      <ul className="h-full grid grid-cols-3 gap-4 py-4 px-8">
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
