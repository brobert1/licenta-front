import { useState } from 'react';
import Image from './Image';
import { ImageDelete, ImageUpload } from '@components/Buttons';

const ImageCombo = ({ uuid, src }) => {
  const [status, setStatus] = useState('idle');

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
      <Image src={src} status={status} />
      <div className="w-full min-w-0 text-center sm:flex-1 sm:text-left">
        <p className="mb-1 text-xs text-muted sm:text-sm">
          Here you can upload your profile picture.
        </p>
        <p className="mb-2 text-xs text-muted sm:text-sm">
          The image should be at least 200x200px, JPG or PNG format and up to 5MB.
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
          <ImageUpload uuid={uuid} setStatus={setStatus} />
          {src && <ImageDelete setStatus={setStatus} />}
        </div>
      </div>
    </div>
  );
};

export default ImageCombo;
