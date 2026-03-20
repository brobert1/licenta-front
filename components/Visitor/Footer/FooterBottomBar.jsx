import { Link } from '@components';

const FooterBottomBar = () => (
  <div className="pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
    <p className="font-sans text-secondary-muted/80 text-sm" suppressHydrationWarning>
      © {new Date().getFullYear()} Rook 'n Learn. All rights reserved.
    </p>
    <div className="flex gap-6">
      <Link
        href="/terms-of-use"
        className="font-sans text-sm text-secondary-muted/80 hover:text-black transition-colors"
      >
        Terms of Service
      </Link>
      <Link
        href="/privacy-policy"
        className="font-sans text-sm text-secondary-muted/80 hover:text-black transition-colors"
      >
        Privacy Policy
      </Link>
      <Link
        href="/cookie-policy"
        className="font-sans text-sm text-secondary-muted/80 hover:text-black transition-colors"
      >
        Cookie Policy
      </Link>
    </div>
  </div>
);

export default FooterBottomBar;
