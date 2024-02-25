import { createContext, useContext } from 'react';

type CacheKeys = {
  postKey: string;
};
export const CacheKeysContext = createContext<CacheKeys>({
  // 기본값
  postKey: '/api/post',
});

export const useCacheKeys = () => useContext(CacheKeysContext);
