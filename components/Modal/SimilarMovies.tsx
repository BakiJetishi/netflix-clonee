import React, { useState, useEffect } from 'react';
import MovieCard from '../MoviesList/MovieCard';
import { AiOutlineDown } from 'react-icons/ai';

interface SimilarMoviesProps {
  movieId: any;
}

const SimilarMovies = ({ movieId }: SimilarMoviesProps) => {
  const [similarMovieData, setSimilarMovieData] = useState<any>(null);
  const [page, setPage] = useState<number>(1);

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    async function fetchSimilarMovieData() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (page > 1) {
          setSimilarMovieData((prevData: any) => [
            ...prevData,
            ...data.results,
          ]);
        } else {
          setSimilarMovieData(data.results);
        }
      } catch (error) {
        console.error('Error fetching data:' + error);
      }
    }

    if (movieId && page) {
      fetchSimilarMovieData();
    }
  }, [movieId, page]);

  return (
    <>
      {similarMovieData && similarMovieData.length !== 0 && (
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-2xl text-white font-bold self-start mt-4 sm:mt-16 mb-5'>
            More Like This
          </h1>

          <div className='flex flex-wrap justify-center'>
            {similarMovieData?.map((movie: any) => (
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
          <div className='w-full text-center mt-5 '>
            <button
              className='text-xl p-4 hover:border-gray-300/40  bg-transparent border border-white text-white rounded-full'
              onClick={handleShowMore}
            >
              <AiOutlineDown />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SimilarMovies;
