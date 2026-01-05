import { usePreview } from '@hooks';
import NextLink from 'next/link';

const Link = ({ children, href, ...props }) => {
  const { isPreview } = usePreview();

  // Automatically append preview query param when in preview mode
  let finalHref = href;

  if (isPreview && href) {
    const separator = typeof href === 'string' && href.includes('?') ? '&' : '?';
    finalHref = typeof href === 'string' ? `${href}${separator}preview=true` : href;
  }

  return (
    <NextLink href={finalHref} {...props}>
      {children}
    </NextLink>
  );
};

export default Link;
