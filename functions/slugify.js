import _slugify from 'slugify';

/**
 * Generate a slug from the given arguments.
 *
 * @param  {...any} args - The arguments to generate the slug from.
 * @returns {string} The generated slug.
 */
function slugify(...args) {
  return _slugify(args.join('-'), {
    lower: true, // Convert to lowercase
    strict: true, // Remove special characters
    trim: true, // Trim whitespace
  });
}

export default slugify;
