import { SetStateAction, useState } from 'react';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import { format, parseISO } from 'date-fns';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './date-range-style.css';
export interface CustomReactDateRangeProps {
  triggerButton: (
    open: boolean,
    setOpen: React.Dispatch<SetStateAction<boolean>>,
  ) => React.ReactNode;
  onChangeRage?: (values: Range) => void;
}

export function CustomReactDateRange({ triggerButton, onChangeRage }: CustomReactDateRangeProps) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: undefined,
      key: 'selection',
    },
  ]);

  const handleSelectDate = (values: any) => {
    setState([values.selection]);

    onChangeRage && onChangeRage(values.selection);
  };
  return (
    <div className="date-range-wrapper">
      {triggerButton(open, setOpen)}
      {open ? (
        <div style={{ position: 'absolute', top: '110%', left: 0 }}>
          <DateRange
            editableDateInputs={true}
            onChange={handleSelectDate}
            moveRangeOnFirstSelection={false}
            ranges={state}
          />
        </div>
      ) : null}
    </div>
  );
}
