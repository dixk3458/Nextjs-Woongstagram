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
  const { user: loggedInUser, toggleFollow } = useMe();

  // 로그인 유저페이지가 아니라면 보여줌
  const showButton = loggedInUser && loggedInUser.username !== username;

  const following =
    loggedInUser &&
    loggedInUser.following.find(item => item.username === username);

  const text = following ? 'Unfollow' : 'Follow';

  const isFollow = following ? true : false;

  // Button에 handleFollow를 할수있도록했다. 즉 내가 following중이라 true가 전달되면 false를 전달하도록하자.
  const handleFollow = () => {
    toggleFollow(user.userid, !isFollow);
  };

  return (
    <>
      {showButton && (
        <Button
          text={text}
          onClick={() => {
            handleFollow();
          }}
          red={text === 'Unfollow'}
        />
      )}
    </>
  );
}
