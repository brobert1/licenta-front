import React from 'react';

const ProfileLoading = () => {
  return (
    <div className="flex animate-pulse flex-col items-end space-y-2">
      <h4 className="h-3 w-24 rounded-full bg-accent"></h4>
      <p className="h-3 w-16 rounded-full bg-tertiary"></p>
    </div>
  );
};

export default ProfileLoading;
