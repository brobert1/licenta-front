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

  return html.replace(/<\/?[^>]+(>|$)/g, ''); // Match and remove HTML tags
};

export default stripTags;
