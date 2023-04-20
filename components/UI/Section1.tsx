import Image from 'next/image';
import React from 'react';

function Section1() {
  return (
    <>
      <section className='h-full p-4 bg-transparent'>
        <div className=' flex justify-between items-center flex-col lg:flex-row h-full lg:w-[90%] mx-auto'>
          <div className='flex lg:justify-center flex-col gap-5 h-full text-left w-full mx-auto py-5'>
            <h1 className='text-white text-4xl lg:text-5xl font-bold'>
              Enjoy on your TV.
            </h1>
            <p className='text-white text-md w-full md:text-xl'>
              Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV,
              Blu-ray players, and more.
            </p>
          </div>
          <div className='lg:w-[1300px]'>
            <Image
              alt=''
              width={1300}
              height={1300}
              src='/images/section1.png'
            />
          </div>
        </div>
      </section>
      <div className='border-b-8 border-gray-700/50 w-[90%] mx-auto'></div>
    </>
  );
}

export default Section1;
