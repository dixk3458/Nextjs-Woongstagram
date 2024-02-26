import NewPost from '@/components/NewPost';
import { authOptions } from '@/util/authOptions';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'New post',
  description: 'Create a new post',
};

export default async function NewPostPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/signin');
  }

  return (
    <>
      <NewPost user={session.user} />
    </>
  );
}
