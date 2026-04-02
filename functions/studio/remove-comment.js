const removeCommentFromMoment = (tree, moment) => {
  if (!tree || !moment) {
    return tree;
  }

  return tree.map((branch) => {
    return branch.map((m) => {
      // Remove comment from the targeted moment
      if (m.index === moment.index) {
        const { comment, ...momentWithoutComment } = m;
        return momentWithoutComment;
      }
      return m;
    });
  });
};

export default removeCommentFromMoment;
