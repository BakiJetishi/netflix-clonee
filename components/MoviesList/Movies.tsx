import React, { useEffect, useState } from 'react';
import MovieList, { MovieCardProps } from '@/components/MoviesList/MovieList';
import { useSelector } from 'react-redux';
import { selectFavorite } from '@/store/FavoriteSlice';

interface MovieProps {
  data: [];
  data2: [];
  data3: [];
}

const Movies = ({ data, data2, data3 }: MovieProps) => {
  const [favorite, setFavorite] = useState({});

  const Favorites = useSelector(selectFavorite);

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('favorite') || '[]');
    setFavorite(movies);
  }, [Favorites]);

  const favoriteMoviesArray = Object?.values(favorite);

  return (
    <>
      <MovieList
        title='My List'
        rowID='2'
        data={favoriteMoviesArray as MovieCardProps[]}
      />
      <MovieList title='Trending Now' rowID='1' data={data} />
      <MovieList title='Top Rated' rowID='2' data={data2} />
      <MovieList title='TV Shows' rowID='2' data={data3} tvShow={true} />
    </>
  );
};

export default Movies;
