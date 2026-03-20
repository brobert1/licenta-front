import { Link } from '@components';

const FooterColumn = ({ title, links }) => (
  <div className="flex flex-col gap-4">
    <h4 className="font-sans font-bold text-black text-sm uppercase tracking-wider">{title}</h4>
    <div className="flex flex-col gap-3">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="font-sans text-secondary-muted hover:text-black transition-colors text-sm"
        >
          {label}
        </Link>
      ))}
    </div>
  </div>
);

export default FooterColumn;
