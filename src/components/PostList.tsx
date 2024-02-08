'use client';

import { SimplePost } from '@/model/post';
import { BounceLoader, GridLoader } from 'react-spinners';
import useSWR from 'swr';
import PostListCard from './PostListCard';
import BounceSpinner from './ui/BounceSpinner';

export default function PostList() {
  const { data: posts, isLoading: loading } = useSWR<SimplePost[]>('/api/post');

  return (
    <section>
      {loading && (
        <div className="flex justify-center mt-32">
          <BounceSpinner color="#818cf8" />
        </div>
      )}
      {posts &&
        posts.map((post,index) => (
          <li key={post.id} className="mb-4 list-none">
            <PostListCard post={post} priority={index<2}/>
          </li>
        ))}
    </section>
  );
}
