'use client';

import { ProfileUser } from '@/model/user';
import Button from './ui/Button';
import useMe from '@/hook/useMe';

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username } = user;
  // 로그인한 유저(나)의 following 목록에서 Props로 전달받은 user가 있는지 검사
  const { user: loggedInUser } = useMe();

  // 로그인 유저페이지가 아니라면 보여줌
  const showButton = loggedInUser && loggedInUser.username !== username;

  const following =
    loggedInUser &&
    loggedInUser.following.find(item => item.username === username);

  const text = following ? 'Unfollow' : 'Follow';

  return (
    <>
      {showButton && (
        <Button text={text} onClick={() => {}} red={text === 'Unfollow'} />
      )}
    </>
  );
}
