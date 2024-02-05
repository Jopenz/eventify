import { FC, useEffect, useRef, useState } from 'react';
import Event from '../../types/Event';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, useIonActionSheet } from '@ionic/react';
import { formatDate } from '../../commons/Helpers';
import './EventCard.css';
import useEvents from '../../hooks/useEvents';

interface EventCardProps extends Event {}

const EventCard: FC<EventCardProps> = ({ image, title, date, description, id }) => {
  const { removeEvent } = useEvents();
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
  const card = useRef(null);

  const [present] = useIonActionSheet();

  useEffect(() => {
    setPresentingElement(card.current);
  }, []);

  const handleDelete = () => {
    present(
      [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            removeEvent(id);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
      'Delete Event'
    );
  };

  return (
    <IonCard className='event-card' ref={card}>
      <img className='card-image' alt='Silhouette of mountains' src={image} />
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>{formatDate(date).format('LL')}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>{description.slice(0, 100)}...</IonCardContent>

      <IonButton href={`/myevents/${id}`} color='light' fill='clear'>
        Edit
      </IonButton>
      <IonButton onClick={handleDelete} color='danger' fill='clear'>
        Delete
      </IonButton>
    </IonCard>
  );
};

export default EventCard;
