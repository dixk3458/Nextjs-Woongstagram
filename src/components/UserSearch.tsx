'use client';

import { useState } from 'react';
import useSWR from 'swr';

export default function UserSearch() {
  // keyword가 있다면 해당 유저를 가져오고
  // 없다면 전체 유저를 가져올것이다.
  // /api/search/jaewoong
  // /api/search/
  const [keyword, setKeyword] = useState('');

  const { data, isLoading, error } = useSWR(`/api/search/${keyword}`);
  console.log(data);

  return (
    <>
      <input
        type="text"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />
    </>
  );
}
