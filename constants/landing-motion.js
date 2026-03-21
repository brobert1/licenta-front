export const landingEase = [0.22, 1, 0.36, 1];

export const authAccentBarTransition = {
  delay: 0.04,
  duration: 0.62,
  ease: [0.33, 1, 0.68, 1],
};

export const authClipEase = [0.33, 1, 0.68, 1];

export const authFieldsTransition = {
  delay: 0.1,
  duration: 0.52,
  ease: [0.25, 0.8, 0.25, 1],
};

export const authLayoutSpring = {
  damping: 46,
  mass: 0.92,
  stiffness: 240,
  type: 'spring',
};

export const authPageRevealEnterTransition = {
  clipPath: { duration: 0.82, ease: authClipEase },
  opacity: { duration: 0.58, ease: landingEase },
};

export const authPageRevealExitTransition = {
  clipPath: { delay: 0.04, duration: 0.48, ease: authClipEase },
  opacity: { duration: 0.42, ease: landingEase },
};

export const authTitleTransition = {
  duration: 0.48,
  ease: [0.25, 0.8, 0.25, 1],
};

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: landingEase },
  },
};

export const fadeUpSoft = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: landingEase },
  },
};

export const popIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.62, ease: landingEase },
  },
};

export const staggerFast = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

export const tvReveal = {
  hidden: { opacity: 0, scale: 0.97, rotate: -1 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.85, ease: landingEase, delay: 0.2 },
  },
};

export const cardCascade = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.04 },
  },
};
