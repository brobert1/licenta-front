import { Button } from '@components';
import { classnames } from '@lib';
import Calendar from 'react-calendar';
import { Modal } from 'react-bootstrap';

const DateTimePickerModal = ({
  isOpen,
  date,
  hour,
  minute,
  interval = 5,
  onSelectDate,
  onSelectHour,
  onSelectMinute,
  onOk,
  onCancel,
}) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: Math.ceil(60 / interval) }, (_, i) => i * interval);

  return (
    <Modal centered show={isOpen} onHide={onCancel} size="xl">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex gap-8">
          <div className="flex-1">
            <Calendar onClickDay={onSelectDate} defaultValue={date} />
          </div>
          <div className="flex items-center gap-2 border-l border-border pl-8">
            <div className="flex flex-col">
              <span className="text-xs text-muted text-center mb-2 font-medium uppercase tracking-wider">
                Hour
              </span>
              <ul className="scrollbar-thin h-64 w-16 list-none overflow-y-auto p-0">
                {hours.map((h) => (
                  <li
                    key={`hour-${h}`}
                    className={classnames(
                      'm-0 mb-1 flex h-9 cursor-pointer items-center justify-center rounded-lg p-0 transition-all text-sm font-medium',
                      hour === h
                        ? 'bg-accent text-white font-semibold'
                        : 'text-primary hover:bg-tertiary'
                    )}
                    onClick={() => onSelectHour(h)}
                  >
                    {h < 10 ? `0${h}` : h}
                  </li>
                ))}
              </ul>
            </div>
            <span className="text-primary text-2xl font-light pb-6">:</span>
            <div className="flex flex-col">
              <span className="text-xs text-muted text-center mb-2 font-medium uppercase tracking-wider">
                Min
              </span>
              <ul className="scrollbar-thin h-64 w-16 list-none overflow-y-auto p-0">
                {minutes.map((m) => (
                  <li
                    key={`minute-${m}`}
                    className={classnames(
                      'm-0 mb-1 flex h-9 cursor-pointer items-center justify-center rounded-lg p-0 transition-all text-sm font-medium',
                      minute === m
                        ? 'bg-accent text-white font-semibold'
                        : 'text-primary hover:bg-tertiary'
                    )}
                    onClick={() => onSelectMinute(m)}
                  >
                    {m < 10 ? `0${m}` : m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-border mt-6 pt-4">
          <Button className="button mini text-primary" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button className="button mini accent" type="button" onClick={onOk}>
            OK
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DateTimePickerModal;
