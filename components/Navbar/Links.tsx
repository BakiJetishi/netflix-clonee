import Link from 'next/link';
import React from 'react';

function Links() {
  return (
    <>
      <Link
        href='/home'
        className='px-3 text-white font-semibold hover:text-gray-400'
      >
        Home
      </Link>
      <Link
        href='#'
        className='px-3 text-white font-semibold hover:text-gray-400'
      >
        TV Shows
      </Link>
      <Link
        href='#'
        className='px-3 text-white font-semibold hover:text-gray-400'
      >
        Movies
      </Link>
      <Link
        href='#'
        className='px-3 text-white font-semibold hover:text-gray-400'
      >
        New & Popular
      </Link>
      <Link
        href='/mylist'
        className='px-3 text-white font-semibold hover:text-gray-400'
      >
        My List
      </Link>
      <Link
        href='#'
        className='px-3 text-white font-semibold hover:text-gray-400'
      >
        Browse by Language
      </Link>
    </>
  );
}

export default Links;
