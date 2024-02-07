import { User } from '@/model/user';
import Avatar from './Avatar';

type Props = {
  user: User;
};

export default function SideBar({ user: { name, username, image } }: Props) {
  return (
    <>
      <div>
        <Avatar image={image} />
        <p>{username}</p>
        <p>{name}</p>
      </div>
      <p>
        <a href="https://www.notion.so/Frontend-Engineer-d484da4e05da443da11ede6879ca21ee?pvs=4">
          Resume
        </a>
        &nbsp;/ <a href="https://dev-blog-green.vercel.app/">Blog</a>
      </p>
      <p>© 2024 Jaewoong, Built with Next</p>
    </>
  );
}
