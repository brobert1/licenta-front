import { useDisclosure } from '@hooks';
import Calendar from 'react-calendar';
import { Modal } from 'react-bootstrap';
import { classnames } from '@lib';
import { isValidDate } from '@functions';
import { format as dateFormat } from 'date-fns';
import { useEffect, useState } from 'react';
import { Button } from '@components';

const toDate = (value) => {
  try {
    if (!value) return null;
    const d = new Date(value);
    return isValidDate(d) ? d : null;
  } catch {
    return null;
  }
};

const DateTimePicker = ({ value, onChange, disabled = false, interval = 5, placeholder }) => {
  const { isOpen, show, hide } = useDisclosure();

  const initial = toDate(value) || new Date();
  const [date, setDate] = useState(initial);
  const [hour, setHour] = useState(initial.getHours());
  const [minute, setMinute] = useState(initial.getMinutes() - (initial.getMinutes() % interval));

  const formatDateTime = (d, h, m) => {
    const dateObj = new Date(d);
    dateObj.setHours(h, m, 0, 0);
    return dateFormat(dateObj, "yyyy-MM-dd'T'HH:mm");
  };

  const formattedDisplay = () => {
    const dateObj = new Date(date);
    dateObj.setHours(hour, minute, 0, 0);
    return isValidDate(dateObj) ? dateFormat(dateObj, 'MM/dd/yyyy HH:mm') : '';
  };

  useEffect(() => {
    if (onChange) {
      onChange(formatDateTime(date, hour, minute));
    }
  }, [date, hour, minute]);

  const handleOk = () => hide();

  const handleCancel = () => {
    hide();
    const d = toDate(value) || new Date();
    setDate(d);
    setHour(d.getHours());
    setMinute(d.getMinutes() - (d.getMinutes() % interval));
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: Math.ceil(60 / interval) }, (_, i) => i * interval);

  return (
    <div className="relative">
      <div className="relative" onClick={disabled ? undefined : show}>
        <input
          className={classnames('input pr-8', disabled && 'cursor-not-allowed opacity-60')}
          disabled={disabled}
          placeholder={placeholder || 'MM/DD/YYYY HH:mm'}
          readOnly
          type="text"
          value={formattedDisplay()}
        />
        <span className="pointer-events-none absolute right-0 top-0 grid h-full place-items-center p-2.5 outline-none">
          <i className="fa-regular fa-calendar-days text-primary"></i>
        </span>
      </div>
      {isOpen && (
        <Modal centered show={true} onHide={handleCancel} size="xl">
          <div className="bg-secondary border border-white/10 rounded-xl p-6">
            <div className="flex gap-8">
              <div className="flex-1">
                <Calendar onClickDay={setDate} defaultValue={date} />
              </div>
              <div className="flex items-center gap-2 border-l border-white/10 pl-8">
                <div className="flex flex-col">
                  <span className="text-xs text-white/60 text-center mb-2 font-medium">Hour</span>
                  <ul className="scrollbar-thin h-64 w-16 list-none overflow-y-auto p-0">
                    {hours.map((h) => (
                      <li
                        key={`hour-${h}`}
                        className={classnames(
                          'm-0 mb-1 flex h-9 cursor-pointer items-center justify-center rounded-lg p-0 text-white transition-all',
                          hour === h ? 'bg-primary font-semibold' : 'hover:bg-white/10'
                        )}
                        onClick={() => setHour(h)}
                      >
                        {h < 10 ? `0${h}` : h}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="text-white text-2xl font-light pb-6">:</span>
                <div className="flex flex-col">
                  <span className="text-xs text-white/60 text-center mb-2 font-medium">Minute</span>
                  <ul className="scrollbar-thin h-64 w-16 list-none overflow-y-auto p-0">
                    {minutes.map((m) => (
                      <li
                        key={`minute-${m}`}
                        className={classnames(
                          'm-0 mb-1 flex h-9 cursor-pointer items-center justify-center rounded-lg p-0 text-white transition-all',
                          minute === m ? 'bg-primary font-semibold' : 'hover:bg-white/10'
                        )}
                        onClick={() => setMinute(m)}
                      >
                        {m < 10 ? `0${m}` : m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 border-t border-white/10 mt-6 pt-4">
              <Button className="button mini text-black" type="button" onClick={handleCancel}>
                Cancel
              </Button>
              <Button className="button mini primary" type="button" onClick={handleOk}>
                OK
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DateTimePicker;
