import { User } from '@/model/user';
import Avatar from './Avatar';

type Props = {
  user: User;
};

export default function SideBar({ user: { name, username, image } }: Props) {
  return (
    <>
      <div className="flex items-center">
        {image && <Avatar image={image} />}
        <div className="ml-2">
          <p className="font-bold">{username}</p>
          <p className="font-bold  text-neutral-500 leading-4">{name}</p>
        </div>
      </div>
      <p className="mt-8 text-sm text-neutral-700 font-bold ">
        <a href="https://www.notion.so/Frontend-Engineer-d484da4e05da443da11ede6879ca21ee?pvs=4">
          Resume
        </a>
        &nbsp;/ <a href="https://dev-blog-green.vercel.app/">Blog</a>
      </p>
      <p className="text-sm mt-8 font-bold text-neutral-500">
        © 2024 Jaewoong, Built with Next
      </p>
    </>
  );
}
