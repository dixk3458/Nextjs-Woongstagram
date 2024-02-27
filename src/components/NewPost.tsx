'use client';

import { AuthUser } from '@/model/user';
import PostUserAvatar from './PostUserAvatar';
import FileIcon from './ui/icon/FileIcon';
import Button from './ui/Button';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import BounceSpinner from './ui/BounceSpinner';

type Props = {
  user: AuthUser;
};

export default function NewPost({ user: { username, image } }: Props) {
  const [file, setFile] = useState<File>();
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const router = useRouter();

  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    if (e.type === 'dragenter') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
      setDragging(false);
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    // 로딩 UI
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', textRef.current?.value ?? '');

    fetch('/api/post', {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push('/');
      })
      .catch(error => setError(error.toString()))
      .finally(() => setLoading(false));
  };

  return (
    <section className="w-full max-w-xl flex flex-col items-center my-6">
      {loading && (
        <div className="absolute inset-0 z-20 flex justify-center items-center ">
          <BounceSpinner color="#818cf8" />
        </div>
      )}
      {error && (
        <p className="w-full p-2 mb-4 bg-red-100 text-red-600 text-center font-bold ">
          {error}
        </p>
      )}
      <PostUserAvatar userImage={image} username={username} />
      <form
        className="w-full flex flex-col my-2"
        onSubmit={e => handleSubmit(e)}
      >
        <input
          type="file"
          id="input-file"
          name="input"
          accept="image/*"
          className="hidden"
          onChange={e => handleChange(e)}
        />
        <label
          htmlFor="input-file"
          className={`h-60 flex flex-col items-center justify-center my-2 ${
            !file && 'border-2 border-indigo-300 border-dashed'
          }`}
          onDragEnter={e => handleDrag(e)}
          onDragLeave={e => handleDrag(e)}
          onDragOver={e => handleDragOver(e)}
          onDrop={e => handleDrop(e)}
        >
          {dragging && (
            <div className="absolute inset-0 bg-gray-700/20 z-20 pointer-events-none" />
          )}
          {!file && (
            <div className="flex flex-col items-center pointer-events-none">
              <FileIcon />
              <p>Drag and Drop your image here or Click</p>
            </div>
          )}
          {file && (
            <div className="relative w-full aspect-square">
              <Image
                className="object-contain"
                src={URL.createObjectURL(file)}
                alt="Local file"
                sizes="650px"
                fill
              />
            </div>
          )}
        </label>
        <textarea
          className="w-full p-2 mb-2 text-lg border border-gray-300 outline-none resize-none"
          rows={5}
          placeholder="Write a caption..."
          required
          ref={textRef}
        />
        <Button text="Publish" onClick={() => {}} />
      </form>
    </section>
  );
}
