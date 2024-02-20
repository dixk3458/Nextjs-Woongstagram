import { SimplePost } from '@/model/post';
import useSWR, { useSWRConfig } from 'swr';

async function updatePost(postId: string, like: boolean) {
  return fetch('/api/like', {
    method: 'PUT',
    body: JSON.stringify({
      postId: postId,
      like: like,
    }),
  }).then(res => res.json());
}

export default function usePosts() {
  // Posts에 대한 유용한 데이터를 제공하는 커스텀 훅
  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>('/api/post');

  const setLike = (post: SimplePost, username: string, like: boolean) => {
    const newPost = {
      ...post,
      likes: like
        ? [...post.likes, username]
        : post.likes.filter(item => item !== username),
    };

    const newPosts = posts?.map(p => (p.id === post.id ? newPost : p));

    mutate(updatePost(post.id, like), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return { posts, isLoading, error, setLike };
}
