import { Button } from '@components';
import { useDisclosure } from '@hooks';
import OrderPaymentCard from './OrderPaymentCard';
import OrderRefundCard from './OrderRefundCard';
import OrderRefundModal from './OrderRefundModal';
import OrderSummaryCard from './OrderSummaryCard';
import OrderTransactionCard from './OrderTransactionCard';

const OrderPageContent = ({ data }) => {
  const { client, order, payment, timeline, invoiceUrl, refund } = data;
  const isRefunded = Boolean(order.refundedAt ?? refund);
  const { isOpen, show, hide } = useDisclosure();

  return (
    <div className="flex flex-col gap-4">
      {!isRefunded && (
        <div className="flex justify-end">
          <Button
            className="button flex items-center justify-center gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-100"
            onClick={show}
          >
            <i className="fa-regular fa-rotate-left text-xs" />
            Refund Order
          </Button>
        </div>
      )}
      <OrderSummaryCard order={order} refundedAt={order.refundedAt} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {payment && <OrderPaymentCard payment={payment} client={client} />}
        <OrderTransactionCard invoiceUrl={invoiceUrl} timeline={timeline} />
      </div>
      {isRefunded && refund && <OrderRefundCard refund={refund} />}
      <OrderRefundModal
        orderId={order._id}
        courseName={order.course?.name}
        isOpen={isOpen}
        onClose={hide}
      />
    </div>
  );
};

export default OrderPageContent;
