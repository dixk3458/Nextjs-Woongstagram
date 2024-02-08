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
    .then(posts =>
      posts.map((post: SimplePost) => ({ ...post, image: urlFor(post.image) }))
    );
}
