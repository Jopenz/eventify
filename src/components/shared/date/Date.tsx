import { FC } from 'react';
import './Date.css';

export interface DateProps {
  day: string;
  month: string;
}

const Date: FC<DateProps> = ({ day, month }) => {
  return (
    <div className='date'>
      <div className='day'>{day.slice(0, 2)}</div>
      <div className='month'>{month.slice(0, 3)}</div>
    </div>
  );
};

export default Date;
