import { IonBackButton, IonButtons, IonContent, IonDatetime, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { FC, useEffect, useState } from 'react';
import { Title } from '../../components/shared/text/Text';
import useEvents from '../../hooks/useEvents';
import dayjs from 'dayjs';

import './CalendarPage.css';

interface CalendarPageProps {}

interface DatetimeHighlight {
  date: string;
  textColor: string;
  backgroundColor: string;
}

const CalendarPage: FC<CalendarPageProps> = () => {
  const [dates, setDates] = useState<DatetimeHighlight[]>([]);
  const { events, search, setSearch } = useEvents();
  useEffect(() => {
    if (Array.isArray(events) && events.length > 0) {
      const dates = events.map((event) => {
        return {
          date: dayjs(event.date).format('YYYY-MM-DD'),
          textColor: '#fff',
          backgroundColor: '#00b17f',
        };
      });
      setDates(dates);
    }
  }, [events]);

  return (
    <IonPage className='calendar-page'>
      <IonHeader className='ion-no-border' mode='ios'>
        <IonToolbar>
          <IonTitle color={'primary'}>Eventify</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='ion-padding'>
        <IonHeader className='ion-no-border ion-padding-top' mode='ios' collapse='fade'>
          <IonToolbar>
            <Title size='lg'>Calendar</Title>
            <IonText>
              <sub>
                Browse our events calendar to stay up to date on upcoming activities. From conferences to cultural events, you'll find a variety of options to
                get involved.
              </sub>
            </IonText>
          </IonToolbar>
        </IonHeader>
        <div className='container events'>
          <IonDatetime presentation='date' color='dark' value={dayjs().format('YYYY-MM-DD')} highlightedDates={dates}></IonDatetime>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CalendarPage;
