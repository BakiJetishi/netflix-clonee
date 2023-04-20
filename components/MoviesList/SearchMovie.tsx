import React from 'react';
import MovieCard from './MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { SelectSearch, searchMovies, setPage } from '@/store/SearchSlice';
import { AppDispatch } from '@/store/store';

function SearchMovie() {
  const searchResults = useSelector(SelectSearch);
  const searchMovie = searchResults.results || [];
  const dispatch = useDispatch<AppDispatch>();
  const { query, results, status, error, page } = useSelector(SelectSearch);

  const handleShowMore = () => {
    dispatch(setPage());
    dispatch(searchMovies({ query, page }));
  };

  if (searchResults.status == 'loading' && searchResults.page === 1) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <h1 className='text-white text-3xl'>Loading...</h1>
      </div>
    );
  }

  if (searchResults.status == 'failed') {
    return (
      <div className='flex justify-center items-center h-screen'>
        <h1 className='text-white text-3xl'>{searchResults.error}</h1>
      </div>
    );
  }

  if (searchMovie.length === 0 && searchResults.status == 'succeeded') {
    return (
      <div className='flex justify-center items-center h-screen'>
        <h1 className='text-white text-3xl'>No Movies Founded!</h1>
      </div>
    );
  }

  return (
    <div>
      <div className='flex flex-wrap pt-40 px-4 justify-center'>
        {searchMovie.map((movie: any) => (
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
      <div className='w-full text-center mt-5 pb-10'>
        <button
          className='text-xl px-6 py-3 bg-white rounded-md'
          onClick={handleShowMore}
        >
          Show More!
        </button>
      </div>
    </div>
  );
}

export default SearchMovie;
