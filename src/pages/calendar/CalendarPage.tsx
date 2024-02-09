import { IonBackButton, IonButtons, IonContent, IonDatetime, IonHeader, IonItem, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { FC, useEffect, useState } from 'react';
import { Title } from '../../components/shared/text/Text';
import useEvents from '../../hooks/useEvents';
import dayjs from 'dayjs';

import './CalendarPage.css';
import EventList from './EventList';
import Event from '../../types/Event';

interface CalendarPageProps {}

interface DatetimeHighlight {
  date: string;
  textColor: string;
  backgroundColor: string;
}

const CalendarPage: FC<CalendarPageProps> = () => {
  const [dates, setDates] = useState<DatetimeHighlight[]>([]);
  const [eventDays, setEventDays] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
  const { events, searchEventsByDate } = useEvents();
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

  useEffect(() => {
    if (selectedDate) {
      const events = searchEventsByDate(dayjs(selectedDate).toDate());
      setEventDays(events);
    }
  }, [selectedDate, events]);

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
          <IonDatetime
            presentation='date'
            multiple={false}
            onIonChange={(e) => {
              if (Array.isArray(e.detail.value)) {
                setSelectedDate(e.detail.value[0]);
              } else {
                setSelectedDate(e.detail.value!);
              }
            }}
            color='dark'
            value={selectedDate}
            highlightedDates={dates}
          ></IonDatetime>
          <IonItem>
            <EventList events={eventDays} />
          </IonItem>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CalendarPage;
