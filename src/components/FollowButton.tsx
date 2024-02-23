'use client';

import { ProfileUser } from '@/model/user';
import Button from './ui/Button';
import useMe from '@/hook/useMe';
import { revalidateProfileUser } from '@/actions/revalidateProfileUser';
import { useState, useTransition } from 'react';
import { PulseLoader } from 'react-spinners';

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username } = user;
  // 로그인한 유저(나)의 following 목록에서 Props로 전달받은 user가 있는지 검사
  const { user: loggedInUser, toggleFollow } = useMe();

  // 로그인 유저페이지가 아니라면 보여줌
  const showButton = loggedInUser && loggedInUser.username !== username;

  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;

  const following =
    loggedInUser &&
    loggedInUser.following.find(item => item.username === username);

  const text = following ? 'Unfollow' : 'Follow';

  const isFollow = following ? true : false;

  // Button에 handleFollow를 할수있도록했다. 즉 내가 following중이라 true가 전달되면 false를 전달하도록하자.
  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(user.userid, !isFollow);
    setIsFetching(false);
    startTransition(() => {
      revalidateProfileUser(username);
    });
  };

  return (
    <>
      {showButton && (
        <div className="relative">
          {isUpdating && (
            <div className="absolute z-20 inset-0 flex justify-center items-center">
              <PulseLoader size={6} color="#818cf8" />
            </div>
          )}
          <Button
            disabled={isUpdating}
            text={text}
            onClick={() => {
              handleFollow();
            }}
            red={text === 'Unfollow'}
          />
        </div>
      )}
    </>
  );
}
