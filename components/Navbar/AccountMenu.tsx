import { signOut } from 'next-auth/react';
import React from 'react';
import useSwr from 'swr';
import fetcher from '@/lib/fetcher';
import Link from 'next/link';
import { FaEdit } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
import { FiHelpCircle } from 'react-icons/fi';
import Image from 'next/image';

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu = ({ visible }: AccountMenuProps) => {
  const { data } = useSwr('/api/currentUser', fetcher);

  if (!visible) {
    return null;
  }

  return (
    <div className='bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex'>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-row gap-3 items-center px-3 '>
          <Image
            width={32}
            height={32}
            className='w-8 rounded-md'
            src='/images/default-blue.png'
            alt=''
          />
          <p className='text-white text-sm hover:text-gray-300'>{data?.name}</p>
        </div>
      </div>
      <div className='flex flex-col mt-4 gap-2'>
        <Link
          href='profiles'
          className='px-3 flex items-center gap-2 text-white text-md hover:text-gray-300 '
        >
          <FaEdit />
          Manage Profiles
        </Link>
        <Link
          href='/account'
          className='px-3 flex items-center gap-2 text-white text-md hover:text-gray-300'
        >
          <MdAccountCircle />
          Account
        </Link>
        <Link
          href='#'
          className='px-3 flex items-center gap-2 text-white text-md hover:text-gray-300'
        >
          <FiHelpCircle />
          Help Center
        </Link>
        <hr className='bg-gray-600 border-0 h-px my-4' />
        <div
          onClick={() => signOut()}
          className='text-center text-white text-md hover:underline'
        >
          <Link href='#' className='  hover:text-gray-300'>
            Sign out of Netflix
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
