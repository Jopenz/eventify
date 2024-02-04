import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonSearchbar } from '@ionic/react';

import './EventsPage.css';
import Event from '../../components/shared/event/Event';
import useEvents from '../../hooks/useEvents';
import { Title } from '../../components/shared/text/Text';
import Header from '../../components/header/Header';
import ExploreContainer from '../../components/ExploreContainer';

const EventsPage: React.FC = () => {
  const { events } = useEvents();

  return (
    <IonPage>
      <IonHeader className='ion-no-border' mode='ios'>
        <IonToolbar>
          <IonTitle>Eventify</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='ion-padding'>
        <IonHeader className='ion-no-border' mode='ios' collapse='fade'>
          <IonToolbar>
            <Title size='lg'>Events</Title>
          </IonToolbar>
        </IonHeader>
        <div className='container events'>{Array.isArray(events) && events.length > 0 ? events.map((event) => <Event key={event.id} {...event} />) : null}</div>
      </IonContent>
    </IonPage>
  );
};

export default EventsPage;
