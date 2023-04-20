import { selectModal } from '@/store/ModalSlice';
import React from 'react';
import { useSelector } from 'react-redux';

const MovieInfos = ({ data }: any) => {
  const infoModal = useSelector(selectModal);
  const isTvShow = infoModal?.tvShow;

  const minutes = data?.runtime;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return (
    <div className='grid grid-rows-2 md:grid-rows-1 md:grid-cols-3 gap-2 md:gap-12'>
      <div className='col-span-2'>
        <p className='text-lg text-orange-200 font-bold mb-5'>
          IMDb: {data?.vote_average.toFixed(1)}
        </p>
        <p className='text-white text-md'>{data?.overview}</p>
      </div>
      <div className='flex flex-col col-span-2 md:col-span-1 gap-2 mt-10'>
        <p className='text-white text-md'>
          <span className=' text-gray-400 text-sm'>Release Date: </span>
          {!isTvShow
            ? data?.release_date?.slice(0, 4)
            : data?.first_air_date.slice(0, 4)}
        </p>
        {!isTvShow ? (
          <p className='text-white text-md'>
            <span className=' text-gray-400 text-sm'>Duration: </span>
            {hours}h {remainingMinutes}m
          </p>
        ) : (
          <p className='text-white text-md'>
            <span className=' text-gray-400 text-sm'>Type: </span>
            {data?.type}
          </p>
        )}
        <div className='w-full'>
          <span className=' text-gray-400 text-sm'>Genres: </span>
          {data?.genres.map((e: any, index: number) => (
            <React.Fragment key={index}>
              <p className='text-white text-md inline-block'>{e.name}</p>
              {index !== data.genres.length - 1 && (
                <span className='text-white'>, </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieInfos;
