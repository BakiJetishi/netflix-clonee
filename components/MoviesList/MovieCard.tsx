import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { MovieCardProps } from './MovieList';
import useGenres from '@/hooks/use-genres';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '@/store/ModalSlice';
import {
  addFavorite,
  removeFavorite,
  selectFavorite,
} from '@/store/FavoriteSlice';

import {
  AiFillDownCircle,
  AiOutlineClose,
  AiOutlineLike,
  AiOutlinePlus,
} from 'react-icons/ai';
import { MdPlayArrow } from 'react-icons/md';

const MovieCard = ({
  backdrop_path,
  id,
  genre_ids,
  title,
  modal = false,
  tvShow = false,
}: MovieCardProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean | undefined>(undefined);
  const router = useRouter();
  const genres = useGenres(genre_ids);

  const watchMovie = () => {
    router.push(`/movie/6429c8a0d2befeca1105a431`);
  };

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal({ id, tvShow }));
  };

  const handleFavorite = () => {
    dispatch(
      addFavorite({ id, backdrop_path, genre_ids, title, isTvShow: tvShow })
    );
  };

  const handleRemoveFavorite = () => {
    dispatch(removeFavorite(id));
  };

  const favorite = useSelector(selectFavorite);

  const FavoriteMovie = favorite[id] !== undefined;

  useEffect(() => {
    const isMovieFavorite = (id: string) => {
      const favorites = JSON.parse(localStorage.getItem('favorite') || '{}');
      return Boolean(favorites[id]);
    };
    setIsFavorite(isMovieFavorite(id));
  }, [FavoriteMovie]);

  return (
    <div
      className={`group w-[200px]  cursor-pointer inline-block relative p-2 h-[130px] ${
        modal ? 'md:w-[270px] md:h-[170px]' : 'mt-36 md:w-[300px] md:h-[200px]'
      }`}
    >
      <Image
        src={`${
          backdrop_path !== null
            ? `https://image.tmdb.org/t/p/w500/${backdrop_path}`
            : '/images/no-image.jpg'
        }`}
        alt='Movie'
        width={300}
        height={300}
        draggable={false}
        className='cursor-pointer h-full object-cover transition duration shadow-xl rounded-md delay-300 '
      />
      <div className='opacity-0 absolute top-0 transition duration-400 z-10 invisible group-hover:visible delay-300 scale-0 group-hover:scale-110 group-hover:-translate-y-10 group-hover:opacity-100 '>
        <Image
          width={300}
          height={300}
          draggable={false}
          src={`${
            backdrop_path !== null
              ? `https://image.tmdb.org/t/p/w500/${backdrop_path}`
              : '/images/no-image.jpg'
          }`}
          alt='Movie'
          className=' cursor-pointer h-full object-cover transition duration shadow-xl rounded-t-md '
        />
        <div className='z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md '>
          <div className='flex flex-row items-center gap-2'>
            <button
              onClick={watchMovie}
              className='cursor-pointer w-6 h-6 lg:w-9 lg:h-9 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300'
            >
              <MdPlayArrow size={25} className='text-black w-6 lg:w-10' />
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
            <button
              onClick={handleOpenModal}
              className='cursor-pointer ml-auto group/item w-6 h-6 lg:w-9 lg:h-9 border-white border rounded-full flex justify-center items-center transition hover:border-neutral-500'
            >
              <AiFillDownCircle className='text-white group-hover/item:text-neutral-500 w-3 lg:w-4' />
            </button>
          </div>
          <div>
            <p className='text-white text-sm font-bold mt-3'>{title}</p>
          </div>
          <div>
            <p className='mt-2 text-white text-xs lg:text-sm'>{genres}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
