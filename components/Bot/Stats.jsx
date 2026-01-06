import { useQuery } from '@hooks';
import { StatsCard, StatsCardSkeleton } from '.';
import { NoDataPlaceholder } from '@components';

const Stats = ({ options }) => {
  const { data, status } = useQuery('/client/play/stats', options);

  if (status === 'loading') {
    return (
      <div className="w-full">
        <StatsCardSkeleton type="loading" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="w-full">
        <StatsCardSkeleton type="error" />
      </div>
    );
  }

  if (status === 'success' && data?.games === 0) {
    return (
      <div className="w-full">
        <NoDataPlaceholder
          icon="fa-chart-line"
          message="No stats available yet"
          extraClass="mt-20 mx-auto"
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <StatsCard data={data} />
    </div>
  );
};

export default Stats;
