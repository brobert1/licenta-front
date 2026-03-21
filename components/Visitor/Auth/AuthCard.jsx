'use client';

import {
  authAccentBarTransition,
  authFieldsTransition,
  authLayoutSpring,
  authTitleTransition,
  landingEase,
} from '@constants/landing-motion';
import { AnimatePresence, motion } from 'framer-motion';

const AuthCard = ({ title, subtitle, subtitleUppercase = false, children }) => {
  const headlineKey = `${title}-${subtitle}`;

  return (
    <motion.div
      className="w-full auth-card-grandmaster rounded-2xl border border-outline-variant/20 bg-white p-6 shadow-lg"
      layout
      layoutId="auth-flow-card"
      transition={{ layout: authLayoutSpring }}
    >
      <motion.div
        aria-hidden
        className="mb-5 h-px w-14 origin-left bg-black/12"
        animate={{ opacity: 1, scaleX: 1 }}
        initial={{ opacity: 0, scaleX: 0 }}
        transition={authAccentBarTransition}
      />
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={headlineKey}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.36, ease: landingEase },
            y: -8,
          }}
          initial={{ opacity: 0, y: 11 }}
          transition={authTitleTransition}
        >
          <h1 className="mb-1 font-headline text-3xl text-black md:text-4xl">{title}</h1>
          <p
            className={`mb-6 font-landing text-secondary-muted ${
              subtitleUppercase ? 'text-xs uppercase tracking-widest' : 'text-sm'
            }`}
          >
            {subtitle}
          </p>
        </motion.div>
      </AnimatePresence>
      <motion.div
        key={headlineKey}
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 9 }}
        transition={authFieldsTransition}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default AuthCard;
