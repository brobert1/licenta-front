import { axios } from '@lib';

/**
 * Generates a Stripe checkout URL for a guest (unauthenticated) course purchase.
 * Uses plain axios (no auth header).
 *
 * @param {Object} params
 * @param {string} params.courseId
 * @param {string} params.courseName
 * @param {string} params.cancelUrl - URL to return to if the user cancels
 * @returns {Promise<string>} The Stripe checkout URL
 */
const generateGuestCheckout = async ({ courseId, courseName, cancelUrl }) => {
  const response = await axios.post('/public/checkout/guest', {
    courseId,
    courseName,
    cancelUrl,
  });

  if (!response?.url) {
    throw new Error('Failed to generate checkout URL');
  }

  return response.url;
};

export default generateGuestCheckout;
