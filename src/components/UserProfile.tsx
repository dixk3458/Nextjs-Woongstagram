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
    <section>
      <Avatar image={image} />
      <div>
        <h1>{username}</h1>
        <FollowButton user={user} />
        <ul>
          {data.map(({ title, count }, index) => (
            <li key={index}>
              <span>{count}</span>
              {title}
            </li>
          ))}
        </ul>
        <p>{name}</p>
      </div>
    </section>
  );
}
