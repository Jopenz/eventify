import { FC } from 'react';
import { IonIcon, IonLabel } from '@ionic/react';
import { calendarClearOutline } from 'ionicons/icons';
import './Today.css';

export interface TodayProps {
  day: number;
}

const Today: FC<TodayProps> = ({ day }) => {
  const formatNumber = (num: number): string => {
    if (num >= 1 && num <= 9) {
      return `0${num}`;
    } else {
      return num.toString();
    }
  };

  return (
    <>
      <IonIcon aria-hidden='true' icon={calendarClearOutline} />
      <div className='today'>
        <IonLabel class='icon-day'>{formatNumber(day)}</IonLabel>
      </div>
    </>
  );
};

export default Today;
