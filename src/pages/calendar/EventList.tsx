import { IonBadge, IonChip, IonIcon, IonItem, IonLabel, IonList, IonThumbnail } from '@ionic/react';
import { FC } from 'react';
import Event from '../../types/Event';
import { heartOutline, peopleOutline } from 'ionicons/icons';

interface EventListProps {
  events: Event[];
}

const EventList: FC<EventListProps> = ({ events }) => {
  return (
    <IonList lines='none' className='w-full'>
      {events.map((event) => {
        return (
          <IonItem button={true} key={event.id} routerLink={`/calendar/events/${event.id}`}>
            <IonThumbnail slot='start'>
              <img src={event.image} alt={event.title} />
            </IonThumbnail>
            <IonLabel>
              <h2>{event.title}</h2>
              <sub className='flex item-center'>
                <p style={{ marginRight: '5px' }}>{event.category}</p>´
                {event.followers.length > 0 && (
                  <IonBadge className='flex item-center'>
                    <IonIcon style={{ marginRight: '5px' }} icon={heartOutline} />
                    {event.followers.length}
                  </IonBadge>
                )}
              </sub>
            </IonLabel>
          </IonItem>
        );
      })}
    </IonList>
  );
};

export default EventList;
