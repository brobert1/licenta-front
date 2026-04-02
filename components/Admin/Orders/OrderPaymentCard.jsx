import OrderRow from './OrderRow';

const CARD_ICONS = {
  visa: { icon: 'fa-brands fa-cc-visa', color: 'text-blue-600' },
  mastercard: { icon: 'fa-brands fa-cc-mastercard', color: 'text-red-500' },
  amex: { icon: 'fa-brands fa-cc-amex', color: 'text-blue-500' },
  paypal: { icon: 'fa-brands fa-cc-paypal', color: 'text-sky-500' },
};

const OrderPaymentCard = ({ payment, client }) => {
  const cardMeta = CARD_ICONS[payment.brand?.toLowerCase()] || {
    icon: 'fa-regular fa-credit-card',
    color: 'text-muted',
  };

  return (
    <div className="bg-surface border border-border p-4 lg:rounded-lg lg:p-6 flex flex-col gap-4">
      <h2 className="font-heading text-base font-semibold text-primary">Customer Information</h2>
      <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
        <i className={`${cardMeta.icon} text-3xl ${cardMeta.color}`} />
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-semibold text-primary capitalize">
            {payment.brand} •••• {payment.last4}
          </p>
          <p className="text-xs text-muted">
            Expires {payment.expMonth}/{payment.expYear}
          </p>
        </div>
      </div>
      <div>
        {client?.name && <OrderRow label="Name">{client.name}</OrderRow>}
        {client?.email && (
          <OrderRow label="Email">
            <span className="font-normal text-muted">{client.email}</span>
          </OrderRow>
        )}
        <OrderRow label="Billing address">
          <div className="flex flex-col items-end gap-0.5">
            {payment.billingAddress.line1 && <span>{payment.billingAddress.line1}</span>}
            {payment.billingAddress.line2 && (
              <span className="text-xs font-normal text-muted">{payment.billingAddress.line2}</span>
            )}
            <span className="text-xs font-normal text-muted">
              {[payment.billingAddress.city, payment.billingAddress.postalCode]
                .filter(Boolean)
                .join(', ')}
            </span>
          </div>
        </OrderRow>
        {payment.phone && <OrderRow label="Phone">{payment.phone}</OrderRow>}
      </div>
    </div>
  );
};

export default OrderPaymentCard;
