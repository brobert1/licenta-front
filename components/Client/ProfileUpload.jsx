import { FileUploaderWithPreview, UploadedFileDisplay } from '@components/HookForm';
import { useFileUpload } from '@hooks';

const ProfileUpload = ({
  label = '',
  fieldName = 'image',
  types = ['JPEG', 'JPG', 'PNG'],
  description = 'PNG, JPG, JPEG până la 5MB',
}) => {
  const { image, preview, handleFileChange, handleRemoveFile } = useFileUpload(fieldName);

  return (
    <div className="flex flex-col gap-4 pb-4 lg:pb-0">
      <div className="flex flex-col gap-1">
        <p className="text-white">{label}</p>
        <FileUploaderWithPreview
          types={types}
          preview={preview}
          handleFileChange={handleFileChange}
          description={description}
        />
      </div>
      {image && <UploadedFileDisplay thumbnail={image} handleRemoveFile={handleRemoveFile} />}
    </div>
  );
};

export default ProfileUpload;
