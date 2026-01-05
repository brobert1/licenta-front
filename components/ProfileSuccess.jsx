import React from 'react';

const ProfileSuccess = ({ email, role = 'Admin' }) => {
  return (
    <div className="flex flex-col text-right">
      <h4 className="text-sm text-white">{email}</h4>
      <p className="text-xs text-grey capitalize">{role}</p>
    </div>
  );
};

export default ProfileSuccess;
