import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-gray-900/50'>
      <div className='mx-auto w-full md:w-2/3 p-10'>
        <div className='grid grid-cols-2 px-4 gap-5 py-6 lg:py-8 md:grid-cols-3'>
          <div>
            <ul className='text-white  font-xs'>
              <li className='mb-4'>
                <a href='#' className=' underline'>
                  FAQ
                </a>
              </li>
              <li className='mb-4'>
                <a href='#' className='underline'>
                  Media Center
                </a>
              </li>
              <li className='mb-4'>
                <a href='#' className='underline'>
                  Ways to Watch
                </a>
              </li>
              <li className='mb-4'>
                <a href='#' className='underline'>
                  Cookie Preferences
                </a>
              </li>
              <li className='mb-4'>
                <a href='#' className='underline'>
                  Speed Test
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2></h2>
            <ul className='text-white font-xs'>
              <li className='mb-4'>
                <a href='#' className='underline'>
                  Help Center
                </a>
              </li>
              <li className='mb-4'>
                <a href='#' className='underline'>
                  Investor Relations
                </a>
              </li>
              <li className='mb-4'>
                <a href='#' className='underline'>
                  Terms of Use
                </a>
              </li>
              <li className='mb-4'>
                <a href='#' className='underline'>
                  Corporate Information
                </a>
              </li>
              <li className='mb-4'>
                <a href='#' className='underline'>
                  Legal Notices
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2></h2>
            <ul className='text-white font-xs'>
              <li className='mb-4'>
                <a href='#' className='underline'>
                  Account
                </a>
              </li>
              <li className='mb-4'>
                <a href='#' className='underline'>
                  Jobs
                </a>
              </li>
              <li className='mb-4'>
                <a href='#' className='underline'>
                  Privacy
                </a>
              </li>
              <li className='mb-4'>
                <a href='#' className='underline'>
                  Contact Us
                </a>
              </li>
              <li className='mb-4'>
                <a href='#' className='underline'>
                  Only on Netflix
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
