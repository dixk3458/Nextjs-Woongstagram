import { useCacheKeys } from '@/context/CacheKeysContext';
import { Comment, SimplePost } from '@/model/post';
import { useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';

async function updateLike(postId: string, like: boolean) {
  return fetch('/api/like', {
    method: 'PUT',
    body: JSON.stringify({
      postId: postId,
      like: like,
    }),
  }).then(res => res.json());
}

async function updateComment(postId: string, comment: string) {
  return fetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify({
      postId: postId,
      comment: comment,
    }),
  }).then(res => res.json());
}

export default function usePosts() {
  // Posts에 대한 유용한 데이터를 제공하는 커스텀 훅
  const cacheKeys = useCacheKeys();

  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>(cacheKeys.postKey);

  const setLike = useCallback(
    (post: SimplePost, username: string, like: boolean) => {
      const newPost = {
        ...post,
        likes: like
          ? [...post.likes, username]
          : post.likes.filter(item => item !== username),
      };

      const newPosts = posts?.map(p => (p.id === post.id ? newPost : p));

      mutate(updateLike(post.id, like), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );

  const postComment = useCallback(
    (post: SimplePost, comment: Comment) => {
      const newPost = {
        ...post,
        comments: post.comments + 1,
      };

      const newPosts = posts?.map(p => (p.id === post.id ? newPost : p));

      mutate(updateComment(post.id, comment.comment), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );
  return { posts, isLoading, error, setLike, postComment };
}
