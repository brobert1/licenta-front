const getChapterByIndex = (chapters, index) => {
  return chapters.find((chapter) => chapter.index === index) || chapters[0];
};

export default getChapterByIndex;
