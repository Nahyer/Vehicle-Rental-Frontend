// src/components/DateRangePicker.js
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="flex space-x-4">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date || new Date())}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        className="p-2 border rounded"
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date || new Date())}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        className="p-2 border rounded"
      />
    </div>
  );
};

export default DateRangePicker;
