import { useFormContext } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { toaster } from '@lib';

const useFileUpload = (fieldName = 'image') => {
  const { setValue, watch } = useFormContext();
  const image = watch(fieldName);
  const [preview, setPreview] = useState(image?.path || null);

  const validateFile = useCallback((file) => {
    return file.size <= 5 * 1024 * 1024;
  }, []);

  const handleFileChange = useCallback(
    (file) => {
      if (file && validateFile(file)) {
        setValue(fieldName, file); // Update the field value in react-hook-form
        setPreview(URL.createObjectURL(file)); // Update the preview state
      } else {
        toaster.error('The file can have a maximum of 5MB'); // Error if file is too large
      }
    },
    [setValue, validateFile, fieldName]
  );

  const handleRemoveFile = useCallback(() => {
    setValue(fieldName, null); // Clear the field value in react-hook-form
    setPreview(null); // Clear the preview state
  }, [setValue, fieldName]);

  return {
    image,
    preview,
    handleFileChange,
    handleRemoveFile,
  };
};

export default useFileUpload;
