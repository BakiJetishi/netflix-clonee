import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { AiOutlineClose, AiOutlineLike, AiOutlinePlus } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';
import {
  addFavorite,
  removeFavorite,
  selectFavorite,
} from '@/store/FavoriteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { selectModal } from '@/store/ModalSlice';

const Movie = ({ data, onClose }: any) => {
  const [isFavorite, setIsFavorite] = useState<boolean | undefined>(undefined);
  const dispatch = useDispatch();
  const router = useRouter();

  const infoModal = useSelector(selectModal);
  const isTvShow = infoModal?.tvShow;

  const favorite = useSelector(selectFavorite);
  const FavoriteMovie = favorite[data?.id] !== undefined;

  useEffect(() => {
    const isMovieFavorite = (id: string) => {
      const favorites = JSON.parse(localStorage.getItem('favorite') || '{}');
      return Boolean(favorites[id]);
    };
    if (data) setIsFavorite(isMovieFavorite(data.id));
  }, [FavoriteMovie]);

  const handleClose = useCallback(() => {
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const handleFavorite = () => {
    const { id, backdrop_path } = data;
    const title = !isTvShow ? data.title : data.name;
    const genre_ids = data.genres.map((e: any) => e.id);
    dispatch(addFavorite({ id, title, backdrop_path, genre_ids, isTvShow }));
  };

  const handleRemoveFavorite = () => {
    dispatch(removeFavorite(data.id));
  };

  return (
    <div className='relative h-[20rem] md:h-[30rem]'>
      <Image
        src={`https://image.tmdb.org/t/p/w500/${
          data?.backdrop_path !== undefined ? data?.backdrop_path : ''
        }`}
        alt='Movie'
        width={800}
        height={800}
        className='w-full brightness-[60%] object-cover h-full'
      />
      <div
        onClick={handleClose}
        className='cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center'
      >
        <AiOutlineClose className='bg-none text-white w-6' />
      </div>
      <div className='absolute bottom-[10%] left-10'>
        <p className='text-white text-2xl md:text-3xl h-full lg:text-4xl font-bold mb-5'>
          {!isTvShow ? data?.title : data?.name}
        </p>
        <div className='flex gap-2 items-center'>
          <button
            onClick={() => router.push(`/movie/${data?.id}`)}
            className='bg-gray-100  rounded-md py-2 md:py-2 px-6 md:px-10 text-sm lg:text-lg font-semibold flex items-center hover:bg-red-500 transition '
          >
            <FaPlay className='w-3 md:w-6 md:-ml-3 mr-1' />
            Play
          </button>
          <button
            onClick={isFavorite ? handleRemoveFavorite : handleFavorite}
            className='cursor-pointer w-6 h-6 lg:w-9 lg:h-9 bg-transparent border-white border rounded-full flex justify-center items-center transition hover:border-neutral-500'
          >
            {isFavorite ? (
              <AiOutlineClose className='text-white w-3 lg:w-4 group-hover/item:text-neutral-500' />
            ) : (
              <AiOutlinePlus className='text-white w-3 lg:w-4 group-hover/item:text-neutral-500' />
            )}
          </button>
          <button className='cursor-pointer w-6 h-6 lg:w-9 lg:h-9 bg-transparent border-white border rounded-full flex justify-center items-center transition hover:border-neutral-500'>
            <AiOutlineLike className='text-white w-3 lg:w-4 group-hover/item:text-neutral-500' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Movie;
