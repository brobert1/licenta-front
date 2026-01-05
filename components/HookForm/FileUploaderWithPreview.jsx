import { FileUploader } from 'react-drag-drop-files';

const FileUploaderWithPreview = ({ types, preview, handleFileChange, description }) => (
  <FileUploader
    classes="focus-within:outline-none cursor-pointer"
    handleChange={handleFileChange}
    name="file"
    types={types}
  >
    {preview ? (
      <img
        src={preview}
        alt="Preview"
        className="aspect-square h-full w-full rounded-md object-cover shadow-sm"
      />
    ) : (
      <div className="flex aspect-square h-full w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-white/10 bg-tertiary">
        <i className="fa-regular fa-image pb-3 text-3xl text-gray-400"></i>
        <div className="flex cursor-pointer items-center gap-1.5">
          <button className="font-semibold text-primary hover:underline hover:decoration-1">
            Choose a file
          </button>
          <p className="hidden text-gray-500 lg:block">or drag and drop</p>
        </div>
        <p className="text-gray-500">{description}</p>
      </div>
    )}
  </FileUploader>
);

export default FileUploaderWithPreview;
