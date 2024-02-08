import { client } from './sanity';

type OAuthUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string | null;
};

export async function addUser({ id, name, username, email, image }: OAuthUser) {
  // 서버측에서 전달받은 user데이터로 Sanity에게 요청을 하면된다.
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    name: name,
    username: username,
    email: email,
    image: image,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUserByUserId(username: string) {
  // Sanity로부터 데이터를 받아와 서버측에 전달할것
  return client.fetch(
    `*[_type == "user" && username match "${username}"][0]{
      ...,
      "id":_id,
      "following":following[]->{username,image},
      "followers":followers[]->{username,image},
      "bookmarks":bookmarks[]->_id
    }`
  );
}