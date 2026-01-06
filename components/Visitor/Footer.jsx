import { Link, Logo } from '@components';

const Footer = () => {
  return (
    <footer className="w-full bg-primary lg:pt-20 px-4 py-8 lg:px-8 mt-12 border-t border-white/10">
      <div className="max-visitor mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          <div className="col-span-2 lg:col-span-2 flex flex-col gap-6">
            <Logo />
            <p className="text-grey lg:text-base text-sm max-w-sm leading-relaxed">
              Rook 'n Learn is the premier destination for chess improvement. Master the game with
              world-class curriculum and smart training tools.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-lg">Product</h4>
            <div className="flex flex-col gap-3">
              <Link href="/courses" className="text-grey hover:text-white transition-colors">
                Courses
              </Link>
              <Link href="/pricing" className="text-grey hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="/features" className="text-grey hover:text-white transition-colors">
                Features
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-lg">Company</h4>
            <div className="flex flex-col gap-3">
              <Link href="/about" className="text-grey hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/careers" className="text-grey hover:text-white transition-colors">
                Careers
              </Link>
              <Link href="/contact" className="text-grey hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-lg">Support</h4>
            <div className="flex flex-col gap-3">
              <Link href="/help" className="text-grey hover:text-white transition-colors">
                Help Center
              </Link>
              <Link href="/terms-of-use" className="text-grey hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/privacy-policy" className="text-grey hover:text-white transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-grey text-sm">
            © {new Date().getFullYear()} Rook 'n Learn. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="text-sm text-grey hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-use"
              className="text-sm text-grey hover:text-white transition-colors"
            >
              Terms of Use
            </Link>
            <Link
              href="/cookie-policy"
              className="text-sm text-grey hover:text-white transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
