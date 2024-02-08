import { FC, memo, createRef, useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonImg,
  IonList,
  IonItem,
  IonButtons,
  IonBackButton,
  IonLabel,
  IonIcon,
  IonButton,
} from '@ionic/react';

import './EventPage.css';
import { Caption, Title } from '../../components/shared/text/Text';
import { RouteComponentProps } from 'react-router';
import useEvents from '../../hooks/useEvents';
import { formatDate } from '../../commons/Helpers';
import Avatar from '../../components/shared/avatar/Avatar';
import Price from '../../components/shared/price/Price';
import Map from '../../components/shared/maps/Map';
import useUser from '../../hooks/useUser';
import People from '../../components/shared/people/People';
import { heart, heartOutline, star } from 'ionicons/icons';
import Event from '../../types/Event';
import LoaderSpinner from '../../components/shared/loader/LoaderSpinner';

interface EventProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const EventPage: FC<EventProps> = ({ match }) => {
  const { id } = match.params;
  const [owner, setOwner] = useState(false);
  const [following, setFollowing] = useState(false);
  const contentRef = createRef<HTMLIonContentElement>();

  const { loading, event, followEvent, unFollowEvent, setOpen } = useEvents();
  const { user } = useUser();

  useEffect(() => {
    setOpen(Number(id));
  }, [id]);

  useEffect(() => {
    if (user && event) {
      setOwner(event.organizer.id === user.id);
      setFollowing(event.followers.some((follower) => follower.id === user.id));
    }
  }, [event, user]);

  if (!event) return <IonText>Event not found</IonText>;

  const eventDate = formatDate(event.date);

  const handleFollow = () => {
    if (user) {
      unFollowEvent(event.id, user);
    }
  };

  const handleUnFollow = () => {
    if (user) {
      followEvent(event.id, user);
    }
  };

  console.log('event', event.followers);

  return (
    <IonPage className='event-page'>
      <IonHeader className='ion-no-border' mode='ios'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/events'></IonBackButton>
          </IonButtons>
          <IonTitle color={'primary'}>Eventify</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent ref={contentRef} style={{ background: 'transparent' }}>
        <div className='event-container h-full'>
          {loading && <LoaderSpinner />}
          {!loading && event && (
            <>
              <IonImg className='event-image' src={event.image} />
              <div className='event-info'>
                <IonList lines='none'>
                  <IonItem lines='none'>
                    <div className='event-title-info'>
                      <Caption>{event.category}</Caption>
                      <Title>{event.title}</Title>
                      <Caption>{event.location}</Caption>
                    </div>
                  </IonItem>
                  <IonItem lines='none' className='ion-padding-vertical'>
                    <Avatar backgroundColor='primary' src={event.organizer.avatar} name={event.organizer.name} />
                    <div className='ion-padding-start'>
                      <IonLabel>
                        <h2>{event.organizer.name}</h2>
                        <p>Organizer</p>
                      </IonLabel>
                    </div>
                  </IonItem>
                  <IonItem lines='none'>
                    <People label='Followers' people={event.followers} />
                    {owner && (
                      <IonButtons slot='end'>
                        <IonButton fill='solid' shape='round' routerLink={`/myevents/${event.id}/edit`}>
                          <IonIcon slot='start' icon={star}></IonIcon>
                          Edit
                        </IonButton>
                      </IonButtons>
                    )}
                    {!owner && following && (
                      <IonButtons slot='end'>
                        <IonButton fill='solid' shape='round' onClick={handleFollow}>
                          <IonIcon slot='start' icon={heartOutline}></IonIcon>
                          Unfollow
                        </IonButton>
                      </IonButtons>
                    )}
                    {!owner && !following && (
                      <IonButtons slot='end'>
                        <IonButton fill='solid' shape='round' onClick={handleUnFollow}>
                          <IonIcon slot='start' icon={heart}></IonIcon>
                          Follow
                        </IonButton>
                      </IonButtons>
                    )}
                  </IonItem>
                  <IonItem lines='none'>
                    <div className='flex flex-row w-full justify-between item-center'>
                      <IonText>{eventDate.format('LLL')}</IonText>
                      <Price price={event.price} />
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
                      <Map lat={event.latitude} lng={event.longitude} snippet={event.category} title={event.title} zoom={14} />
                    </div>
                  </IonItem>
                </IonList>
              </div>
            </>
          )}
          {!loading && !event && <IonTitle>Event not found</IonTitle>}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default memo(EventPage);
