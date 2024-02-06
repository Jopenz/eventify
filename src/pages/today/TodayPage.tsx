import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Caption, Title } from '../../components/shared/text/Text';
import Event from '../../components/shared/event/Event';
import Empty from '../../components/empty/Empty';
import dayjs from 'dayjs';

import useToday from '../../hooks/useToday';
import './TodayPage.css';

const TodayPage: React.FC = () => {
  const { events } = useToday();

  const date = dayjs().format('dddd.MMMM.DD');

  return (
    <IonPage>
      <IonHeader className='ion-no-border' mode='ios'>
        <IonToolbar>
          <IonTitle color='primary'>Eventify</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader className='ion-no-border' mode='ios'>
          <IonToolbar>
            <Caption color='tertiary' size='sm' className='uppercase'>
              {date}
            </Caption>
          </IonToolbar>
          <IonToolbar>
            <Title color='primary' size='lg'>
              Today
            </Title>
          </IonToolbar>
        </IonHeader>
        <div className='container today'>
          {Array.isArray(events) && events.length > 0 ? (
            events.map((event) => <Event key={event.id} {...event} />)
          ) : (
            <Empty
              title='Although there are no events today.'
              button={{ label: 'Explore Events', url: '/events' }}
              message={
                'We present you our best upcoming recommendations.\n\nFrom concerts to exhibitions, discover unique experiences with our app. \n\n ¡Explore and live unforgettable moments!'
              }
            />
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TodayPage;
