const UploadedFileDisplay = ({ thumbnail, handleRemoveFile }) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-2 rounded-md border border-white/10 bg-tertiary px-2 py-2 shadow-sm lg:py-1">
      <i className="fa-regular fa-file-image text-lg text-gray-400"></i>
      <div className="flex w-full flex-1 items-center gap-1 overflow-hidden">
        <p className="flex-1 cursor-pointer truncate text-gray-400 whitespace-nowrap text-sm font-medium">
          {thumbnail.name}
        </p>
        <p className="flex items-center gap-1 text-xs text-white">
          <span>-</span>
          <span>{(thumbnail.size / 1024 / 1024).toFixed(2)}</span>
          <span>MB</span>
        </p>
      </div>
      <div
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full p-1.5 text-gray-600  hover:text-red-600"
        onClick={handleRemoveFile}
      >
        <i className="fa-solid fa-xmark"></i>
      </div>
    </div>
  </div>
);

export default UploadedFileDisplay;
