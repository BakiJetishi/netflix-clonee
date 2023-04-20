import Image from 'next/image';
import React from 'react';

function Section2() {
  return (
    <>
      <section className='h-full p-4 bg-transparent'>
        <div className=' flex justify-between items-center flex-col-reverse lg:flex-row h-full lg:w-[90%] mx-auto'>
          <Image width={1300} height={1300} src='/images/section2.png' alt='' />
          <div className='flex justify-between flex-col gap-5 h-full text-center lg:text-left lg:w-full mx-auto py-5'>
            <h1 className='text-white text-2xl lg:text-5xl font-bold'>
              Watch everywhere.
            </h1>
            <p className='text-white text-md w-full md:text-xl lg:w-3/4'>
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV without paying more.
            </p>
          </div>
        </div>
      </section>
      <div className='border-b-8 border-gray-700/50 w-[90%] mx-auto'></div>
    </>
  );
}

export default Section2;
