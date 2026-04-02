import { useDisclosure } from '@hooks';
import { isValidDate } from '@functions';
import { format as dateFormat } from 'date-fns';
import { useEffect, useState } from 'react';
import { classnames } from '@lib';
import DateTimePickerModal from './DateTimePickerModal';

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

  const toIsoUtc = (d, h, m) => {
    const dateObj = new Date(d);
    dateObj.setHours(h, m, 0, 0);
    return dateObj.toISOString();
  };

  const formattedDisplay = () => {
    const dateObj = new Date(date);
    dateObj.setHours(hour, minute, 0, 0);
    return isValidDate(dateObj) ? dateFormat(dateObj, 'MM/dd/yyyy HH:mm') : '';
  };

  useEffect(() => {
    const next = toDate(value);
    if (!next) return;

    setDate(next);
    setHour(next.getHours());
    setMinute(next.getMinutes() - (next.getMinutes() % interval));
  }, [value, interval]);

  const handleOk = () => {
    if (onChange) {
      onChange(toIsoUtc(date, hour, minute));
    }
    hide();
  };

  const handleCancel = () => {
    hide();
    const d = toDate(value) || new Date();
    setDate(d);
    setHour(d.getHours());
    setMinute(d.getMinutes() - (d.getMinutes() % interval));
  };

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
        <DateTimePickerModal
          isOpen={isOpen}
          date={date}
          hour={hour}
          minute={minute}
          interval={interval}
          onSelectDate={setDate}
          onSelectHour={setHour}
          onSelectMinute={setMinute}
          onOk={handleOk}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default DateTimePicker;
