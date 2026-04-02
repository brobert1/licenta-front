import { Button } from '@components';

const OrderActionsMenu = ({ hide, invoiceUrl, isRefundable, onRefundClick }) => {
  const handleRefund = () => {
    hide();
    onRefundClick?.();
  };

  const hasActions = invoiceUrl || isRefundable;

  if (!hasActions) return null;

  return (
    <div className="absolute right-0 top-full z-30 mt-1 flex w-48 flex-col divide-y divide-border rounded-lg bg-white shadow-xl">
      <div className="p-2">
        {invoiceUrl && (
          <Button
            className="flex w-full items-center justify-start gap-2 rounded-xl px-2.5 py-1.5 font-normal text-primary hover:bg-secondary"
            href={invoiceUrl}
            onClick={hide}
            rel="noopener noreferrer"
            target="_blank"
          >
            <i className="fa-regular fa-file-invoice" />
            <p>Invoice</p>
          </Button>
        )}
        {isRefundable && (
          <Button
            className="flex w-full items-center justify-start gap-2 rounded-xl px-2.5 py-1.5 font-normal text-red-600 hover:bg-secondary"
            onClick={handleRefund}
          >
            <i className="fa-regular fa-rotate-left" />
            <p>Refund</p>
          </Button>
        )}
      </div>
    </div>
  );
};

export default OrderActionsMenu;
