import React, { useState } from 'react';
import ProfileCard from '@/components/Profiles/ProfileCard';
import Button from '@/components/Profiles/Button';
import ManageProfile from '@/components/Profiles/ManageProfile';
import CreateProfileButton from '@/components/Profiles/CreateProfileButton';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import useSwr from 'swr';
import fetcher from '@/lib/fetcher';
import { useRouter } from 'next/router';
import Loading from '@/components/LoadingSpinner/Loading';

const Profiles = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [manageProfiles, setManageProfiles] = useState(false);
  const [createProfile, setCreateProfile] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const { data, mutate } = useSwr('/api/profiles/userProfiles', fetcher);
  const router = useRouter();

  const handleRedirectHome = () => {
    router.push('/home');
    setIsLoading(true);
  };

  const handleProfileClick = (profileId: any) => {
    setSelectedProfileId(profileId);
    setCreateProfile((e) => !e);
  };

  const { data: selectedProfile } = useSwr(
    selectedProfileId ? `/api/profiles/${selectedProfileId}` : null,
    fetcher
  );

  if (isLoading) {
    return (
      <div className='bg-black h-screen w-screen flex justify-center items-center pb-[264px] pr-[264px]'>
        <Loading />
      </div>
    );
  }

  if (createProfile) {
    return (
      <ManageProfile
        onSave={() => {
          setCreateProfile((e) => !e);
          mutate();
        }}
        onCancel={() => setCreateProfile((e) => !e)}
        profileData={selectedProfile}
      />
    );
  }

  return (
    <div className='bg-black flex justify-center h-screen items-center'>
      <div className='flex flex-col'>
        <h1 className='text-center text-2xl md:text-5xl text-white'>
          Who&apos;s watching?
        </h1>
        <div className='flex items-center justify-center gap-8 mt-10'>
          <ProfileCard
            data={data}
            manageProfiles={manageProfiles}
            onEdit={handleProfileClick}
            onHome={handleRedirectHome}
          />
          {manageProfiles && (
            <CreateProfileButton
              onClick={() => {
                setCreateProfile((e) => !e);
                setSelectedProfileId(null);
              }}
              text={'Add Profile'}
            />
          )}
        </div>
        <div className='mt-10 rounded-lg text-center mx-auto'>
          <Button
            onClick={() => setManageProfiles((e) => !e)}
            text={!manageProfiles ? 'Manage Profiles' : 'Done'}
          />
        </div>
      </div>
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

export default Profiles;
