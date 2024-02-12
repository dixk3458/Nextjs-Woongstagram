'use client';

import { ProfileUser } from '@/model/user';
import { FormEvent, useState } from 'react';
import useSWR from 'swr';
import BounceSpinner from './ui/BounceSpinner';
import UserCard from './UserCard';

export default function UserSearch() {
  // keyword가 있다면 해당 유저를 가져오고
  // 없다면 전체 유저를 가져올것이다.
  // /api/search/jaewoong
  // /api/search/
  const [keyword, setKeyword] = useState('');

  const {
    data: users,
    isLoading,
    error,
  } = useSWR<ProfileUser[]>(`/api/search/${keyword}`);
  console.log(users);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="w-full max-w-2xl my-4 flex flex-col items-center">
      <form className="w-full" onSubmit={e => handleSubmit(e)}>
        <input
          className="w-full text-xl p-4 mb-4 border border-gray-400 outline-none"
          type="text"
          autoFocus
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="Search for a username or name"
        />
      </form>
      {error && <p>에러가 발생했습니다.</p>}
      {isLoading && <BounceSpinner color="#818cf8" />}
      {!isLoading && !error && users && users.length === 0 && (
        <p>사용자를 찾을 수 없습니다.</p>
      )}
      <ul className=" w-full p-4">
        {users &&
          users.map(user => (
            <li key={user.username}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}
