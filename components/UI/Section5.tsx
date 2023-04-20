import React from 'react';
import Button from './Button';
import Link from 'next/link';
import Input from '../Input';

function Section5() {
  return (
    <section className='bg-gray-900/50 p-4 py-20'>
      <div className='flex flex-col gap-2 h-full items-center'>
        <h1 className='font-bold text-5xl mb-5 text-white'>
          Frequently Asked Questions
        </h1>
        <Button
          title='What is Netflix?'
          info={`Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.

            You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!`}
        />
        <Button
          title='How much does Netflix cost?'
          info={`Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from EUR4.99 to EUR9.99 a month. No extra costs, no contracts.`}
        />
        <Button
          title='Where can I watch?'
          info={`Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.

            You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.`}
        />
        <Button
          title='How do I cancel?'
          info={`Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.`}
        />
        <Button
          title='What can I watch on Netflix?'
          info={`Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.`}
        />
        <Button
          title='Is Netflix good for kids?'
          info={`The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.

            Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.`}
        />
      </div>
      <div className='flex w-full text-center justify-center mt-10 flex-col'>
        <h1 className='text-white text-2xl'>
          Ready to watch? Enter your email to create or restart your membership.
        </h1>
        <div className='flex flex-col md:flex-row gap-2 items-center justify-center mt-5'>
          <Input
            id='bg-input'
            onChange={() => {}}
            onBlur={() => {}}
            type='text'
            label='Email Address'
            className='w-[300px] md:w-[400px] bg-opacity-60 bg-zinc-900 border border-gray-500'
          />
          <Link
            href='/auth'
            className='bg-red-500 py-3 rounded-md px-5 md:px-8 text-white font-bold text-md md:text-xl'
          >
            Get Started &gt;
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Section5;
