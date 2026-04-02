import { axiosAuth } from '@lib';

/**
 * Generates a Stripe checkout URL for a course purchase
 *
 * @param {Object} params
 * @param {string} params.courseId - The ID of the course to purchase
 * @param {string} params.courseName - The name of the course
 * @returns {Promise<string>} The Stripe checkout URL
 * @throws {Error} If the request fails
 */
const generateStripeCheckout = async ({ courseId, courseName }) => {
  const response = await axiosAuth.post('/client/checkout', {
    courseId,
    courseName,
  });

  if (!response?.url) {
    throw new Error('Failed to generate checkout URL');
  }

  return response.url;
};

export default generateStripeCheckout;
