import { HomeUser } from '@/model/user';
import { useCallback } from 'react';
import useSWR from 'swr';

function updateBookmark(postId: string, bookmark: boolean) {
  return fetch('/api/bookmark', {
    method: 'PUT',
    body: JSON.stringify({
      postId: postId,
      bookmark: bookmark,
    }),
  }).then(res => res.json());
}

function updateFollow(targetId: string, isFollow: boolean) {
  return fetch('/api/follow', {
    method: 'PUT',
    body: JSON.stringify({
      targetId: targetId,
      isFollow: isFollow,
    }),
  }).then(res => res.json());
}

export default function useMe() {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>('/api/me');

  const setBookmark = useCallback(
    (postId: string, bookmark: boolean) => {
      if (!user) {
        return;
      }

      const newUser = {
        ...user,
        bookmarks: bookmark
          ? [...user.bookmarks, postId]
          : user.bookmarks.filter(item => item !== postId),
      };
      mutate(updateBookmark(postId, bookmark), {
        optimisticData: newUser,
        revalidate: false,
        populateCache: false,
        rollbackOnError: true,
      });
    },
    [user, mutate]
  );

  // Optimistic data를 사용하지 않은 이유 => 여기서 사용하는 user는 로그인한 사용자이다. 즉 로컬에서 즉각적으로 업데이트를 준비할수있는것은
  // 로그인 사용자뿐이지만 follow는 상대방도 변경해주어야하기때문이다.
  const toggleFollow = useCallback(
    (targetId: string, isFollow: boolean) => {
      return mutate(updateFollow(targetId, isFollow), {
        populateCache: false,
      });
    },
    [user, mutate]
  );

  return { user, isLoading, error, setBookmark, toggleFollow };
}
