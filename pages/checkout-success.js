import { store } from '@auth';
import { Button, Logo } from '@components';
import { coffee, pollVerifyCheckout } from '@functions';
import { decode } from 'jsonwebtoken';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Page = () => {
  const router = useRouter();
  const { session_id } = router.query;
  const [phase, setPhase] = useState('verifying'); // verifying | logging-in | already_claimed | error

  useEffect(() => {
    if (!session_id) return;
    const verify = async () => {
      try {
        const data = await pollVerifyCheckout(session_id);

        if (!data || data.status === 'error') {
          setPhase('error');
          return;
        }

        if (data.status === 'already_claimed') {
          setPhase('already_claimed');
          return;
        }

        const { token, courseId } = data;
        if (!token || !decode(token)) {
          setPhase('error');
          return;
        }

        setPhase('logging-in');
        router.replace('/checkout-success', undefined, { shallow: true });
        store.dispatch({ type: 'SET', jwt: token });
        await coffee(500);
        router.replace(`/client/courses/${courseId}`);
      } catch {
        setPhase('error');
      }
    };

    verify();
  }, [session_id]);

  return (
    <main className="flex bg-neutral-100 min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="p-1.5 rounded-2xl max-w-lg w-full bg-white shadow-sm">
        <div className="flex flex-col items-center justify-center gap-4 p-10 text-center">
          <Logo />
          {(phase === 'verifying' || phase === 'logging-in') && (
            <>
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mt-4" />
              <p className="text-gray-500 text-sm">
                {phase === 'verifying' ? 'Verifying your payment...' : 'Setting up your account...'}
              </p>
            </>
          )}
          {phase === 'already_claimed' && (
            <>
              <h2 className="text-xl font-semibold text-black mt-4">Already accessed</h2>
              <p className="text-gray-500 text-sm">
                This link has already been used. Check your email for a password setup link, or log
                in if you already set one.
              </p>
              <Button
                onClick={() => router.push('/login')}
                className="button full accent rounded-full w-full font-semibold text-base mt-2"
              >
                Go to Login
              </Button>
            </>
          )}
          {phase === 'error' && (
            <>
              <h2 className="text-xl font-semibold text-black mt-4">Something went wrong</h2>
              <p className="text-gray-500 text-sm">
                Your payment was received. Check your email for access instructions, or{' '}
                <a href="/login" className="text-primary underline">
                  log in
                </a>{' '}
                if you already have an account.
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;
