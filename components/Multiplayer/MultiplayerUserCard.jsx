import { useQuery } from '@hooks';
import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';

const MultiplayerUserCard = () => {
  const { status, data: accountData } = useQuery('/client/account');

  if (status === 'loading') {
    return (
      <div className="flex items-center gap-4 lg:p-2 p-1 bg-secondary rounded-lg shadow-lg">
        <div className="bg-tertiary lg:w-12 lg:h-12 w-10 h-10 rounded-md animate-pulse"></div>
        <div className="flex flex-col gap-1">
          <div className="w-16 h-4 bg-tertiary rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4 lg:p-2 p-1 bg-secondary rounded-lg shadow-lg">
      <div className="flex items-center gap-4">
        <div className="bg-tertiary rounded">
          {accountData?.image?.path ? (
            <img
              src={accountData.image?.path}
              className="lg:w-12 lg:h-12 w-10 h-10 object-cover rounded-md"
              alt="User Avatar"
            />
          ) : (
            <img
              src={createAvatar(avataaars, {
                seed: accountData?.name || 'User',
                size: 48,
                backgroundColor: ['404040'],
              }).toDataUri()}
              className="lg:w-12 lg:h-12 w-10 h-10 object-cover rounded-md"
              alt="User Avatar"
            />
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <p className="text-white font-semibold text-base">{accountData?.name || 'User'}</p>
            <p className="text-gray-300">({accountData?.elo || 1200})</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiplayerUserCard;
