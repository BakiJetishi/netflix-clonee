import React, { useState, useEffect } from 'react';
import useSwr from 'swr';
import fetcher from '@/lib/fetcher';
import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import { AiOutlineArrowLeft } from 'react-icons/ai';

function Account() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [variant, setVariant] = useState('Profile');
  const [error, setError] = useState('');
  const router = useRouter();
  const { data } = useSwr('/api/currentUser', fetcher);
  const userId = data?.id;

  useEffect(() => {
    if (data) {
      setName(data.name);
      setEmail(data.email);
    }
  }, [data]);

  const handleProfile = async (e: any) => {
    e.preventDefault();

    if (email === data.email && name === data.name) {
      setError('Email address and name are the same');
      return;
    }

    try {
      const response = await axios.put('/api/user/update', {
        userId,
        name,
        email,
      });

      if (response.status === 200) {
        setName(response.data.name);
        setEmail(response.data.email);
        router.push('/home');
      }

      if (email !== data.email) {
        signOut();
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSecurity = async (e: any) => {
    e.preventDefault();

    if (
      newPassword === oldPassword &&
      newPassword !== '' &&
      oldPassword !== ''
    ) {
      setError('New password cannot be the same as old password');
      return;
    }

    try {
      const response = await axios.put('/api/user/newpassword', {
        oldPassword,
        newPassword,
      });

      if (response.status === 200) {
        router.push('/home');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className='bg-white md:bg-gray-950 min-h-screen py-24 relative'>
      <div className='absolute top-5 md:top-10 left-3 p-4 z-50 '>
        <AiOutlineArrowLeft
          onClick={() => router.push('/home')}
          className='w-10 md:w-52 h-10 md:h-14 text-black md:text-white cursor-pointer hover:opacity-80 transition'
        />
      </div>

      <div className='container mx-auto max-w-xl'>
        <div className='w-full mt-2 bg-white rounded-lg mx-auto overflow-hidden rounded-b-none'>
          <ul className='flex border-b border-gray-300 text-sm font-medium text-gray-600 mt-3 px-10'>
            <li className='mr-8 text-gray-900'>
              <button
                onClick={() => {
                  setVariant('Profile');
                  setError('');
                }}
                className='py-4 inline-block'
              >
                Profile Info
              </button>
            </li>
            <li className='mr-8 hover:text-gray-900'>
              <button
                onClick={() => {
                  setVariant('Security');
                  setError('');
                }}
                className='py-4 inline-block'
              >
                Security
              </button>
            </li>
          </ul>
          <p className='text-red-500 text-md mt-4 ml-16 -mb-4'>{error}</p>
          <form
            onSubmit={variant == 'Profile' ? handleProfile : handleSecurity}
          >
            <div className='flex '>
              <div className='flex flex-col gap-5 w-full'>
                {variant == 'Profile' && (
                  <>
                    <div className='pt-8 px-16'>
                      <label htmlFor='name' className='text-sm text-gray-600'>
                        Name
                      </label>
                      <input
                        className='mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500'
                        type='text'
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className='pb-8 px-16'>
                      <label htmlFor='email' className='text-sm text-gray-600'>
                        Email Address
                      </label>
                      <input
                        className='mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500'
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </>
                )}
                {variant == 'Security' && (
                  <>
                    <div className='pt-8 px-16'>
                      <label
                        htmlFor='oldpassword'
                        className='text-sm text-gray-600'
                      >
                        Old Password
                      </label>
                      <input
                        className='mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500'
                        type='password'
                        name='oldpassword'
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>
                    <div className='pb-8 px-16'>
                      <label
                        htmlFor='password'
                        className='text-sm text-gray-600'
                      >
                        New Password
                      </label>
                      <input
                        className='mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500'
                        type='password'
                        name='password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                  </>
                )}
                <hr className='border-gray-200' />
              </div>
            </div>
            <div className='p-6 flex justify-between bg-white  rounded-b-lg border-t border-gray-200'>
              <p className='text-xs text-gray-500 tracking-tight'>
                Click on Save to update your Profile Info
              </p>
              <button
                type='submit'
                className='bg-indigo-500 text-white text-sm font-medium px-6 py-2 rounded float-right uppercase cursor-pointer'
              >
                SAVE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

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

export default Account;
