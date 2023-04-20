import React, { useState } from 'react';

interface InputProps {
  title: string;
  info: string;
}

const Button = ({ title, info }: InputProps) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className='w-full lg:w-4/5'>
      <button
        onClick={() => {
          setShowInfo((e) => !e);
        }}
        className='text-white w-full bg-blue-950/50 hover:bg-blue-900/50 p-5 text-2xl flex relative z-10 items-center justify-between'
      >
        <span>{title}</span>
        <span className='text-5xl'>+</span>
      </button>
      {showInfo && (
        <p
          className={`text-white w-full bg-blue-950/50 p-5 text-lg mt-[2px] transition-all duration-300 transform ${
            showInfo ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
          }`}
        >
          {info}
        </p>
      )}
    </div>
  );
};

export default Button;
