'use client';

import { SimplePost } from '@/model/post';
import { BounceLoader } from 'react-spinners';
import useSWR from 'swr';
import PostListCard from './PostListCard';

export default function PostList() {
  // HomePage에서 받아온 사용자를 기반으로 PostList를 보여줘야한다.
  // 사용자가 요청할때마다 데이터를 보여줘야하기에 클라이언트 컴포넌트로 만들자.

  // 1. 클라이언트 측에서 사용자 세션 정보를 바탕으로 데이터 가져온다.
  // 2. 서버는 그 아이디를 가지고 Sanity에서 데이터를 가지고 온다.
  // 3. 서버가 클라이언트에 전달
  // 4. UI 보여줌

  const {
    data: posts,
    isLoading: loading,
    error,
  } = useSWR<SimplePost[]>('/api/post');

  return (
    <section>
      {loading && <BounceLoader color="#818cf8" />}
      {posts &&
        posts.map(post => (
          <li key={post.id}>
            <PostListCard post={post} />
          </li>
        ))}
    </section>
  );
}
