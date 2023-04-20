import React, { useRef, useState, useEffect } from 'react';
import { getSession, useSession } from 'next-auth/react';
import { AiOutlineEdit } from 'react-icons/ai';
import Button from './Button';
import axios from 'axios';
import { NextPageContext } from 'next';
import Loading from '../LoadingSpinner/Loading';
import Image from 'next/image';

interface ManageProfileProps {
  onSave: () => void;
  onCancel: () => void;
  profileData: any;
}

const ManageProfile = ({
  onSave,
  onCancel,
  profileData,
}: ManageProfileProps) => {
  const NameInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [deleteProfile, setDeleteProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profileData) {
      setName(profileData.name);
    }
  }, [profileData]);

  const handleManageProfile = async (e: any) => {
    e.preventDefault();

    try {
      if (deleteProfile) {
        setIsLoading((e) => !e);
        await axios.delete(`/api/profiles/delete`, {
          data: {
            id: profileData.id,
          },
        });
      } else if (profileData) {
        setIsLoading((e) => !e);
        await axios.put(`/api/profiles/update`, {
          name,
          profileId: profileData.id,
          userId: session?.user?.id,
        });
      } else {
        setIsLoading((e) => !e);
        await axios.post('/api/profiles/create', {
          userId: session?.user?.id,
          name,
        });
      }
    } catch (error) {}

    onSave();
  };

  if (isLoading) {
    return (
      <div className='bg-black h-screen w-screen flex justify-center items-center pb-[264px] pr-[264px]'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='flex bg-black flex-col justify-center h-screen  items-center gap-3'>
      <h1 className='text-center text-2xl md:text-5xl text-white'>
        {name ? 'Edit Profile' : 'Create Profile'}
      </h1>
      <form
        className='flex items-center justify-center flex-col gap-2'
        onSubmit={handleManageProfile}
      >
        <div className='w-44 h-44 rounded-md flex relative hover:cursor-pointer justify-center border-2 border-transparent hover:border-white overflow-hidden'>
          <Image
            width={300}
            height={300}
            className='w-max brightness-75 h-max object-contain'
            src='/images/default-blue.png'
            alt='Logo'
          />
          <div className='absolute bottom-3 bg-black left-3 text-white border border-white p-2 rounded-full'>
            <AiOutlineEdit size={20} />
          </div>
        </div>
        <div className='mt-4 text-gray-400 text-2xl text-center group-hover:text-white'>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='bg-transparent border border-gray-200 py-1 px-3'
            placeholder='Display name'
            ref={NameInputRef}
          />
        </div>
        <div className='flex gap-2 rounded-lg mt-2'>
          <Button text={'Save'} />
          <Button onClick={onCancel} text={'Cancel'} />
          {profileData && (
            <Button
              onClick={() => setDeleteProfile(true)}
              text={'Delete Profile'}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default ManageProfile;
