import { ProfileUser } from '@/model/user';
import Avatar from './Avatar';
import FollowButton from './FollowButton';

type Props = {
  user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
  const { image, username, posts, following, followers, name } = user;

  const data = [
    {
      title: 'posts',
      count: posts,
    },
    {
      title: 'followers',
      count: followers,
    },
    {
      title: 'following',
      count: following,
    },
  ];
  return (
    <section className="w-full flex flex-col items-center justify-center py-12 border-b border-neutral-300 md:flex-row">
      <Avatar image={image} size="xlarge" />
      <div className="md:ml-10 basis-1/3">
        <div className="flex flex-col items-center md:flex-row">
          <h1 className="text-2xl mb-4 md:mr-8 md:mb-0">{username}</h1>
          <FollowButton user={user} />
        </div>
        <ul className="my-4 flex gap-4">
          {data.map(({ title, count }, index) => (
            <li key={index}>
              <span className="font-bold mr-1">{count}</span>
              {title}
            </li>
          ))}
        </ul>
        <p className="text-xl font-bold text-center md:text-start">{name}</p>
      </div>
    </section>
  );
}
