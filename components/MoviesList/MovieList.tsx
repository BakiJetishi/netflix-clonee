import React from 'react';
import MovieCard from '@/components/MoviesList/MovieCard';
import Scrollable from './Scrollable';

export interface MovieCardProps {
  id: string;
  backdrop_path: string;
  genre_ids: number[];
  title: string;
  modal?: boolean;
  tvShow?: boolean;
  isTvShow?: boolean;
}

interface MovieListProps {
  data: MovieCardProps[];
  title: string;
  rowID: string;
  tvShow?: boolean;
}

const MovieList = ({ data, title, rowID, tvShow }: MovieListProps) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className='px-4 md:px-12 space-y-8 relative -mt-10'>
      <div>
        <p className='text-white text-md md:text-xl lg:text-2xl font-semibold -mb-20'>
          {title}
        </p>
        <div className='relative flex items-center '>
          <Scrollable rowID={rowID}>
            {data.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                backdrop_path={movie.backdrop_path}
                genre_ids={movie.genre_ids}
                title={!tvShow ? movie.title : (movie as any).name}
                tvShow={movie.isTvShow ? true : tvShow}
              />
            ))}
          </Scrollable>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
