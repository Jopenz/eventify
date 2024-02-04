import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { FC } from 'react';
import useEvents from '../../hooks/useEvents';
import Event from '../../components/shared/event/Event';
import { Title } from '../../components/shared/text/Text';

interface MyEventsPageProps {}

const MyEventsPage: FC<MyEventsPageProps> = () => {
  const { getMyEvents } = useEvents();

  const events = getMyEvents();

  return (
    <IonPage>
      <IonHeader className='ion-no-border' mode='ios'>
        <IonToolbar>
          <IonTitle>Eventify</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='ion-padding'>
        <IonHeader className='ion-no-border' mode='ios' collapse='fade'>
          <IonToolbar>
            <Title size='lg'>My Events</Title>
          </IonToolbar>
        </IonHeader>
        <div className='container events'>{Array.isArray(events) && events.length > 0 ? events.map((event) => <Event key={event.id} {...event} />) : null}</div>
      </IonContent>
    </IonPage>
  );
};

export default MyEventsPage;
