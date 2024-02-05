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
    bookmark: [],
  });
}
