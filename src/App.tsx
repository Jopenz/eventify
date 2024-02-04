import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { calendarNumberOutline, bookmarksOutline, sparklesOutline } from 'ionicons/icons';
import '@fontsource-variable/onest';

import TodayPage from './pages/today/TodayPage';
import EventsPage from './pages/events/EventsPage';
import EventPage from './pages/event/EventPage';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/commons.css';
import MyEventsPage from './pages/myEvents/MyEvents';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path='/today'>
            <TodayPage />
          </Route>
          <Route exact path='/events'>
            <EventsPage />
          </Route>
          <Route path='/events/:id' render={(match) => <EventPage {...match} />} />
          <Route exact path='/calendar'>
            <EventsPage />
          </Route>

          <Route path='/myevents'>
            <MyEventsPage />
          </Route>

          <Route exact path='/'>
            <Redirect to='/events' />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot='bottom'>
          <IonTabButton tab='today' href='/today'>
            <IonIcon aria-hidden='true' icon={calendarNumberOutline} />
            <IonLabel>Today</IonLabel>
          </IonTabButton>
          <IonTabButton tab='events' href='/events'>
            <IonIcon aria-hidden='true' icon={sparklesOutline} />
            <IonLabel>Events</IonLabel>
          </IonTabButton>
          <IonTabButton tab='myevents' href='/myevents'>
            <IonIcon aria-hidden='true' icon={bookmarksOutline} />
            <IonLabel>My Events</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
