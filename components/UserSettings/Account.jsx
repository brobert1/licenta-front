import { Error, Link, Tabs } from '@components';
import { useQuery } from '@hooks';
import { format } from 'date-fns';
import { useState } from 'react';
import AccountSkeleton from './AccountSkeleton';
import GamesTab from './GamesTab';
import SettingsTab from './SettingsTab';
import StatsTab from './StatsTab';

const Account = () => {
  const { data: me, status } = useQuery('/client/account');
  const [activeTab, setActiveTab] = useState('Games');

  if (status === 'loading') return <AccountSkeleton />;
  if (status === 'error') return <Error message={status?.message} />;

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex w-full flex-col gap-6 rounded-lg bg-white p-6 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left text-primary">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-tertiary">
            {me?.image?.path ? (
              <img src={me?.image.path} alt={me?.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <i className="fa-solid fa-chess-pawn text-4xl text-grey/50"></i>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <h1 className="font-heading text-2xl font-bold text-primary">{me?.name}</h1>
            <p className="text-sm font-medium text-muted">
              {me?.createdAt && `Member since ${format(new Date(me?.createdAt), 'MMM d, yyyy')}`}
            </p>
            <Link href="/client/profile/edit" className="button full accent">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <Tabs
          tabs={['Games', 'Stats', 'Chess Settings']}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
        <div className="min-h-[400px]">
          {activeTab === 'Games' && <GamesTab />}
          {activeTab === 'Stats' && <StatsTab />}
          {activeTab === 'Chess Settings' && <SettingsTab />}
        </div>
      </div>
    </div>
  );
};

export default Account;
