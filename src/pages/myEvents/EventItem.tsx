import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonThumbnail, useIonActionSheet } from '@ionic/react';
import { FC } from 'react';
import Event from '../../types/Event';
import { formatDate } from '../../commons/Helpers';
import useMyEvents from '../../hooks/useMyEvents';
import { trashOutline } from 'ionicons/icons';

interface EventItemProps extends Event {}

const EventItem: FC<EventItemProps> = ({ id, title, image, date }) => {
  const { removeEvent, setOpen } = useMyEvents();
  const [present] = useIonActionSheet();

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

  const handleEdit = () => {
    setOpen(id);
  };
  return (
    <IonItemSliding>
      <IonItem button={true} onClick={handleEdit}>
        <IonThumbnail slot='start'>
          <img src={image} alt={title} />
        </IonThumbnail>
        <IonLabel>
          <h2>{title}</h2>
          <sub>{formatDate(date).format('LL')}</sub>
        </IonLabel>
      </IonItem>
      <IonItemOptions side='end'>
        <IonItemOption onClick={handleDelete} color='danger'>
          <IonIcon slot='icon-only' icon={trashOutline} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default EventItem;
