import { FC } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonImg, useIonRouter, IonList, IonItem } from '@ionic/react';
import './EventPage.css';
import { Caption, Title } from '../../components/shared/text/Text';
import { RouteComponentProps } from 'react-router';
import useEvents from '../../hooks/useEvents';
import { formatDate } from '../../commons/Helpers';
import Avatar from '../../components/shared/avatar/Avatar';
import Price from '../../components/shared/price/Price';

interface EventProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const EventPage: FC<EventProps> = ({ match }) => {
  const { id } = match.params;
  const router = useIonRouter();

  const handleBack = () => {
    router.push('/events', 'back', 'push');
  };

  const { getEvent, loading } = useEvents();

  const event = getEvent(id);

  if (loading) return <IonText>Loading...</IonText>;
  if (!event) return <IonText>Event not found</IonText>;

  const eventDate = formatDate(event.date);

  return (
    <IonPage className='event-page'>
      <IonContent fullscreen>
        <IonHeader className='header-event' collapse='fade'>
          <IonToolbar color='transparent'>
            <IonText className='uppercase' onClick={handleBack}>
              Back
            </IonText>
          </IonToolbar>
        </IonHeader>
        <div className='event-container'>
          <IonImg className='event-image' src={event.image} />
          <div className='event-info'>
            <IonList lines='none'>
              <IonItem>
                <div className='event-title-info'>
                  <Caption>{event.category}</Caption>
                  <Title>{event.title}</Title>
                  <Caption>{event.location}</Caption>
                </div>
              </IonItem>
              <IonItem>
                <div className='flex flex-row w-full justify-between'>
                  <IonText>{eventDate.format('LLL')}</IonText>
                  <Price price={event.price} />
                </div>
              </IonItem>
              <IonItem>
                <Avatar backgroundColor='primary' src={event.organizer.avatar} name={event.organizer.name} />
                <div>
                  <IonText>{event.organizer.name}</IonText>
                  <Caption size='sm'>Organizer</Caption>
                </div>
              </IonItem>
              <IonItem>
                <div className='description'>
                  <Title size='xs'>About</Title>
                  <IonText className='text'>{event.description}</IonText>
                </div>
              </IonItem>
            </IonList>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EventPage;
