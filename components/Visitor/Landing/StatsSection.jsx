const StatsSection = () => (
  <section className="py-24 px-4 lg:px-24 bg-black text-on-primary relative overflow-hidden stats-scroll-root">
    <div className="stats-glow pointer-events-none absolute -right-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-tertiaryGold/25 blur-3xl" />
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16 items-center relative z-10">
      <div className="md:col-span-1 border-r border-white/10 pr-8">
        <div className="font-headline text-5xl mb-4 italic text-tertiaryGold">2450+</div>
        <p className="text-white/60 text-sm font-landing tracking-wider uppercase">
          Average Master ELO of our Instructors
        </p>
      </div>
      <div className="md:col-span-2 relative">
        <i className="fa-solid fa-quote-left text-6xl text-tertiaryGold opacity-30 absolute -top-10 -left-6" />
        <blockquote className="stats-quote text-3xl font-headline italic leading-snug mb-8 relative z-10">
          &ldquo;Rook 'n Learn isn't just a platform; it's a digital renaissance for the game. The
          interface breathes focus, and the curriculum is second to none.&rdquo;
        </blockquote>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-tertiaryGold/20 flex items-center justify-center text-tertiaryGold font-bold font-landing">
            AW
          </div>
          <div>
            <p className="font-bold font-landing">ADAM WALKER</p>
            <p className="text-white/50 text-xs font-landing">International Master</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default StatsSection;
