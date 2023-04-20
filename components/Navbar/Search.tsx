import React, { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { searchMovies, setQuery } from '@/store/SearchSlice';
import { AppDispatch } from '@/store/store';

function Search() {
  const [input, setInput] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setQuery(searchTerm));
      if (searchTerm.trim()) {
        dispatch(searchMovies({ query: searchTerm, page: 1 }));
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, dispatch]);

  const handleChange = (event: any) => {
    const query = event.target.value;
    setSearchTerm(query);
  };

  const handleClose = () => {
    setInput((e) => !e);
    setSearchTerm('');
    dispatch(setQuery(''));
  };

  return (
    <div className='text-gray-200 flex items-center hover:text-gray-300 cursor-pointer relative'>
      <BsSearch
        className={`w-6 absolute z-50 ${input ? 'left-2' : 'right-1'}`}
        onClick={() => setInput((e) => !e)}
      />
      <input
        type='text'
        placeholder='Titles, people, genres'
        value={searchTerm}
        onChange={handleChange}
        className={`bg-black border px-9 py-1 border-white w-60 transition-all duration-300 ease-in-out ${
          input ? '' : 'translate-x-full -z-10 opacity-0 hidden md:block'
        }`}
      />
      <AiOutlineClose
        size={20}
        className={`absolute right-2 ${
          input ? '' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />
    </div>
  );
}

export default Search;
