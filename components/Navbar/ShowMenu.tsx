import React from 'react';
import Link from 'next/link';
import Links from './Links';

interface ShowMenuProps {
  show?: boolean;
}

const ShowMenu: React.FC<ShowMenuProps> = ({ show }) => {
  if (!show) {
    return null;
  }

  return (
    <div className='bg-black flex flex-col w-56 absolute left-0 top-7 py-5 border-2 border-gray-700'>
      <div className='flex flex-col gap-4'>
        <Links />
      </div>
    </div>
  );
};

export default ShowMenu;
