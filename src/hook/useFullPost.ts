import { Comment, FullPost } from '@/model/post';
import { useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';

// 네트워크 처리함수 클라이언트에서는 몰라도됨
function updateComment(post: FullPost, comment: string) {
  return fetch(`/api/comment`, {
    method: 'POST',
    body: JSON.stringify({
      postId: post.id,
      comment: comment,
    }),
  }).then(res => res.json());
}

// 커스텀 훅을 사용할때 어떤 포스트에대한 커스텀훅인지 정보를 받아야한다.
export default function useFullPost(postId: string) {
  const {
    data: post,
    isLoading,
    error,
    mutate,
  } = useSWR<FullPost>(`/api/post/${postId}`);

  const { mutate: globalMutate } = useSWRConfig();

  // 클라이언트에서 서버에 요청할때 수행하는것
  // 서버측에서 이미 post에대한 정보가 있으므로 클라이언트에서는 정보를 안알려줘도 됨
  const postComment = useCallback(
    (comment: Comment) => {
      if (!post) {
        return;
      }

      const newPost = {
        ...post,
        comments: [...post.comments, comment],
      };

      // /api/post/id에 해당하는 post가 업데이트가 되고나서 globalMutate로 모든 posts를 업데이트해주자.
      mutate(updateComment(post, comment.comment), {
        // 로컬상에 먼저 적용할 post
        optimisticData: newPost,
        revalidate: false,
        populateCache: false,
        rollbackOnError: true,
      }).then(() => globalMutate('/api/post'));
    },
    [post, mutate, globalMutate]
  );

  return { post, isLoading, error, postComment };
}
