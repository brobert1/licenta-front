import { Time } from '@components';

const TimelineEvent = ({ event, isLast }) => (
  <div className="flex gap-3">
    <div className="flex flex-col items-center">
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-secondary border border-border">
        <i className={`${event.icon} text-[11px] text-muted`} />
      </div>
      {!isLast && <div className="mt-1 w-px flex-1 bg-border" />}
    </div>
    <div className="pb-4 min-w-0">
      <p className="text-sm font-semibold text-primary">{event.label}</p>
      {event.description && <p className="mt-0.5 text-xs text-muted">{event.description}</p>}
      <p className="mt-0.5 text-xs text-muted">
        <Time value={event.timestamp} />
      </p>
    </div>
  </div>
);

const OrderTransactionCard = ({ invoiceUrl, timeline }) => (
  <div className="bg-surface border border-border p-4 lg:rounded-lg lg:p-6 flex flex-col gap-4">
    <h2 className="font-heading text-base font-semibold text-primary">Transaction Details</h2>
    {invoiceUrl && (
      <a
        href={invoiceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 self-start rounded-lg border border-border bg-secondary px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-tertiary"
      >
        <i className="fa-regular fa-file-invoice text-muted" />
        View Invoice
        <i className="fa-regular fa-arrow-up-right-from-square text-xs text-muted" />
      </a>
    )}
    {timeline?.length > 0 && (
      <>
        {invoiceUrl && <div className="border-t border-border" />}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
            Recent Activity
          </p>
          <div>
            {timeline.map((event, i) => (
              <TimelineEvent key={event.type} event={event} isLast={i === timeline.length - 1} />
            ))}
          </div>
        </div>
      </>
    )}
  </div>
);

export default OrderTransactionCard;
