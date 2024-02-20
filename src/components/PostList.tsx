'use client';

import PostListCard from './PostListCard';
import BounceSpinner from './ui/BounceSpinner';
import usePosts from '@/hook/usePosts';

export default function PostList() {
  const { posts, isLoading: loading } = usePosts();

  return (
    <section>
      {loading && (
        <div className="flex justify-center mt-32">
          <BounceSpinner color="#818cf8" />
        </div>
      )}
      <ul>
        {posts &&
          posts.map((post, index) => (
            <li key={post.id} className="mb-4 list-none">
              <PostListCard post={post} priority={index < 2} />
            </li>
          ))}
      </ul>
    </section>
  );
}
