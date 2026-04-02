import React from 'react';

const ProfileSuccess = ({ email, role = 'Admin' }) => {
  return (
    <div className="flex max-w-40 flex-col text-right">
      <h4 className="truncate text-sm font-medium text-primary">{email}</h4>
      <p className="text-xs text-muted capitalize">{role}</p>
    </div>
  );
};

export default ProfileSuccess;
