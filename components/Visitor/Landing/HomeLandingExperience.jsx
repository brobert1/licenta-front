'use client';

import {
  CTASection,
  CoursesSection,
  Footer,
  Header,
  Hero,
  RefineSection,
  StatsSection,
} from '@components/Visitor';
import { fadeUp, landingEase, popIn } from '@constants/landing-motion';
import useLandingScroll from '@hooks/use-landing-scroll';
import { motion, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

const HomeLandingExperience = () => {
  const mainRef = useRef(null);
  const reduceMotion = useReducedMotion();
  useLandingScroll(mainRef, reduceMotion);

  return (
    <main
      ref={mainRef}
      className="flex flex-col min-h-screen bg-surface text-on-surface"
    >
      <motion.div
        initial={reduceMotion ? false : { y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.52, ease: landingEase }}
      >
        <Header />
      </motion.div>
      <Hero />
      <RefineSection />
      <CoursesSection />
      <motion.div
        initial={reduceMotion ? false : 'hidden'}
        variants={fadeUp}
        viewport={{ amount: 0.28, once: true }}
        whileInView={reduceMotion ? false : 'show'}
      >
        <StatsSection />
      </motion.div>
      <motion.div
        initial={reduceMotion ? false : 'hidden'}
        variants={popIn}
        viewport={{ amount: 0.32, once: true }}
        whileInView={reduceMotion ? false : 'show'}
      >
        <CTASection />
      </motion.div>
      <motion.div
        initial={reduceMotion ? false : 'hidden'}
        variants={fadeUp}
        viewport={{ amount: 0.18, once: true }}
        whileInView={reduceMotion ? false : 'show'}
      >
        <Footer />
      </motion.div>
    </main>
  );
};

export default HomeLandingExperience;
