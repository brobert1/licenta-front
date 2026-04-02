import { useEffect, useState } from 'react';
import { TIME_CONTROL_OPTIONS } from '@constants/time-controls';

const TimeControl = ({ value, onChange }) => {
  const [timeMode, setTimeMode] = useState(value?.mode || 'unlimited');
  const [selectedTimeControl, setSelectedTimeControl] = useState('10|0');

  // Update local state when props change
  useEffect(() => {
    if (value) {
      setTimeMode(value.mode || 'unlimited');
      if (value.mode === 'realtime') {
        setSelectedTimeControl(`${value.minutes || 10}|${value.increment || 0}`);
      }
    }
  }, [value]);

  const handleTimeModeChange = (mode) => {
    setTimeMode(mode);
    if (onChange) {
      if (mode === 'unlimited') {
        onChange({ mode, minutes: 10, increment: 0 });
      } else {
        const [minutes, increment] = selectedTimeControl.split('|').map(Number);
        onChange({ mode, minutes, increment });
      }
    }
  };

  const handleTimeControlChange = (timeControlValue) => {
    setSelectedTimeControl(timeControlValue);
    if (timeMode === 'realtime' && onChange) {
      const [minutes, increment] = timeControlValue.split('|').map(Number);
      onChange({ mode: timeMode, minutes, increment });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-primary text-sm font-medium">Time Control</h4>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={timeMode === 'unlimited'}
            onChange={() => handleTimeModeChange('unlimited')}
            className="w-4 h-4 text-accent border-border rounded focus:ring-accent focus:ring-2"
          />
          <span className="text-primary text-sm">Unlimited</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={timeMode === 'realtime'}
            onChange={() => handleTimeModeChange('realtime')}
            className="w-4 h-4 text-accent border-border rounded focus:ring-accent focus:ring-2"
          />
          <span className="text-primary text-sm">Real Time</span>
        </label>
      </div>
      {timeMode === 'realtime' && (
        <div className="flex flex-col gap-1 mt-1">
          <select
            value={selectedTimeControl}
            onChange={(e) => handleTimeControlChange(e.target.value)}
            className="bg-surface border border-border text-primary text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-accent hover:border-accent/50 transition-colors w-full"
          >
            {TIME_CONTROL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default TimeControl;
