'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HomeIcon from './ui/icon/HomeIcon';
import SearchFillIcon from './ui/icon/SearchFillIcon';
import SearchIcon from './ui/icon/SearchIcon';
import HomeFillIcon from './ui/icon/HomeFillIcon';
import NewIcon from './ui/icon/NewIcon';
import NewFillIcon from './ui/icon/NewFillIcon';

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
  return (
    <div>
      <Link href="/">
        <h1>Woongstagram</h1>
      </Link>
      <nav>
        <ul>
          {menu.map(item => (
            <li key={item.href}>
              <Link href={item.href}>
                {pathName === item.href ? item.clickedIcon : item.icon}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
