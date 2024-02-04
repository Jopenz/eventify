import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText } from '@ionic/react';
import Event from '../../components/shared/event/Event';

import useEvents from '../../hooks/useEvents';
import Empty from '../../components/empty/Empty';
import dayjs from 'dayjs';
import { Caption, Title } from '../../components/shared/text/Text';
import './TodayPage.css';
import Header from '../../components/header/Header';

const TodayPage: React.FC = () => {
  const { todayEvents } = useEvents();

  const date = dayjs().format('dddd.MMMM.DD');

  return (
    <IonPage>
      <IonHeader className='ion-no-border' mode='ios'>
        <IonToolbar>
          <IonTitle>Eventify</IonTitle>
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
            <Title color='tertiary' size='lg'>
              Today
            </Title>
          </IonToolbar>
        </IonHeader>
        <div className='container today'>
          {Array.isArray(todayEvents) && todayEvents.length > 0 ? (
            todayEvents.map((event) => <Event key={event.id} {...event} />)
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
