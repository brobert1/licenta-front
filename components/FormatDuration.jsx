const FormatDuration = ({ duration }) => {
  if (!duration) {
    return null;
  }

  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return (
    <span>
      {minutes} min {seconds > 0 && `${seconds} sec`}
    </span>
  );
};

export default FormatDuration;
