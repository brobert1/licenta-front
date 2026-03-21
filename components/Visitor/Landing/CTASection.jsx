import { Button } from '@components';

const CTASection = () => (
  <section className="py-24 px-4 lg:px-24 cta-scroll-root">
    <div className="max-w-5xl mx-auto bg-surface-container-highest rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2">
        <div className="cta-blob h-full w-full rounded-full bg-tertiaryGold/5 blur-3xl" />
      </div>
      <div className="relative z-10">
        <h2 className="text-4xl md:text-6xl font-headline text-black mb-8">
          Ready to make your move?
        </h2>
        <p className="text-secondary-muted mb-12 max-w-lg mx-auto text-lg leading-relaxed font-landing">
          Join over 100,000 players dedicated to the pursuit of intellectual excellence. Start your
          first match today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button
            href="/signup"
            className="w-full sm:w-auto px-12 py-5 bg-black text-on-primary rounded-xl font-bold text-lg font-landing hover:shadow-2xl hover:shadow-black/20 transition-all"
          >
            Join The Study
          </Button>
          <Button
            href="/courses"
            className="w-full sm:w-auto px-12 py-5 bg-white text-black border border-outline-variant/50 rounded-xl font-bold text-lg font-landing hover:bg-surface-container-low transition-all"
          >
            Explore Membership
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
