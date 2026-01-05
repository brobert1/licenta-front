import { Link, Price } from '@components';
import { calculateCoursePricing } from '@functions';
import { PublicCourseTags } from '.';

const PublicCourseCard = ({ name, preview, author, tags, isPaid, price, sale, currency }) => {
  const { percentOff, endsIn } = calculateCoursePricing({ price, sale });
  return (
    <div className="flex flex-col border border-gray-200 bg-white transition-all duration-700 ease-in-out hover:border-gray-400 rounded-lg overflow-hidden cursor-default h-full">
      <div className="w-full h-48 relative flex-shrink-0">
        <img src={preview?.image?.path} alt={name} className="w-full h-full object-cover" />
        {sale?.isActive && (
          <span className="absolute top-2 left-2 rounded-full bg-red-600 text-white text-xs font-semibold px-2 py-0.5 shadow">
            Save {percentOff}%
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col gap-3 flex-grow">
        <div className="flex flex-col gap-3 flex-grow">
          <h2 className="font-semibold text-primary text-lg">{name}</h2>
          <div className="min-h-[28px]">
            {sale?.isActive && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 px-1.5 py-0.5 text-[11px] font-semibold">
                  <i className="fa-solid fa-bolt" /> Limited Time Sale
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-blue-600/10 text-blue-700 border border-blue-600/20 px-1.5 py-0.5 text-[11px] font-semibold">
                  <i className="fa-regular fa-clock" /> Ends in {endsIn}
                </span>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-400 line-clamp-3">{preview?.description}</p>
          <div className="flex items-center gap-2">
            <span className="bg-accent text-white text-xs font-bold py-0.5 px-1 rounded-sm">
              {author?.title}
            </span>
            <p className="text-primary font-semibold text-sm">{author?.name}</p>
          </div>
          <PublicCourseTags tags={tags} />
        </div>
        <div className="flex flex-col gap-3 mt-auto">
          <div className="flex items-center gap-2 min-h-[24px]">
            {sale?.isActive && (
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">
                  {currency} <Price value={sale.price} precision={2} />
                </span>
                <span className="line-through text-gray-400">
                  {currency} <Price value={price} precision={2} />
                </span>
              </div>
            )}
            {!sale?.isActive && isPaid && (
              <span className="text-primary font-bold">
                {currency} <Price value={price} precision={2} />
              </span>
            )}
            {!isPaid && <span className="text-green-600 font-bold">Free</span>}
          </div>
          <Link href="/login" className="button full accent py-1.5 cursor-pointer">
            {isPaid ? 'Buy' : 'Get course'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PublicCourseCard;
