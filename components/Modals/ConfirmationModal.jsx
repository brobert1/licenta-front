const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        className="w-full max-w-sm rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-xl"
      >
        <h3 id="confirm-modal-title" className="font-headline text-xl text-on-surface">
          {title}
        </h3>
        <p className="mt-2 font-landing text-sm leading-relaxed text-secondary-muted">{message}</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-outline-variant/30 bg-surface-container py-3 font-landing text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container-high"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-red-600 py-3 font-landing text-sm font-bold text-white transition-colors hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
