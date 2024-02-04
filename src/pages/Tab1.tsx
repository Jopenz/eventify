import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import Avatar from '../components/shared/avatar/Avatar';
import Date from '../components/shared/date/Date';
import { useEventStore } from '../store/useEventStore';

const Tab1: React.FC = () => {
  const events = useEventStore((state) => state.events);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name='Tab 1 page' />
        <Avatar src='https://thispersondoesnotexist.com' name='John Doe' size={50} backgroundColor='#e34c34' />
        <Date day={1} month='January' />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
