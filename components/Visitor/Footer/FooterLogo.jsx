import { Logo } from '@components';

const FooterLogo = () => (
  <div className="col-span-2 flex flex-col gap-6">
    <Logo className="text-black" />
    <p className="font-sans text-secondary-muted text-sm max-w-sm leading-relaxed">
      Rook 'n Learn is the premier destination for chess improvement. Master the game with
      world-class curriculum and smart training tools.
    </p>
    <div className="flex gap-4">
      <a
        href="#"
        className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-secondary-muted hover:bg-tertiaryGold hover:text-white transition-colors"
        aria-label="Twitter"
      >
        <i className="fab fa-twitter" />
      </a>
      <a
        href="#"
        className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-secondary-muted hover:bg-tertiaryGold hover:text-white transition-colors"
        aria-label="YouTube"
      >
        <i className="fab fa-youtube" />
      </a>
      <a
        href="#"
        className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-secondary-muted hover:bg-tertiaryGold hover:text-white transition-colors"
        aria-label="Discord"
      >
        <i className="fab fa-discord" />
      </a>
    </div>
  </div>
);

export default FooterLogo;
