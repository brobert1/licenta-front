/**
 * Removes all HTML tags from a string and returns plain text.
 *
 * @param {string} html - The HTML string to clean.
 * @returns {string} The plain text without HTML tags.
 */
const stripTags = (html) => {
  // Handle undefined or null input
  if (!html) {
    return '';
  }

  const withLineBreaks = html
    .replace(/<br\s*\/?\s*>/gi, '\n')
    .replace(/<\/(p|div|h1|h2|h3|li|ul|ol)>/gi, '\n');

  return withLineBreaks
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

export default stripTags;
