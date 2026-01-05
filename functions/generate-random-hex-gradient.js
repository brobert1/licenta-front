const generateRandomHexGradient = () => {
  const randomHex = () =>
    '#' +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0');

  const fromColor = randomHex();
  const toColor = randomHex();
  return `linear-gradient(to right, ${fromColor}, ${toColor})`;
};

export default generateRandomHexGradient;
