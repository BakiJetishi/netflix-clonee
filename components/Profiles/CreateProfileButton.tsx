import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
interface ButtonProps {
  onClick: () => void;
  text: string;
}

const CreateProfileButton = ({ onClick, text }: ButtonProps) => {
  return (
    <button onClick={onClick}>
      <div className='group flex-row w-44 mx-auto '>
        <div className='w-44 h-44 rounded-md flex relative items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden'>
          <div className='absolute top-1/2 left-1/2 bg-gray-800 -translate-x-1/2 text-white p-2 rounded-full -translate-y-1/2'>
            <AiOutlinePlus size={65} />
          </div>
        </div>
        <div className='mt-4 text-gray-400 text-2xl text-center group-hover:text-white'>
          {text}
        </div>
      </div>
    </button>
  );
};

export default CreateProfileButton;
