import UserSearch from '@/components/UserSearch';

export default function SearchPage() {
  // 애플리케이션 사용자의 keyword에 따라서 요청을하고
  // 그에맞는 페이지를 준비해야하기에 클라이언트 컴포넌트이다.
  // 페이지 전체를 클라이언트 컴포넌트로 하기보다는 나눠서 해주자.

  return (
    <>
      <UserSearch />
    </>
  );
}
