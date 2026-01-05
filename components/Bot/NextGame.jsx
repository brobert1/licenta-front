import { Button } from '@components';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

const NextGame = ({ index, games }) => {
  const hasNextGame = useMemo(() => {
    return index < games.length - 1;
  }, [index, games.length]);

  const router = useRouter();
  const handleNextGame = () => {
    if (hasNextGame) {
      router.push(`/client/play/history#${index + 1}`);
    }
  };

  if (!hasNextGame) {
    return null;
  }

  return (
    <Button
      className="flex gap-2 items-center w-full text-white justify-center bg-accent p-2 rounded-b-md"
      onClick={handleNextGame}
    >
      Next game <i className="fa-solid fa-forward mt-1" />
    </Button>
  );
};

export default NextGame;
