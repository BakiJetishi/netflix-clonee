import React from 'react';
import useSwr from 'swr';
import fetcher from '@/lib/fetcher';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { openModal } from '@/store/ModalSlice';

const Billboard = () => {
  const router = useRouter();
  const { data } = useSwr('/api/randomMovie', fetcher);

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal({ id: '1396', tvShow: true }));
  };

  return (
    <div className='h-[70vh] relative mb-32'>
      <video
        poster={data?.thumbnailUrl}
        className=' brightness-50 object-cover h-[75vh] w-full'
        autoPlay
        loop
        muted
        src={data?.videoUrl}
      ></video>
      <div className='absolute top-[40%] ml-7 md:ml-14'>
        <h1 className='text-white text-3xl md:text-5xl h-full w-[80%] lg:text-6xl font-bold'>
          {data?.title}
        </h1>
        <div className='flex flex-row items-center mt-3 md:mt-10 gap-3'>
          <button
            onClick={() => router.push(`/movie/${data?.id}`)}
            className='bg-red-700 text-white rounded-md py-2 md:py-2 px-4 md:px-10 text-xs lg:text-lg font-semibold flex items-center hover:bg-red-500 transition '
          >
            <FaPlay className='w-4 md:w-7 -ml-3 text-white mr-1' />
            Play
          </button>

          <button
            onClick={handleOpenModal}
            className='bg-gray-400/60 text-white rounded-md py-2 md:py-2 px-4 md:px-10 text-xs lg:text-lg font-semibold flex items-center hover:bg-gray-300/60 transition '
          >
            <AiOutlinePlus className='w-4 md:w-7 -ml-3 text-white mr-1' />
            More Info
          </button>
        </div>
        <p className='text-white text-md md:text-lg mt-2 md:mt-5 w-[80%] lg:w-[50%]'>
          {data?.description}
        </p>
      </div>
    </div>
  );
};
export default Billboard;
