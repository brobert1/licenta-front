import { Link } from '@components';

const PuzzleOfTheDay = () => (
  <section>
    <div className="p-6 bg-black text-on-primary rounded-2xl shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <i className="fa-solid fa-chess-knight text-tertiaryGold" />
        <h2 className="font-headline text-xl text-white">Puzzle of the Day</h2>
      </div>
      <h3 className="font-headline text-2xl italic text-white mb-2">
        White to Move and Mate in 3
      </h3>
      <p className="font-landing text-white/70 text-sm mb-4">
        Rated: 2100. 84% of players at your level failed this combination today.
      </p>
      <Link
        href="/client/play"
        className="inline-flex items-center gap-2 px-4 py-2 bg-tertiaryGold text-white font-landing font-semibold rounded-lg hover:opacity-90 transition-opacity"
      >
        Solve Now
        <i className="fa-solid fa-arrow-right text-sm" />
      </Link>
    </div>
  </section>
);

export default PuzzleOfTheDay;
