const Thumbnail = ({
  icon = <i className="fa-solid fa-photo-film"></i>,
  thumbnail,
  size = '9',
}) => {
  if (!thumbnail) {
    return (
      <div
        className={`flex items-center justify-center rounded-full bg-gray-200 w-${size} h-${size}`}
      >
        {icon}
      </div>
    );
  }

  return (
    <>
      <div className={`relative w-${size} h-${size} overflow-hidden`}>
        <img
          alt="profile"
          className="rounded-full object-cover object-center w-full h-full"
          src={thumbnail}
        />
      </div>
    </>
  );
};

export default Thumbnail;
