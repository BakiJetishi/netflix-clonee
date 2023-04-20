import React from 'react';
import Input from '../Input';
import Link from 'next/link';

function Hero() {
  return (
    <section className='bg-gradient-from-image bg-no-repeat bg-cover relative px-5 py-16 md:p-14 lg:h-[83vh] mb-7 rounded-3xl'>
      <div className='flex  flex-col justify-center gap-7 lg:p-20'>
        <h1 className='text-white font-bold text-3xl md:text-5xl lg:w-[70%] lg:text-8xl'>
          Unlimited movies, TV shows, and more.
        </h1>
        <p className='text-white text-lg font-semibold md:text-xl lg:text-3xl mb-3'>
          Plans now start at EUR4.99/month.
        </p>
        <p className='text-white text-md w-2/3 md:text-xl lg:text-3xl'>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div className='flex flex-col md:flex-row gap-2'>
          <Input
            id='bg-input'
            onChange={() => {}}
            onBlur={() => {}}
            type='text'
            label='Email Address'
            className='w-[200px] md:w-[300px] bg-opacity-60 bg-zinc-900 border border-gray-500'
          />
          <Link
            href='/auth'
            className='bg-red-500 py-3 w-[170px] lg:w-[195px] rounded-md px-5 md:px-8 text-white font-bold text-md lg:text-xl'
          >
            Get Started &gt;
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
