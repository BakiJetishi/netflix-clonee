import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';

interface ProfileCardProps {
  data: { id?: string; name?: string }[];
  manageProfiles: boolean;
  onEdit: (profileId: string) => void;
  onHome: () => void;
}

const ProfileCard = ({
  data,
  manageProfiles,
  onEdit,
  onHome,
}: ProfileCardProps) => {
  const handleClick = (id: any) => {
    onEdit(id);
  };

  return (
    <>
      {data?.map((e) => {
        if (!e.id) return null; // if id doesn't exist, don't render this profile

        return (
          <button
            key={e.id}
            onClick={manageProfiles ? () => handleClick(e.id) : onHome}
          >
            <div className='group w-44 mx-auto'>
              <div className='w-44 h-44 rounded-md flex relative items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden'>
                <Image
                  width={500}
                  height={500}
                  className={`w-max h-max object-contain ${
                    manageProfiles ? 'brightness-75' : ''
                  }`}
                  src='/images/default-blue.png'
                  alt='Logo'
                />
                {manageProfiles && (
                  <div className='absolute top-1/2 left-1/2 -translate-x-1/2 text-white border border-white p-2 rounded-full -translate-y-1/2'>
                    <AiOutlineEdit size={25} />
                  </div>
                )}
              </div>
              <div className='mt-4 text-gray-400 text-2xl text-center group-hover:text-white'>
                {e?.name}
              </div>
            </div>
          </button>
        );
      })}
    </>
  );
};

export default ProfileCard;
