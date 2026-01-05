const ProfileSuccess = ({ name, email }) => {
  return (
    <div className="flex flex-col text-right">
      <p className="font-semibold text-white">{name}</p>
      <p className="text-sm text-grey">{email}</p>
    </div>
  );
};

export default ProfileSuccess;
