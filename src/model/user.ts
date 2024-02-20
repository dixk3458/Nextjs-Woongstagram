// 로그인한 사용자의 세션 정보에 담겨있는 데이터이다.
export type AuthUser = {
  userid: string;
  name: string;
  username: string;
  email: string;
  image?: string;
};

export type SimpleUser = Pick<AuthUser, 'username' | 'image'>;

// Sanity로부터 얻어온 사용자 데이터 타입
//하지만 following, followers,bookmark는 필요에 따라 정의했다.
export type HomeUser = AuthUser & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};

// 검색어로 얻어온 사용자 정보
export type SearchUser = AuthUser & {
  following: number;
  followers: number;
};

export type ProfileUser = SearchUser & {
  posts: number;
};
