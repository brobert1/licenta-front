import { useQuery } from '@hooks';
import { StatsCard, StatsCardSkeleton } from '.';
import { NoDataPlaceholder } from '@components';

const Stats = ({ options }) => {
  const { data, status } = useQuery('/client/play/stats', options);

  return (
    <div className="w-full">
      {status === 'loading' && (
        <div className="max-w-md">
          <StatsCardSkeleton type="loading" />
        </div>
      )}
      {status === 'error' && (
        <div className="max-w-md">
          <StatsCardSkeleton type="error" />
        </div>
      )}
      {status === 'success' &&
        (data?.games === 0 ? (
          <NoDataPlaceholder
            icon="fa-chart-line"
            message="No stats available yet"
            extraClass="mt-20 mx-auto"
          />
        ) : (
          <div className="max-w-md">
            <StatsCard data={data} />
          </div>
        ))}
    </div>
  );
};

export default Stats;
