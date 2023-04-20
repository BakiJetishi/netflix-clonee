import React, { useEffect, useState } from 'react';
import SimilarMovies from './SimilarMovies';
import { useSelector } from 'react-redux';
import { selectModal } from '@/store/ModalSlice';
import MovieInfos from './MovieInfos';
import Movie from './Movie';
import axios from 'axios';
import SimilarTvShows from './SimilarTvShows';

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

const InfoModal = ({ visible, onClose }: InfoModalProps) => {
  const [data, setData] = useState<any>(null);

  const infoModal = useSelector(selectModal);
  const movieId = infoModal?.movieId;
  const isTvShow = infoModal?.tvShow;

  useEffect(() => {
    async function fetchData() {
      try {
        let data;
        if (!isTvShow) {
          data = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
          );
        }

        if (isTvShow) {
          data = await axios.get(
            `https://api.themoviedb.org/3/tv/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
          );
        }

        if (data?.status !== 200) {
          throw new Error('Network response was not ok');
        }

        setData(data.data);
      } catch (error) {
        console.error('Error fetching data:' + error);
      }
    }

    if (movieId) {
      fetchData();
    }
  }, [movieId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | null) => {
      if (event?.target) {
        const targetElement = event.target as Element;
        if (visible && !targetElement.closest('.modal')) {
          onClose();
        }
      }
    };

    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible, onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div className='z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center fixed inset-0'>
      <div className='relative h-screen lg:mt-32 lg:pb-32 modal w-auto mx-auto max-w-4xl rounded-md overflow-x-hidden overflow-y-auto scrollbar-hide'>
        <div
          className={`${
            visible ? 'scale-100' : 'scale-0'
          } transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
        >
          <Movie data={data} onClose={onClose} />
          <div className='px-10 py-8'>
            <MovieInfos data={data} />
            {!isTvShow && <SimilarMovies movieId={movieId} />}
            {isTvShow && (
              <SimilarTvShows movieId={movieId} seasons={data?.seasons} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
