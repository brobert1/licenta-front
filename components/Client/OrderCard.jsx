import { Price } from '@components';
import { formatDate } from '@functions';
import { stripTags } from '@functions';

const DashboardCourseCard = ({ order }) => {
  return (
    <div className="flex lg:flex-row flex-col gap-4 bg-secondary p-4 rounded-lg">
      <h2 className="font-semibold text-white text-lg lg:text-xl lg:hidden">{order.course.name}</h2>
      <div className="hidden lg:flex aspect-square w-32 h-32 rounded-lg">
        <img
          src={order.course.image?.path}
          alt={order.course.name}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 w-full justify-between">
        <div className="flex">
          <div className="flex lg:hidden aspect-square w-24 h-24 rounded-lg float-left mr-4">
            <img
              src={order.course.image?.path}
              alt={order.course.name}
              className="rounded-lg object-cover"
            />
          </div>
          <p className="text-sm text-gray-400 mb-2 lg:hidden line-clamp-5">
            {stripTags(order.course.description)}
          </p>
          <div className="hidden lg:flex flex-col w-full gap-1">
            <h2 className="font-semibold text-white lg:text-xl">{order.course.name}</h2>
          </div>
        </div>
        <div className="hidden lg:flex">
          <p className="text-sm text-gray-400 line-clamp-5">
            {stripTags(order.course.description)}
          </p>
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex justify-center items-center gap-2 text-accent">
            <p className="font-bold">Bought on:</p>
            <p className="text-white">{formatDate(order.createdAt, 'MMM dd, yyyy')}</p>
          </div>
          <div className="flex gap-2 items-center justify-center text-accent">
            <p className="font-bold">Price:</p>
            <p className="uppercase text-white">
              {order.currency} <Price value={order.amount} precision={2} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCourseCard;
