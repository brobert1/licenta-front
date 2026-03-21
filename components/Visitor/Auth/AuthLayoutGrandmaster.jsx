'use client';

import { Link } from '@components';
import { authLayoutSpring, landingEase } from '@constants/landing-motion';
import { motion } from 'framer-motion';

const AuthLayoutGrandmaster = ({ children, variant = 'centered', imageOverlay }) => {
  const isSplit = variant === 'split';

  const brand = (
    <Link className="flex items-center gap-2 text-lg font-bold text-black" href="/">
      <img alt="Rook 'n Learn" className="h-12 w-12" src="/images/logo.png" />
      <span>Rook 'n Learn</span>
    </Link>
  );

  const innerClass = `flex w-full flex-col items-center gap-6 ${
    isSplit ? 'max-w-md' : 'max-w-lg'
  }`;

  const formColumnClass = `flex w-full flex-col items-center justify-center px-4 py-12 ${
    isSplit ? 'lg:w-1/2' : ''
  }`;

  if (!isSplit) {
    return (
      <main className="flex min-h-screen flex-col bg-surface lg:flex-row">
        <div className={formColumnClass}>
          <div className={innerClass}>
            <div>{brand}</div>
            {children}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-surface lg:flex-row">
      <motion.div
        className={formColumnClass}
        layout
        layoutId="auth-flow-form-column"
        transition={{ layout: authLayoutSpring }}
      >
        <div className={innerClass}>
          <motion.div
            layout
            layoutId="auth-flow-brand"
            transition={{ layout: authLayoutSpring }}
          >
            {brand}
          </motion.div>
          {children}
        </div>
      </motion.div>

      <motion.div
        className="relative hidden min-h-screen w-full overflow-hidden lg:block lg:w-1/2"
        layout
        layoutId="auth-flow-hero-panel"
        transition={{ layout: authLayoutSpring }}
      >
        <motion.img
          alt="Chess"
          animate={{ scale: 1 }}
          className="absolute inset-0 h-full w-full object-cover grayscale"
          initial={{ scale: 1.05 }}
          src="/images/chess.png"
          transition={{ duration: 1.9, ease: landingEase }}
        />
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8"
          initial={{ opacity: 0.72, y: 10 }}
          transition={{ delay: 0.2, duration: 0.68, ease: landingEase }}
        >
          <p className="font-headline text-2xl italic text-white">
            {imageOverlay || 'Every move is intentional.'}
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default AuthLayoutGrandmaster;
