import { FC, useEffect } from 'react';
import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonText, IonTitle, IonToolbar, useIonModal } from '@ionic/react';
import { Title } from '../../components/shared/text/Text';
import EventCard from './EventCard';
import { addOutline } from 'ionicons/icons';
import useMyEvents from '../../hooks/useMyEvents';
import EventModal from '../../modals/event/EventModal';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

interface MyEventsPageProps {}

const MyEventsPage: FC<MyEventsPageProps> = () => {
  const [present, dismiss] = useIonModal(EventModal, {
    onDismiss: (data: string, role: string) => dismiss(data, role),
  });

  const { events, selected, addEvent, editEvent, setOpen } = useMyEvents();

  function openModal() {
    present({
      onDidDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        setOpen(0);
      },
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === 'confirm') {
          setOpen(0);
          if (ev.detail.data.id) {
            editEvent(ev.detail.data);
          } else {
            addEvent(ev.detail.data);
          }
        }
      },
    });
  }

  useEffect(() => {
    if (!selected) return;
    openModal();
  }, [selected]);

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
          <IonButton
            expand='block'
            onClick={() => {
              setOpen(0);
              openModal();
            }}
          >
            <IonIcon size='small' aria-hidden='true' icon={addOutline} />
            <IonText color='light'>Create Event</IonText>
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default MyEventsPage;
