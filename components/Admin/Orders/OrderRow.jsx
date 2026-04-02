const OrderRow = ({ label, children }) => (
  <div className="flex items-start justify-between gap-4 py-3 border-b border-border last:border-0">
    <span className="text-xs font-medium uppercase tracking-wider text-muted flex-shrink-0">
      {label}
    </span>
    <div className="text-sm font-semibold text-primary text-right">{children}</div>
  </div>
);

export default OrderRow;
