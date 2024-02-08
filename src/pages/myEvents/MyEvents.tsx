import { FC, useEffect } from 'react';
import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonList, IonPage, IonText, IonTitle, IonToolbar, useIonModal, useIonRouter } from '@ionic/react';
import { Title } from '../../components/shared/text/Text';
import { addOutline } from 'ionicons/icons';
import useMyEvents from '../../hooks/useMyEvents';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import EventItem from './EventItem';
import { useHistory } from 'react-router';

interface MyEventsPageProps {}

const MyEventsPage: FC<MyEventsPageProps> = () => {
  const history = useHistory();
  const { events } = useMyEvents();

  const handleNew = () => {
    history.push('/myevents/new');
  };

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
            <IonText>
              <sub>Slide item to see options</sub>
            </IonText>
          </IonToolbar>
        </IonHeader>
        <div className='container events'>
          <IonList className='w-full ion-padding-top'>
            {Array.isArray(events) && events.length > 0 ? events.map((event) => <EventItem key={event.id} {...event} />) : null}
          </IonList>
        </div>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton expand='block' onClick={handleNew}>
            <IonIcon size='small' aria-hidden='true' icon={addOutline} />
            <IonText color='light'>Create Event</IonText>
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default MyEventsPage;
