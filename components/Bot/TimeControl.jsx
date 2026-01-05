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
    <div className="flex flex-col gap-3">
      <h4 className="text-white text-sm font-medium">Time Control</h4>
      <div className="flex gap-8">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={timeMode === 'unlimited'}
            onChange={() => handleTimeModeChange('unlimited')}
            className="w-4 h-4 text-accent border-gray-500 rounded focus:ring-accent focus:ring-2"
          />
          <span className="text-white">Unlimited</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={timeMode === 'realtime'}
            onChange={() => handleTimeModeChange('realtime')}
            className="w-4 h-4 text-accent border-gray-500 rounded focus:ring-accent focus:ring-2"
          />
          <span className="text-white">Real Time</span>
        </label>
      </div>
      {timeMode === 'realtime' && (
        <div className="flex flex-col gap-2 mt-2">
          <label className="text-neutral-300">Time Control:</label>
          <select
            value={selectedTimeControl}
            onChange={(e) => handleTimeControlChange(e.target.value)}
            className="bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
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
