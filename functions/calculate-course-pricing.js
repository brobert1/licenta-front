import { formatDistanceStrict } from 'date-fns';

const calculateCoursePricing = (course) => {
  const isOnSale =
    course?.sale?.isActive && course?.sale?.endsAt && new Date(course.sale.endsAt) > new Date();
  const regularPrice = Number(course?.price) || 0;
  const salePrice = Number(course?.sale?.price) || 0;

  const displayPrice = isOnSale ? salePrice : regularPrice;
  const percentOff = Math.round(100 - (salePrice / regularPrice) * 100);
  const endsIn =
    course?.sale?.endsAt && formatDistanceStrict(new Date(course.sale.endsAt), new Date());

  return {
    displayPrice,
    percentOff,
    endsIn,
  };
};

export default calculateCoursePricing;
