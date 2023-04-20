import Image from 'next/image';
import React from 'react';

function Section4() {
  return (
    <section className='h-full p-4 bg-transparent'>
      <div className=' flex justify-between items-center flex-col lg:flex-row h-full lg:w-[90%] mx-auto'>
        <div className='flex justify-center flex-col gap-5 h-full text-center lg:text-left lg:w-full mx-auto py-5'>
          <h1 className='text-white text-4xl md:text-5xl font-bold'>
            Download your shows to watch offline.
          </h1>
          <p className='text-white text-md w-full md:text-xl lg:w-3/4'>
            Save your favorites easily and always have something to watch.
          </p>
        </div>
        <div className='flex items-center relative lg:w-[1300px]'>
          <Image
            width={1300}
            height={1300}
            alt=''
            src='/images/section4.png'
            className='z-10'
          />
          <div className='absolute lg:w-[440px] lg:left-[17%] left-[20%] top-[14%] w-[60%] h-[70%] lg:h-[50%]'>
            <video autoPlay muted loop src='/videos/video-devices.m4v'></video>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section4;
