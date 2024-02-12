import { ProfileUser } from '@/model/user';
import Link from 'next/link';
import Avatar from './Avatar';

type Props = {
  user: ProfileUser;
};

export default function UserCard({
  user: { username, image, name, followers, following },
}: Props) {
  return (
    <Link
      className="w-full flex items-center border border-neutral3400 rounded-sm mb-4 p-4 bg-white hover:bg-neutral-50"
      href={`/user/${username}`}
    >
      <Avatar image={image} />
      <div className="text-neutral-500">
        <p className="text-black font-bold leading-4">{username}</p>
        <p>{name}</p>
        <p className="text-sm leading-4">{`${followers} follower ${following} following`}</p>
      </div>
    </Link>
  );
}
