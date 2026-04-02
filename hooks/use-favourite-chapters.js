import { useCallback, useState } from 'react';

const STORAGE_KEY = 'favourite-chapters';

const readAll = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const readForStudy = (studyId) => {
  if (!studyId) return [];
  const all = readAll();
  return all.find((entry) => entry.study === studyId)?.chapters || [];
};

const persistForStudy = (studyId, chapters) => {
  const all = readAll();
  const idx = all.findIndex((entry) => entry.study === studyId);

  if (chapters.length === 0) {
    if (idx !== -1) all.splice(idx, 1);
  } else if (idx !== -1) {
    all[idx].chapters = chapters;
  } else {
    all.push({ study: studyId, chapters });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
};

const useFavouriteChapters = (studyId) => {
  const [favourites, setFavourites] = useState(() => readForStudy(studyId));

  const isFavourite = useCallback((chapterId) => favourites.includes(chapterId), [favourites]);

  const toggleFavourite = useCallback(
    (chapterId) => {
      setFavourites((prev) => {
        const next = prev.includes(chapterId)
          ? prev.filter((id) => id !== chapterId)
          : [...prev, chapterId];
        persistForStudy(studyId, next);
        return next;
      });
    },
    [studyId]
  );

  return { favourites, isFavourite, toggleFavourite };
};

export default useFavouriteChapters;
