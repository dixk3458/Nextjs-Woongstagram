'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HomeIcon from './ui/icon/HomeIcon';
import SearchFillIcon from './ui/icon/SearchFillIcon';
import SearchIcon from './ui/icon/SearchIcon';
import HomeFillIcon from './ui/icon/HomeFillIcon';
import NewIcon from './ui/icon/NewIcon';
import NewFillIcon from './ui/icon/NewFillIcon';
import ColorButton from './ui/icon/ColorButton';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Avatar from './Avatar';

const menu = [
  {
    href: '/',
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
    title: 'Home',
  },
  {
    href: '/search',
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
    title: 'Search users',
  },
  {
    href: '/new',
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
    title: 'New post',
  },
];

export default function Navbar() {
  const pathName = usePathname();

  // 로그인된 사용자의 session 정보를 가져온다.
  const { data: session } = useSession();

  // user의 유무에 따라서 Avatar를 표시해주자.
  const user = session?.user;

  return (
    <div className="flex justify-between  items-center px-6">
      <Link href="/" aria-label="Home">
        <h1 className="text-3xl font-bold">Woongstagram</h1>
      </Link>
      <nav>
        <ul className="flex gap-4 items-center p-4">
          {menu.map(item => (
            <li key={item.href}>
              <Link href={item.href} aria-label={item.title}>
                {pathName === item.href ? item.clickedIcon : item.icon}
              </Link>
            </li>
          ))}
          {user && (
            <li>
              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} size="small" highlight={true} />
              </Link>
            </li>
          )}
          {session ? (
            <ColorButton text="Sign out" onClick={() => signOut()} />
          ) : (
            <ColorButton text="Sign in" onClick={() => signIn()} />
          )}
        </ul>
      </nav>
    </div>
  );
}
