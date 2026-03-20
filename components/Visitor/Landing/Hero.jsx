import { Button } from '@components';

const Hero = () => (
  <section className="relative min-h-[80vh] flex items-center overflow-hidden px-4 lg:px-24 py-20 bg-surface">
    <div className="absolute inset-0 bg-gradient-to-br from-tertiaryGold/5 via-transparent to-transparent -z-0" />
    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
      <div className="flex flex-col gap-6 lg:gap-8 max-w-2xl">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-tertiaryGold/10 text-tertiaryGold font-semibold text-xs uppercase tracking-widest rounded-full w-fit border border-tertiaryGold/20">
          Your digital chess academy
        </span>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline leading-tight text-black">
          Master the <span className="italic text-tertiaryGold">Silent</span> Art of War.
        </h1>
        <p className="text-lg text-secondary-muted max-w-md leading-relaxed font-landing">
          Step into a sanctuary of strategy. Curated lessons from Grandmasters, spaced repetition,
          and grandmaster-level insights to elevate your game.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            href="/signup"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-black text-on-primary rounded-xl font-semibold font-landing hover:bg-secondary transition-colors active:scale-95 shadow-lg shadow-black/5"
          >
            Start Playing
            <i className="fa-solid fa-arrow-right text-sm" />
          </Button>
          <Button
            href="/courses"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-surface-container-high text-on-surface rounded-xl font-semibold font-landing hover:bg-surface-container-highest transition-colors border border-outline-variant/50"
          >
            View Courses
          </Button>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <div className="absolute -inset-6 bg-tertiaryGold/8 rounded-3xl blur-3xl -z-10" />
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
          <iframe
            src="https://lichess.org/tv/frame?theme=green&bg=light"
            className="w-full h-full border-0"
            title="Rook 'n Learn TV — Live Chess"
          />
          <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-md pointer-events-none">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-secondary-muted uppercase tracking-widest mb-0.5 font-landing">
                  Rook 'n Learn TV
                </p>
                <h3 className="font-headline text-base italic text-black">Top Rated Live Game</h3>
              </div>
              <span className="inline-flex items-center gap-1.5 text-tertiaryGold font-bold font-landing text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                LIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute top-0 right-0 w-2/5 h-full bg-gradient-to-l from-surface-container-low to-transparent -z-0 hidden lg:block" />
  </section>
);

export default Hero;
