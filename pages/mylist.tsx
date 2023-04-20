import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';

import { useSelector } from 'react-redux';
import { selectModal } from '@/store/ModalSlice';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/store/ModalSlice';
import { selectFavorite } from '@/store/FavoriteSlice';
import MovieCard from '@/components/MoviesList/MovieCard';
import InfoModal from '@/components/Modal/InfoModal';

const MyList = () => {
  const [favorite, setFavorite] = useState({});

  const dispatch = useDispatch();
  const infoModal = useSelector(selectModal);
  const Favorites = useSelector(selectFavorite);

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('favorite') || '[]');
    setFavorite(movies);
  }, [Favorites]);

  const favoriteMoviesArray = Object?.values(favorite);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <div className=' bg-black min-h-screen'>
      {infoModal.isOpen && (
        <InfoModal visible={infoModal.isOpen} onClose={handleCloseModal} />
      )}
      <Navbar />
      <div className='px-10 py-32'>
        <h1 className='text-white text-center text-3xl mb-3'>My List</h1>
        <div className='flex flex-wrap justify-center'>
          {favoriteMoviesArray?.map((movie: any) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              backdrop_path={movie.backdrop_path}
              genre_ids={movie.genre_ids}
              title={movie.title}
              modal={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default MyList;
