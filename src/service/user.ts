import { ProfileUser, SearchUser } from '@/model/user';
import { client } from './sanity';

type OAuthUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string | null;
};

export async function addUser({ id, name, username, email, image }: OAuthUser) {
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
  return client.fetch(
    `*[_type == "user" && username match "${username}"][0]{
      ...,
      "userid":_id,
      "following":following[]->{username,image},
      "followers":followers[]->{username,image},
      "bookmarks":bookmarks[]->_id
    }`
  );
}

export async function searchUsers(keyword?: string) {
  // keyword는 선택사항으로
  // keyword에 따라서 query가 달라진다.
  const query = keyword
    ? `&& (name match "${keyword}*") || (username match "${keyword}*")`
    : ``;

  return client
    .fetch(
      `*[_type == "user" ${query}]{
    ...,
    "following": count(following),
    "followers": count(followers),
  }`
    )
    .then(users =>
      users.map((user: SearchUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    );
}

export async function getUserForProfile(username: string) {
  return client
    .fetch(
      `*[_type == "user" && username == "${username}"][0]{
      ...,
      "userid":_id,
      "following":count(following),
      "followers":count(followers),
      "posts":count(*[_type == "post" && author->username == "${username}"])
    }`,
      undefined,
      {
        next: { tags: [`profile/${username}`] },
      }
    )
    .then((user: ProfileUser) => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
      posts: user.posts ?? 0,
    }));
}

export async function addBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .setIfMissing({ bookmarks: [] })
    .append('bookmarks', [
      {
        _ref: postId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref == "${postId}"]`])
    .commit();
}

export async function follow(myId: string, targetId: string) {
  return client
    .transaction()
    .patch(myId, user =>
      user.setIfMissing({ following: [] }).append('following', [
        {
          _ref: targetId,
          _type: 'reference',
        },
      ])
    )
    .patch(targetId, user =>
      user.setIfMissing({ followers: [] }).append('followers', [
        {
          _ref: myId,
          _type: 'reference',
        },
      ])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unFollow(myId: string, targetId: string) {
  return client
    .transaction()
    .patch(myId, user => user.unset([`following[_ref=="${targetId}"]`]))
    .patch(targetId, user => user.unset([`followers[_ref=="${myId}"]`]))
    .commit();
}
