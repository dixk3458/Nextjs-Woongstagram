import BounceSpinner from './ui/BounceSpinner';
import PostGridCard from './PostGridCard';
import usePosts from '@/hook/usePosts';

export default function PostsGrid() {
  const { posts, isLoading } = usePosts();

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
