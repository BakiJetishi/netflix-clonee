import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useRouter } from 'next/router';
import useSwr from 'swr';
import fetcher from '@/lib/fetcher';

const Watch = () => {
  const router = useRouter();
  const { movieID } = router.query;

  const { data } = useSwr(movieID ? `/api/movies/${movieID}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
  });

  return (
    <div className='bg-black h-screen w-screen '>
      <div className='fixed p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70'>
        <AiOutlineArrowLeft
          onClick={() => router.push('/')}
          className='w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition'
        />
        <p className='text-white text-xl md:text-3xl font-bold'>
          <span className='font-light'>Watching:</span> {data?.title}
        </p>
      </div>
      <video
        className='h-screen w-screen'
        autoPlay
        muted
        controls
        src={data?.videoUrl}
      ></video>
    </div>
  );
};

export default Watch;
