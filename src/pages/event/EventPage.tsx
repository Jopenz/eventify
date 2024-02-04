import { FC } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonImg, IonList, IonItem, IonButtons, IonBackButton } from '@ionic/react';

import './EventPage.css';
import { Caption, Title } from '../../components/shared/text/Text';
import { RouteComponentProps } from 'react-router';
import useEvents from '../../hooks/useEvents';
import { formatDate } from '../../commons/Helpers';
import Avatar from '../../components/shared/avatar/Avatar';
import Price from '../../components/shared/price/Price';
import Map from '../../components/shared/maps/Map';
import useUser from '../../hooks/useUser';

interface EventProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const EventPage: FC<EventProps> = ({ match }) => {
  const { id } = match.params;

  const { getEvent, loading } = useEvents();
  const { user } = useUser();

  const event = getEvent(id);

  if (loading) return <IonText>Loading...</IonText>;
  if (!event) return <IonText>Event not found</IonText>;

  const eventDate = formatDate(event.date);

  return (
    <IonPage className='event-page'>
      <IonHeader className='ion-no-border' mode='ios'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/events'></IonBackButton>
          </IonButtons>
          <IonTitle>Eventify</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
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
              <IonItem>
                <div className='flex flex-col w-full'>
                  <Title size='xs'>Location</Title>
                  <Map />
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
