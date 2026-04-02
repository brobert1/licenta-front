import { Button, Link, Price } from '@components';
import { RefundModal } from '@components/Modals';
import { REFUND_WINDOW_MS } from '@constants/refund';
import { formatDate, slugify, stripTags } from '@functions';
import { useDisclosure, useOnClickOutside } from '@hooks';
import { useRef } from 'react';
import OrderActionsMenu from './OrderActionsMenu';

const OrderCard = ({ order }) => {
  const courseHref = `/client/courses/${slugify(order.course.name, order.course._id)}`;
  const menuRef = useRef();

  const { isOpen: isMenuOpen, hide: hideMenu, toggle: toggleMenu } = useDisclosure(false);
  const { isOpen: isRefundOpen, hide: hideRefund, show: showRefund } = useDisclosure(false);

  useOnClickOutside(menuRef, hideMenu);

  const isRefundable =
    order.amount > 0 &&
    !order.refundedAt &&
    Date.now() - new Date(order.createdAt).getTime() < REFUND_WINDOW_MS;

  const isRefunded = Boolean(order.refundedAt);
  const hasActions = order.stripeInvoiceUrl || isRefundable;

  return (
    <div className="relative flex flex-col gap-4 rounded-xl bg-white p-3.5 shadow-sm lg:flex-row lg:p-5">
      {hasActions && (
        <div ref={menuRef} className="absolute right-4 top-4 z-20">
          <Button
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary text-primary transition-colors hover:bg-tertiary"
            onClick={toggleMenu}
          >
            <i className="fa-solid fa-ellipsis-vertical text-lg" />
          </Button>
          {isMenuOpen && (
            <OrderActionsMenu
              hide={hideMenu}
              invoiceUrl={order.stripeInvoiceUrl}
              isRefundable={isRefundable}
              onRefundClick={showRefund}
            />
          )}
        </div>
      )}
      <Link
        href={courseHref}
        className="relative z-0 flex flex-1 flex-col gap-4 transition-opacity hover:opacity-90 lg:flex-row"
      >
        <div className="hidden overflow-hidden w-40 flex-shrink-0 aspect-square rounded-lg lg:block">
          <img
            alt={order.course.name}
            className="h-full w-full object-cover"
            src={order.course.image?.path}
          />
        </div>
        <div className="flex flex-col justify-between gap-4 w-full">
          <div className="flex flex-col gap-2">
            <div className="flex gap-3 items-center">
              <div className="flex overflow-hidden w-16 flex-shrink-0 aspect-square rounded-lg lg:hidden">
                <img
                  alt={order.course.name}
                  className="h-full w-full object-cover"
                  src={order.course.image?.path}
                />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold text-primary lg:text-xl">
                  {order.course.name}
                </h2>
                <div className="flex gap-2 items-center">
                  <span className="rounded-sm bg-accent px-1 py-0.5 text-xs font-bold text-white">
                    {order.course.author?.title}
                  </span>
                  <p className="text-sm font-semibold text-primary">{order.course.author?.name}</p>
                </div>
              </div>
            </div>
            <div className="line-clamp-3 overflow-hidden">
              <p className="text-sm font-semibold text-muted whitespace-pre-line first-letter:uppercase">
                {stripTags(order.course.description)}
              </p>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-2 text-sm mt-1 lg:mt-0 lg:absolute lg:bottom-5 lg:left-[calc(160px+2.5rem)]">
        <div className="flex items-center gap-1.5">
          <i className="fa-regular fa-calendar text-muted" />
          <p className="font-semibold text-primary">
            {formatDate(order.createdAt, 'MMM dd, yyyy')}
          </p>
        </div>
        <span className="text-grey">|</span>
        <div className="flex items-center gap-1.5">
          <i className="fa-regular fa-tag text-muted" />
          {order.amount === 0 ? (
            <p className="font-semibold text-green-600">Free</p>
          ) : (
            <p className="font-semibold text-primary uppercase">
              {order.currency} <Price value={order.amount} precision={2} />
            </p>
          )}
        </div>
        {isRefunded && (
          <span className="ml-1 inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-400">
            <i className="fa-regular fa-rotate-left text-[10px]" />
            Refunded
          </span>
        )}
      </div>
      <RefundModal
        courseName={order.course.name}
        isOpen={isRefundOpen}
        onClose={hideRefund}
        orderId={order._id}
      />
    </div>
  );
};

export default OrderCard;
