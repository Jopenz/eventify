import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText } from '@ionic/react';

import './EventsPage.css';
import Event from '../../components/shared/event/Event';
import useEvents from '../../hooks/useEvents';
import { Title } from '../../components/shared/text/Text';

const EventsPage: React.FC = () => {
  const { events } = useEvents();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Events</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader className='header' collapse='condense'>
          <IonToolbar>
            <Title color='tertiary' size='lg'>
              Events
            </Title>
          </IonToolbar>
        </IonHeader>
        <div className='container'>{Array.isArray(events) && events.length > 0 ? events.map((event) => <Event key={event.id} {...event} />) : null}</div>
      </IonContent>
    </IonPage>
  );
};

export default EventsPage;
