import React, { useCallback, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import { getSession, signIn } from 'next-auth/react';
import Input from '@/components/Input';
import useInput from '@/hooks/use-input';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import Image from 'next/image';

function validName(name: string): boolean {
  return /^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/.test(name);
}

function validEmail(email: string): boolean {
  return /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function validPassword(password: string): boolean {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/.test(
    password
  );
}

function Auth() {
  const [variant, setVariant] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [remember, setRemember] = useState(false);
  const router = useRouter();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const {
    value: nameValue,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(validName);

  const {
    value: emailValue,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(validEmail);

  const {
    value: passwordValue,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(validPassword);

  const toggleVariant = useCallback(() => {
    setVariant((current) => (current === 'login' ? 'register' : 'login'));
    setHasError(false);
  }, []);

  const login = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        await signIn('credentials', {
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
          remember,
          redirect: false,
          callbackUrl: '/profiles',
        }).then((data) => {
          setErrorMessage(data?.error);
          router.push('/profiles');
          if (!data?.ok) setHasError(true);
        });
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    },
    [remember, router, emailRef, passwordRef]
  );

  const register = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        await axios.post('/api/register', {
          name: nameRef.current?.value,
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        });
        login(e);
      } catch (error: any) {
        setErrorMessage(error.response?.data?.error || 'An error occurred');
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [emailRef, nameRef, passwordRef, login]
  );

  return (
    <div className='bg-black sm:bg-[url("/images/hero.png")] h-screen w-screen  bg-no-repeat bg-cover relative '>
      <nav className='px-7 sm:px-16 py-10'>
        <Image
          width={150}
          height={50}
          src='/images/logo.png'
          alt='Netflix Logo'
        />
      </nav>
      <div className='flex justify-center'>
        <div className='md:bg-opacity-70 bg-black h-full w-full sm:w-[470px] px-7 sm:pt-16 pb-24 sm:px-20'>
          <h2 className='text-white text-4xl mb-8 font-semibold'>
            {variant === 'login' ? 'Sign in' : 'Sign up'}
          </h2>
          {hasError && (
            <p className='px-5 py-4 bg-[#e87c03] rounded-md mb-5 text-sm text-white'>
              {errorMessage}
            </p>
          )}
          <form onSubmit={variant === 'login' ? login : register}>
            <div className='flex flex-col gap-4 md:w-full'>
              {variant === 'register' && (
                <Input
                  id='name'
                  type='text'
                  label='Username'
                  onChange={nameChangeHandler}
                  value={nameValue}
                  onBlur={nameBlurHandler}
                  ref={nameRef}
                />
              )}
              {nameHasError && (
                <span className='text-sm text-red-500 -mt-3'>
                  Please enter a valid username.
                </span>
              )}
              <Input
                id='email'
                type='email'
                label='Email or phone number'
                value={emailValue}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                ref={emailRef}
              />
              {emailHasError && (
                <span className='text-sm text-red-500 -mt-3'>
                  Please enter a valid email address.
                </span>
              )}
              <Input
                type='password'
                id='password'
                label='Password'
                value={passwordValue}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                ref={passwordRef}
              />
              {passwordHasError && (
                <span className='text-sm text-red-500 -mt-3'>
                  Your password must contain between 8 and 60 characters.
                </span>
              )}
            </div>
            <button
              type='submit'
              className='bg-red-600 py-3 text-white rounded-md w-full mt-6 hover:bg-red-700 transition disabled:pointer-events-none disabled:bg-gray-400'
              disabled={nameHasError || emailHasError || passwordHasError}
            >
              {isLoading ? (
                <div className='flex justify-center'>
                  <FaSpinner />
                </div>
              ) : (
                `${variant === 'login' ? 'Sign in' : 'Sign up'}`
              )}
            </button>
          </form>

          {variant === 'login' && (
            <div className='flex align-middle gap-1 mt-2'>
              <input
                type='checkbox'
                id='remember'
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label htmlFor='remember' className='text-gray-400 text-sm'>
                Remember me
              </label>
            </div>
          )}
          <p className='text-neutral-500 mt-8'>
            {variant === 'login'
              ? 'New to Netflix?'
              : 'Already have an account?'}
            <span
              onClick={toggleVariant}
              className='text-white ml-1 hover:underline cursor-pointer'
            >
              {variant === 'login' ? 'Create an account' : 'Sign in'}
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default Auth;
