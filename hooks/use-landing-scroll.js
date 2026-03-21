import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect } from 'react';

const useLandingScroll = (scopeRef, prefersReducedMotion) => {
  useLayoutEffect(() => {
    if (prefersReducedMotion || !scopeRef?.current) {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ['.hero-parallax-slow', '.hero-parallax-fast'],
        { opacity: 1 },
        {
          opacity: 0.22,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-scroll-root',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.35,
          },
        }
      );

      gsap.fromTo(
        '.refine-parallax-line',
        { scaleX: 0.06, opacity: 0.25 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: '.refine-scroll-root',
            start: 'top 74%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );

      gsap.from('.stats-quote', {
        y: 28,
        opacity: 0.35,
        duration: 1.05,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.stats-scroll-root',
          start: 'top 70%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      gsap.from('.stats-glow', {
        opacity: 0.08,
        x: 48,
        duration: 1.25,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.stats-scroll-root',
          start: 'top 78%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      gsap.from('.cta-blob', {
        opacity: 0.18,
        scale: 0.88,
        rotate: -14,
        duration: 1.15,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.cta-scroll-root',
          start: 'top 82%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      gsap.fromTo(
        '.courses-scroll-progress',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: '.courses-scroll-root',
            start: 'top 65%',
            end: 'bottom 35%',
            scrub: 0.35,
          },
        }
      );
    }, scopeRef);

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion, scopeRef]);
};

export default useLandingScroll;
