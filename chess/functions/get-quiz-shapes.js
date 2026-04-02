const getQuizShapes = (submitted, isTutorial, selected, options) => {
  if (submitted && !isTutorial) {
    if (!selected?.isCorrect) {
      const correct = options.find((o) => o.isCorrect);
      return [
        { orig: selected.from, dest: selected.to, brush: 'red' },
        ...(correct ? [{ orig: correct.from, dest: correct.to, brush: 'green' }] : []),
      ];
    }
    return selected ? [{ orig: selected.from, dest: selected.to, brush: 'green' }] : [];
  }
  return selected ? [{ orig: selected.from, dest: selected.to, brush: 'green' }] : [];
};

export default getQuizShapes;
