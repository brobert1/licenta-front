import { Link } from '@components';

const AuthLayoutGrandmaster = ({ children, variant = 'centered', imageOverlay }) => {
  const isSplit = variant === 'split';

  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-surface">
      <div
        className={`flex flex-col items-center justify-center w-full px-4 py-12 ${
          isSplit ? 'lg:w-1/2' : ''
        }`}
      >
        <div className={`w-full flex flex-col items-center gap-6 ${isSplit ? 'max-w-md' : 'max-w-lg'}`}>
          <Link href="/" className="flex items-center gap-2 text-black font-bold text-lg">
            <img src="/images/logo.png" className="w-12 h-12" alt="Rook 'n Learn" />
            <span>Rook 'n Learn</span>
          </Link>
          {children}
        </div>
      </div>

      {isSplit && (
        <div className="relative hidden lg:block lg:w-1/2 min-h-screen overflow-hidden">
          <img
            src="/images/chess.png"
            alt="Chess"
            className="absolute inset-0 w-full h-full object-cover grayscale"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent">
            <p className="font-headline text-2xl italic text-white">
              {imageOverlay || 'Every move is intentional.'}
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default AuthLayoutGrandmaster;
