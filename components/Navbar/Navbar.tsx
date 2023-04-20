import React, { useCallback, useEffect, useState } from 'react';
import { BsFillBellFill, BsArrowDownShort, BsSearch } from 'react-icons/bs';
import ShowMenu from './ShowMenu';
import AccountMenu from './AccountMenu';
import Link from 'next/link';
import Search from './Search';
import Links from './Links';
import Image from 'next/image';

const Navbar = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [toggleBackground, setToggleBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 50) {
        setToggleBackground(true);
      } else {
        setToggleBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  return (
    <nav className='w-full fixed z-40'>
      <div
        className={`flex flex-row items-center transition duration-500 px-4 py-6 md:px-14 ${
          toggleBackground ? 'bg-gray-800 bg-opacity-90' : ''
        }`}
      >
        <Image
          width={120}
          height={32}
          src='/images/logo.png'
          className='h-5 w-24 lg:w-28 lg:h-8'
          alt='Logo'
        />
        <div className='flex-row ml-8 hidden lg:flex'>
          <Links />
        </div>
        <div
          onClick={toggleMobileMenu}
          className='lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative'
        >
          <p className='text-white text-sm font-semibold'>Browse</p>
          <BsArrowDownShort
            className={`w-4 text-white fill-white transition ${
              showMobileMenu ? 'rotate-180' : 'rotate-0'
            }`}
          />
          <ShowMenu show={showMobileMenu} />
        </div>
        <div className='flex flex-row ml-auto gap-3 items-center'>
          <Search />
          <div>
            <Link href='#' className='text-white text-sm md:text-lg'>
              Kids
            </Link>
          </div>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
            <BsFillBellFill className='w-6' />
          </div>
          <div
            onClick={toggleAccountMenu}
            className='flex flex-row items-center gap-1 cursor-pointer relative'
          >
            <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
              <Image
                width={40}
                height={40}
                src='/images/default-blue.png'
                alt=''
              />
            </div>
            <BsArrowDownShort
              size={20}
              className={` text-white fill-white transition ${
                showAccountMenu ? 'rotate-180' : 'rotate-0'
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
