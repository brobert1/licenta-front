import { Button } from '@components';
import { FileUploaderWithPreview } from '@components/HookForm';
import { useFileUpload } from '@hooks';

const ThumbnailUpload = ({
  label = '',
  fieldName = 'image',
  types = ['JPEG', 'JPG', 'PNG', 'WEBP'],
  description = 'PNG, JPG, JPEG, WEBP up to 5MB',
}) => {
  const { preview, handleFileChange, handleRemoveFile } = useFileUpload(fieldName);

  return (
    <div className="flex flex-col gap-1 pb-4 lg:pb-0">
      {label && <p className="text-primary">{label}</p>}
      {preview ? (
        <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-border">
          <img src={preview} alt="Uploaded thumbnail" className="w-full h-full object-cover" />
          <Button
            onClick={handleRemoveFile}
            className="absolute top-2 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/50 hover:bg-red-600 text-white transition-colors"
          >
            <i className="fa-solid fa-xmark"></i>
          </Button>
        </div>
      ) : (
        <FileUploaderWithPreview
          types={types}
          preview={preview}
          handleFileChange={handleFileChange}
          description={description}
        />
      )}
    </div>
  );
};

export default ThumbnailUpload;
