import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText } from '@ionic/react';
import './TodayPage.css';
import Event from '../../components/shared/event/Event';

import useEvents from '../../hooks/useEvents';
import Empty from '../../components/events/Empty';
import dayjs from 'dayjs';
import { Caption, Title } from '../../components/shared/text/Text';
const TodayPage: React.FC = () => {
  const { todayEvents } = useEvents();

  const date = dayjs().format('dddd.MMMM.DD');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Today</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader className='header' collapse='condense'>
          <IonToolbar>
            <Caption color='tertiary' size='sm' className='uppercase'>
              {date}
            </Caption>
            <Title color='tertiary' size='lg'>
              Today
            </Title>
          </IonToolbar>
        </IonHeader>
        <div className='container'>
          {Array.isArray(todayEvents) && todayEvents.length > 0 ? todayEvents.map((event) => <Event key={event.id} {...event} />) : <Empty />}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TodayPage;
