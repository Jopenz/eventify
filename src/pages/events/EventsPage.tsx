import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonSearchbar } from '@ionic/react';

import './EventsPage.css';
import Event from '../../components/shared/event/Event';
import useEvents from '../../hooks/useEvents';
import { Title } from '../../components/shared/text/Text';
import Header from '../../components/header/Header';
import ExploreContainer from '../../components/ExploreContainer';
import { useState } from 'react';

const EventsPage: React.FC = () => {
  const { events, search, setSearch } = useEvents();

  const handleSearch = (e: CustomEvent) => {
    setSearch(e.detail.value);
  };

  const handleClear = () => {
    setSearch('');
  };

  return (
    <IonPage>
      <IonHeader className='ion-no-border' mode='ios'>
        <IonToolbar>
          <IonTitle color='primary'>Eventify</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar onIonChange={handleSearch} onIonClear={handleClear} placeholder='Search for events' />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='ion-padding'>
        <IonHeader className='ion-no-border' mode='ios' collapse='fade'>
          <IonToolbar>
            <Title size='lg'>Events</Title>
          </IonToolbar>
        </IonHeader>
        <div className='container events'>{Array.isArray(events) && events.length > 0 ? events.map((event) => <Event key={event.id} {...event} />) : null}</div>
      </IonContent>
    </IonPage>
  );
};

export default EventsPage;
