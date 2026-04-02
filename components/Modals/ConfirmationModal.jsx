import { Button } from '@components';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-surface border border-border rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl animate-fade-in-up">
        <h3 className="text-xl font-heading font-semibold text-primary mb-3">{title}</h3>
        <p className="text-muted mb-8 leading-relaxed">{message}</p>
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={onClose}
            className="px-4 py-2.5 bg-secondary text-primary font-medium rounded-lg hover:bg-border transition-colors border border-border"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
