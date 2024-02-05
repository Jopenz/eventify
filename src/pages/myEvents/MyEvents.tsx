import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { FC } from 'react';
import useEvents from '../../hooks/useEvents';
import { Title } from '../../components/shared/text/Text';
import EventCard from './EventCard';
import { addOutline } from 'ionicons/icons';

interface MyEventsPageProps {}

const MyEventsPage: FC<MyEventsPageProps> = () => {
  const { getMyEvents } = useEvents();

  const events = getMyEvents();

  return (
    <IonPage>
      <IonHeader className='ion-no-border' mode='ios'>
        <IonToolbar>
          <IonTitle color='primary'>Eventify</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='ion-padding'>
        <IonHeader className='ion-no-border' mode='ios' collapse='fade'>
          <IonToolbar>
            <Title size='lg'>My Events</Title>
          </IonToolbar>
        </IonHeader>
        <div className='container events'>
          {Array.isArray(events) && events.length > 0 ? events.map((event) => <EventCard key={event.id} {...event} />) : null}
        </div>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton expand='block' href={'/myevents/new'}>
            <IonIcon size='small' aria-hidden='true' icon={addOutline} />
            <IonText color='light'>Create Event</IonText>
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default MyEventsPage;
