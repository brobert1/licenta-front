import { Link, Logo } from '@components';

const Footer = () => {
  return (
    <footer className="w-full bg-primary lg:pt-16 px-4 py-6 lg:p-8 mt-8">
      <div className="max-visitor flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-16 max-w-6xl mx-auto">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Logo />
          <p className="text-grey lg:text-base text-sm max-w-2xl">
            Alexandru-Bogdan Banzea is a Romanian International Master, growing Twitch streamer,
            YouTuber, lichess coach, and acclaimed Chessable author. All of that by his early
            twenties.
          </p>
          <div className="flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-secondary p-2 hover:opacity-80">
            <i aria-hidden className="fas fa-award flex h-8 w-8 items-center justify-center text-lg text-white lg:h-6 lg:text-base" />
            <p className="text-sm text-white lg:text-base">
              2023 Chessable Author of the Year and Best Presenter
            </p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <Link className="text-white font-bold hover:opacity-80" href="/about">
              <p>About</p>
            </Link>
            <Link className="text-white font-bold hover:opacity-80" href="/support">
              <p>Support</p>
            </Link>
            <Link className="text-white font-bold hover:opacity-80" href="/contact">
              <p>Contact</p>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              className="text-white font-bold hover:opacity-80"
              href="https://www.youtube.com/c/AlexBanzea"
              target="_blank"
            >
              <p>Youtube</p>
            </Link>
            <Link
              className="text-white font-bold hover:opacity-80"
              href="https://x.com/alexbanzea"
              target="_blank"
            >
              <p>X(Twitter)</p>
            </Link>
            <Link
              className="text-white font-bold hover:opacity-80"
              href="https://www.instagram.com/alex.banzea/"
              target="_blank"
            >
              <p>Instagram</p>
            </Link>
          </div>
        </div>
        <div className="lg:col-span-2">
          <p className="text-grey text-sm">© Rook&apos;N&apos;Learn 2026. All rights reserved</p>
        </div>
        <div className="grid lg:place-items-center lg:grid-cols-3 gap-4 lg:gap-4">
          <Link href="/privacy-policy" className="text-sm text-grey hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms-of-use" className="text-sm text-grey hover:text-white">
            Terms of Use
          </Link>
          <Link href="/cookie-policy" className="text-sm text-grey hover:text-white">
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
