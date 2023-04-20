import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <button
      type='submit'
      onClick={onClick}
      className='px-6 rounded-sm hover:opacity-70 py-2 text-sm md:text-md bg-transparent border border-gray-500 text-gray-500 uppercase'
    >
      {text}
    </button>
  );
};

export default Button;
