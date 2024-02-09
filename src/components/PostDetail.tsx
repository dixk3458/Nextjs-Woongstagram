import { FullPost, SimplePost } from '@/model/post';
import useSWR from 'swr';

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id } = post;

  // SimplePost에는 comments의 개수만 있지, 상세 정보가 없다.
  // id를 이용해 받아오자.
  const { data } = useSWR<FullPost>(`/api/post/${id}`);
  console.log(data);

  return <></>;
}
