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

const menu = [
  {
    href: '/',
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
  },
  {
    href: '/search',
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
  },
  {
    href: '/new',
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
  },
];

export default function Navbar() {
  const pathName = usePathname();
  const { data: session } = useSession();
  return (
    <div className="flex justify-between  items-center px-6">
      <Link href="/">
        <h1 className="text-3xl font-bold">Woongstagram</h1>
      </Link>
      <nav>
        <ul className="flex gap-4 items-center p-4">
          {menu.map(item => (
            <li key={item.href}>
              <Link href={item.href}>
                {pathName === item.href ? item.clickedIcon : item.icon}
              </Link>
            </li>
          ))}
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
