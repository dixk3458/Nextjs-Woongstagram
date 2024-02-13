import { SimplePost } from '@/model/post';
import { client, urlFor } from './sanity';

const simplePostProjection = `
    ...,
    "username":author->username,
    "userImage":author->image,
    "image":photo,
    "likes":likes[]->username,
    "text":comments[0].comment,
    "comments":count(comments),
    "id":_id,
    "createdAt":_createdAt,
`;

export async function getFollowingPostsOf(username: string) {
  // username을 기반으로 조인 쿼리

  return client
    .fetch(
      // 1. post를 가져올건데, post의 작성자가 인자로 받아온 username이라면 가져와
      // 2. 또는 author가 가지는 참조와 user스키마중 username이 username이고 following[]에 들어있는 값과 동일하다면 가져와
      `*[_type == "post" && author->username == "${username}"
        || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
        | order(_createdAt desc){${simplePostProjection}}`
    )
    .then(posts => mapPosts(posts));
}

export async function getPost(postid: string) {
  return client
    .fetch(
      `*[_type == "post" && _id == "${postid}"][0]{
      ...,
      "username":author->username,
      "userimage":author->image,
      "image":photo,
      "likes":likes[]->username,
      "comments":comments[]{comment,"username":author->username,"image":author->image},
      "id":_id,
      "createdAt":_createdAt
    }`
    )
    .then(post => ({ ...post, image: urlFor(post.image) }));
}

export async function getPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"]
      | order(_createdAt desc){${simplePostProjection}}`
    )
    .then(posts => mapPosts(posts));
}
export async function getLikedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && "${username}" in likes[]->username]
      | order(_createdAt desc){${simplePostProjection}}`
    )
    .then(posts => mapPosts(posts));
}
export async function getBookmarkedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && _id in *[_type == "user" && username == "${username}"].bookmarks[]._ref]
      | order(_createdAt desc){${simplePostProjection}}`
    )
    .then(posts => mapPosts(posts));
}

function mapPosts(posts: SimplePost[]) {
  return posts.map(post => ({ ...post, image: urlFor(post.image) }));
}
