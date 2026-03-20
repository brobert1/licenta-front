import { Link } from '@components';

const FeatureCard = ({ icon, iconBg, title, description, linkText, href }) => (
  <div className="p-8 bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-all group">
    <div
      className={`w-12 h-12 flex items-center justify-center rounded-xl mb-8 group-hover:scale-110 transition-transform ${
        iconBg === 'gold' ? 'bg-tertiaryGold text-white' : 'bg-black text-on-primary'
      }`}
    >
      <i className={`fa-solid ${icon} text-white text-lg`} />
    </div>
    <h3 className="text-2xl font-headline italic text-black mb-4">{title}</h3>
    <p className="text-secondary-muted leading-relaxed mb-6 font-landing">{description}</p>
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-black font-bold font-landing hover:underline decoration-tertiaryGold underline-offset-4"
    >
      {linkText}
      <i className="fa-solid fa-arrow-up-right-from-square text-sm" />
    </Link>
  </div>
);

export default FeatureCard;
