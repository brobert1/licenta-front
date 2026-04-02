import { useState } from 'react';
import { snakeCase } from 'lodash';
import { coffee, slugify } from '@functions';
import { cloneStudy } from '@api/client';
import { useMutation, useProfile } from '@hooks';
import { useRouter } from 'next/router';

const useExport = ({ activeChapter, study }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { me } = useProfile();
  const router = useRouter();

  const cloneStudyMutation = useMutation(cloneStudy, {
    invalidateQueries: '/studies',
  });

  const handleCopyPgn = async () => {
    try {
      await navigator.clipboard.writeText(activeChapter?.pgn || '');
      setIsCopied(true);
      await coffee(2000);
      setIsCopied(false);
    } catch (error) {
      console.error('Failed to copy PGN:', error);
    }
  };

  const handleExportPgn = () => {
    try {
      const pgn = activeChapter?.pgn || '';
      const blob = new Blob([pgn], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${snakeCase(activeChapter?.name)}.pgn`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export PGN:', error);
    }
  };

  const handleCloneStudy = async () => {
    const response = await cloneStudyMutation.mutateAsync(study._id);
    router.push(`/${me?.role}/studio/${slugify(response.data.name, response.data._id)}`);
  };

  const handleExportStudyPgn = () => {
    try {
      const allChaptersPgn =
        study?.chapters
          ?.map((chapter) => {
            return (chapter.pgn || '').trim();
          })
          .join('\n\n') || '';

      const blob = new Blob([allChaptersPgn], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${snakeCase(study?.name)}_study.pgn`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export study PGN:', error);
    }
  };

  return {
    isCopied,
    handleCopyPgn,
    handleExportPgn,
    handleCloneStudy,
    handleExportStudyPgn,
    isCloning: cloneStudyMutation.isLoading,
  };
};

export default useExport;
