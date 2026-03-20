import FooterBottomBar from './FooterBottomBar';
import FooterColumn from './FooterColumn';
import FooterLogo from './FooterLogo';
import {
  companyLinks,
  communityLinks,
  platformLinks,
  supportLinks,
} from './footer-links';

const Footer = () => (
  <footer className="w-full bg-surface-container-low border-t border-outline-variant/10 pt-16 pb-8 px-4 lg:px-8">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12 mb-16">
        <FooterLogo />
        <FooterColumn title="Platform" links={platformLinks} />
        <FooterColumn title="Community" links={communityLinks} />
        <FooterColumn title="Support" links={supportLinks} />
        <FooterColumn title="Company" links={companyLinks} />
      </div>
      <FooterBottomBar />
    </div>
  </footer>
);

export default Footer;
