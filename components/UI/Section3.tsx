import Image from 'next/image';
import React from 'react';

function Section3() {
  return (
    <>
      <section className='h-full p-4 bg-transparent'>
        <div className=' flex justify-between items-center flex-col-reverse gap-10 lg:flex-row h-full lg:w-[90%] mx-auto'>
          <Image width={1300} height={1300} src='/images/section3.png' alt='' />
          <div className='flex justify-center flex-col gap-5 h-full text-center lg:text-left lg:w-full mx-auto py-5'>
            <h1 className='text-white text-2xl lg:text-5xl font-bold'>
              Create profiles for kids.
            </h1>
            <p className='text-white text-md w-full md:text-xl lg:w-3/4'>
              Send kids on adventures with their favorite characters in a space
              made just for them—free with your membership.
            </p>
          </div>
        </div>
      </section>
      <div className='border-b-8 border-gray-700/50 w-[90%] mx-auto'></div>
    </>
  );
}

export default Section3;
