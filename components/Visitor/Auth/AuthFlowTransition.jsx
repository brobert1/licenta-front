'use client';

import {
  authPageRevealEnterTransition,
  authPageRevealExitTransition,
} from '@constants/landing-motion';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/router';

const AUTH_FLOW_PATHS = ['/forgot', '/login', '/signup'];

const AuthFlowTransition = ({ children }) => {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const isAuthFlow = AUTH_FLOW_PATHS.includes(router.pathname);

  if (reduceMotion || !isAuthFlow) {
    return children;
  }

  return (
    <LayoutGroup id="auth-flow-root">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={router.asPath}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
          className="min-h-screen w-full"
          exit={{
            clipPath: 'inset(0% 100% 0% 0%)',
            opacity: 0.97,
            transition: authPageRevealExitTransition,
          }}
          initial={{ clipPath: 'inset(0% 0% 0% 100%)', opacity: 0.94 }}
          transition={authPageRevealEnterTransition}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  );
};

export default AuthFlowTransition;
