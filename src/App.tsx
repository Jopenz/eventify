import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { calendarOutline, search, personOutline, sparklesOutline } from 'ionicons/icons';
import '@fontsource-variable/onest';

import Today from './components/shared/today/Today';
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
          <Route path='/search'></Route>
          <Route path='/account'></Route>

          <Route exact path='/'>
            <Redirect to='/today' />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot='bottom'>
          <IonTabButton tab='today' href='/today'>
            <Today day={1} />
            <IonLabel>Today</IonLabel>
          </IonTabButton>
          <IonTabButton tab='events' href='/events'>
            <IonIcon aria-hidden='true' icon={sparklesOutline} />
            <IonLabel>Events</IonLabel>
          </IonTabButton>
          <IonTabButton tab='calendar' href='/calendar'>
            <IonIcon aria-hidden='true' icon={calendarOutline} />
            <IonLabel>Calendar</IonLabel>
          </IonTabButton>
          <IonTabButton tab='search' href='/search'>
            <IonIcon aria-hidden='true' icon={search} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>
          <IonTabButton tab='account' href='/account'>
            <IonIcon aria-hidden='true' icon={personOutline} />
            <IonLabel>My Account</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
