const getRangeBackgroundStyle = (value, max) => {
  const percentage = (value / max) * 100;

  return `linear-gradient(to right, #CF2F7C 0%, #CF2F7C ${percentage}%, #d6d3d1 ${percentage}%, #d6d3d1 100%)`;
};

export default getRangeBackgroundStyle;
