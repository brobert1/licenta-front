'use client';

import { Link } from '@components';
import { cardCascade, fadeUpSoft } from '@constants/landing-motion';
import { useQuery } from '@hooks';
import { motion, useReducedMotion } from 'framer-motion';
import CourseCard from './CourseCard';

const CoursesSection = () => {
  const reduceMotion = useReducedMotion();
  const { data, status } = useQuery('/courses', { perPage: 6 });
  const courses = status === 'success' && data?.pages ? data.pages.flat() : [];

  return (
    <section className="py-24 px-4 lg:px-24 bg-surface courses-scroll-root">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 max-w-md">
          <p className="text-xs font-bold uppercase tracking-widest text-secondary-muted mb-3 font-landing">
            Curriculum depth
          </p>
          <div className="h-1 w-full overflow-hidden rounded-full bg-black/10">
            <div className="courses-scroll-progress h-full w-full origin-left scale-x-0 rounded-full bg-tertiaryGold" />
          </div>
        </div>
        <motion.div
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          variants={cardCascade}
          initial={reduceMotion ? false : 'hidden'}
          whileInView={reduceMotion ? false : 'show'}
          viewport={{ once: true, amount: 0.45 }}
        >
          <motion.div variants={fadeUpSoft}>
            <h2 className="text-4xl font-headline text-black mb-2">Grandmaster Courses</h2>
            <p className="text-secondary-muted max-w-md font-landing">
              Learn from the legends. Our courses are produced with cinematic quality and
              pedagogical rigor.
            </p>
          </motion.div>
          <motion.div variants={fadeUpSoft}>
            <Link
              href="/courses"
              className="text-sm font-bold uppercase tracking-widest text-tertiaryGold flex items-center gap-2 group font-landing shrink-0"
            >
              Browse Full Catalog
              <i className="fa-solid fa-arrow-right text-sm group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
        {status === 'loading' && (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl bg-surface-container-high animate-pulse aspect-video"
              />
            ))}
          </div>
        )}
        {status === 'success' && courses.length > 0 && (
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={cardCascade}
            initial={reduceMotion ? false : 'hidden'}
            whileInView={reduceMotion ? false : 'show'}
            viewport={{ once: true, amount: 0.08 }}
          >
            {courses.slice(0, 6).map((course) => (
              <motion.div key={course._id} variants={fadeUpSoft}>
                <CourseCard {...course} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;
