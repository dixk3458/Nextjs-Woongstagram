import { Comment, FullPost } from '@/model/post';
import useSWR from 'swr';

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

  // 클라이언트에서 서버에 요청할때 수행하는것
  // 서버측에서 이미 post에대한 정보가 있으므로 클라이언트에서는 정보를 안알려줘도 됨
  const postComment = (comment: Comment) => {
    if (!post) {
      return;
    }

    const newPost = {
      ...post,
      comments: [...post.comments, comment],
    };

    mutate(updateComment(post, comment.comment), {
      // 로컬상에 먼저 적용할 post
      optimisticData: newPost,
      revalidate: false,
      populateCache: false,
      rollbackOnError: true,
    });
  };

  return { post, isLoading, error, postComment };
}
