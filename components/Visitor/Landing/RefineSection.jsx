import { Link } from '@components';
import FeatureCard from './FeatureCard';

const RefineSection = () => (
  <section className="py-24 px-4 lg:px-24 bg-surface-container-low">
    <div className="max-w-6xl mx-auto">
      <div className="mb-16 text-center max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-headline text-black mb-6">
          Refine Your Discipline
        </h2>
        <p className="text-secondary-muted font-landing">
          Every feature is crafted to remove distractions, focusing solely on your intellectual
          growth and tactical execution.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <div className="md:col-span-2 lg:col-span-3">
          <FeatureCard
            icon="fa-gamepad"
            iconBg="black"
            title="Play Anywhere"
            description="Experience the smooth response of our engine. Play against grandmasters or test your limits against AI bots calibrated to your specific weaknesses."
            linkText="Matchmaking Details"
            href="/courses"
          />
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          <FeatureCard
            icon="fa-graduation-cap"
            iconBg="gold"
            title="Learn Deeply"
            description="Interactive courses that go beyond standard openings. Deep-dive into the psychological warfare and structural nuances of the endgame with world-class mentors."
            linkText="Explore Curriculum"
            href="/courses"
          />
        </div>
        <div className="md:col-span-2 lg:col-span-2 p-8 bg-black text-on-primary rounded-2xl shadow-xl transition-all hover:-translate-y-1">
          <div className="w-10 h-10 bg-white/20 flex items-center justify-center rounded-lg mb-6">
            <i className="fa-solid fa-chart-line text-white text-lg" />
          </div>
          <h3 className="text-xl font-headline italic text-white mb-3">Post-Game Analysis</h3>
          <p className="text-white/70 text-sm leading-relaxed font-landing">
            Frame-by-frame breakdown of your matches with Stockfish integration.
          </p>
        </div>
        <div className="md:col-span-2 lg:col-span-4 p-8 bg-surface-container-highest rounded-2xl flex flex-col md:flex-row gap-8 items-center border border-outline-variant/30">
          <div className="flex-1">
            <h3 className="text-xl font-headline italic text-black mb-3">Connect Globally</h3>
            <p className="text-secondary-muted text-sm leading-relaxed mb-4 font-landing">
              Join clubs, participate in exclusive tournaments, and discuss theories with a
              community that values the tradition of the game.
            </p>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-surface-container-highest bg-tertiaryGold/20 flex items-center justify-center text-tertiaryGold font-bold text-[10px] font-landing"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-surface-container-highest bg-tertiaryGold flex items-center justify-center text-[10px] text-white font-bold font-landing">
                +12k
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-32 bg-white/50 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="fa-solid fa-users text-tertiaryGold text-4xl opacity-20" />
            </div>
            <div className="p-4 space-y-2">
              <div className="h-2 w-3/4 bg-black/10 rounded" />
              <div className="h-2 w-1/2 bg-black/10 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default RefineSection;
