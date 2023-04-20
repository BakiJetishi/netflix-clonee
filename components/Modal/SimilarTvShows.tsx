import React, { useState, useEffect } from 'react';

interface SimilarTvShowsProps {
  movieId: any;
  seasons: [];
}

function toRoman(num: number) {
  let result = '';

  switch (num) {
    case 1:
      result += 'I';
      break;
    case 2:
      result += 'II';
      break;
    case 3:
      result += 'III';
      break;
    case 4:
      result += 'IV';
      break;
    case 5:
      result += 'V';
      break;
    case 6:
      result += 'VI';
      break;
    case 7:
      result += 'VII';
      break;
    case 8:
      result += 'VIII';
      break;
    case 9:
      result += 'IX';
      break;
    case 10:
      result += 'X';
      break;
    default:
      result += num;
      break;
  }

  return result;
}

const SimilarTvShows = ({ movieId, seasons }: SimilarTvShowsProps) => {
  const [similarTvShowsData, setSimilarTvShows] = useState<any>(null);
  const [selectedSeason, setSelectedSeason] = useState<any>(1);

  useEffect(() => {
    async function fetchSimilarTvShows() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${movieId}/season/${selectedSeason}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        setSimilarTvShows(data.episodes);
      } catch (error) {
        console.error('Error fetching data:' + error);
      }
    }

    if (movieId && selectedSeason) {
      fetchSimilarTvShows();
    }
  }, [movieId, selectedSeason]);

  return (
    <>
      {similarTvShowsData && (
        <div className='flex flex-col justify-center items-center'>
          <div className='flex justify-between w-full'>
            <h1 className='text-xl md:text-2xl text-white font-bold self-start mt-7 sm:mt-20 mb-5'>
              Episodes
            </h1>
            <select
              onChange={(e) => setSelectedSeason(e.target.value)}
              className='h-10 w-36 sm:w-48 self-end rounded-sm mb-4 bg-transparent ring-1 ring-gray-500 text-gray-300 px-3'
              value={selectedSeason}
            >
              {seasons?.map((season: any) => (
                <option
                  key={season.id}
                  value={season.season_number}
                  className='bg-gray-950 p-2'
                >
                  {season.name}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col'>
            {similarTvShowsData?.map((data: any, index: any) => (
              <div
                className={`flex flex-col sm:flex-row items-center gap-4 p-10 hover:bg-gray-700/30 cursor-pointer ${
                  index === 0 ? 'bg-gray-700/30' : ''
                }`}
                key={data.id}
              >
                <span className='text-gray-400 pr-2 flex items-center text-2xl'>
                  {data.episode_number}
                </span>
                <div className=''>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${data.still_path}`}
                    className='h-full object-cover w-52'
                  />
                </div>
                <div className='-mt-2 relative w-full sm:w-[70%]'>
                  <h2 className='text-gray-50 mb-2 text-xl'>
                    Part {toRoman(data.episode_number)}
                  </h2>
                  <p className='text-gray-400 text-md'>
                    {data.overview.length > 150
                      ? data.overview.slice(0, 150) + '...'
                      : data.overview}
                  </p>
                  <span className='absolute top-0 right-0 text-gray-400 '>
                    {data.runtime}m
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SimilarTvShows;
