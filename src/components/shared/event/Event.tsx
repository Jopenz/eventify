import { FC } from 'react';
import EventType from '../../../types/Event';
import './Event.css';
import Date from '../date/Date';
import { formatDate } from '../../../commons/Helpers';
import { Title, Caption } from '../text/Text';
import { IonCard, IonCardContent } from '@ionic/react';
import People from '../people/People';

export interface EventProps extends EventType {}

const Event: FC<EventProps> = (event) => {
  const { id, date, title, image, category, followers } = event;

  const parseDate = formatDate(date);

  return (
    <IonCard className='event-item' routerLink={`/events/${id}`}>
      <IonCardContent className='event-wrapper'>
        <div className='event-image' style={{ backgroundImage: `url(${image})` }}></div>
        <div className='event-details'>
          <div className='event-date'>
            <People people={followers} />
            <Date day={parseDate.format('DD')} month={parseDate.format('MMM')} />
          </div>
          <div className='event-title'>
            <Caption color='light'>{parseDate.format('dddd MMMM DD')}</Caption>
            <Title color='light' size='lg'>
              {title}
            </Title>
            <Caption color='light'>{category}</Caption>
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default Event;
