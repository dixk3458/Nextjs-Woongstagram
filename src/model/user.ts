// 로그인한 사용자의 세션 정보에 담겨있는 데이터이다.
export type User = {
  name: string;
  username: string;
  email: string;
  image?: string;
};

export type SimpleUser = Pick<User, 'username' | 'image'>;

// Sanity로부터 얻어온 사용자 데이터 타입
//하지만 following, followers,bookmark는 필요에 따라 정의했다.
export type DetailUser = User & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};
