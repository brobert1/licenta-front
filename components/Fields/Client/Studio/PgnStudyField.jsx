import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { isValidPgn, normalizePgn, pgnSplit, truncate } from '@functions';
import { toaster } from '@lib';
import { FileUploader } from 'react-drag-drop-files';

const PgnStudyField = ({ name, ...props }) => {
  const { register, setValue } = useFormContext();
  const [fileName, setFileName] = useState('');

  const handleUpload = (file) => {
    const extension = file.name.split('.').pop().toLowerCase();
    if (extension !== 'pgn') {
      toaster.error('Error! Only PGN files can be uploaded.');
      return;
    }

    setFileName(file.name);

    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onloadend = () => {
      const rawPgns = pgnSplit(fileReader.result);
      const validPgns = rawPgns.map(normalizePgn).filter((pgn) => {
        const valid = isValidPgn(pgn);
        if (!valid) {
          toaster.error('One or more PGNs in the file are invalid.');
        }
        return valid;
      });

      if (validPgns.length > 0) {
        setValue(name, validPgns.join('\n\n'));
      } else {
        toaster.error('No valid PGNs found in the file.');
      }
    };
  };

  return (
    <div className="flex flex-col gap-3">
      <textarea
        rows="8"
        className="textarea bg-tertiary text-white border-none w-full text-sm resize-none"
        placeholder="Paste your PGN text here, up to 64 games"
        {...register(name)}
        {...props}
      />
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-white/10"></div>
        <span className="text-gray-500 text-sm">OR</span>
        <div className="flex-1 h-px bg-white/10"></div>
      </div>
      <FileUploader
        handleChange={handleUpload}
        name={name}
        types={['PGN']}
        multiple={false}
        classes="focus-within:outline-none cursor-pointer w-full"
      >
        <div className="flex w-full items-center rounded-md border border-white/10 bg-tertiary px-4 py-3">
          <button
            type="button"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-white font-medium transition-colors"
          >
            Choose File
          </button>
          <span className="ml-4 text-gray-400">{truncate(fileName, 30) || 'No file chosen'}</span>
        </div>
      </FileUploader>
    </div>
  );
};

export default PgnStudyField;
