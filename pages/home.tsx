import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Movies from '@/components/MoviesList/Movies';
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import Billboard from '@/components/Billboard';
import InfoModal from '@/components/Modal/InfoModal';
import { selectModal } from '@/store/ModalSlice';
import { SelectSearch } from '@/store/SearchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/store/ModalSlice';
import SearchMovie from '@/components/MoviesList/SearchMovie';
import axios from 'axios';

interface HomeProps {
  data: [];
  data2: [];
  data3: [];
}

const Home = ({ data, data2, data3 }: HomeProps) => {
  const dispatch = useDispatch();
  const infoModal = useSelector(selectModal);
  const searchResults = useSelector(SelectSearch);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <div className='min-h-screen bg-black'>
      {infoModal.isOpen && (
        <InfoModal visible={infoModal.isOpen} onClose={handleCloseModal} />
      )}
      <Navbar />
      {searchResults.query !== '' && <SearchMovie />}
      {searchResults.query === '' && (
        <>
          <Billboard />
          <Movies data={data} data2={data2} data3={data3} />
        </>
      )}
    </div>
  );
};

export default Home;

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

  const data = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
  );
  const data2 = await axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
  );

  const data3 = await axios.get(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
  );

  return {
    props: {
      data: data.data.results,
      data2: data2.data.results,
      data3: data3.data.results,
    },
  };
}
