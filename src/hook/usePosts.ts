import { SimplePost } from '@/model/post';
import useSWR, { useSWRConfig } from 'swr';

export default function usePosts() {
  // Posts에 대한 유용한 데이터를 제공하는 커스텀 훅
  const { data: posts, isLoading, error } = useSWR<SimplePost[]>('/api/post');
  const { mutate } = useSWRConfig();

  const setLike = (postId: string, username: string, like: boolean) => {
    fetch('/api/like', {
      method: 'PUT',
      body: JSON.stringify({
        postId: postId,
        like: like,
      }),
    }).then(() => mutate('/api/post'));
  };

  return { posts, isLoading, error, setLike };
}
