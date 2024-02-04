import { IonIcon, IonText } from '@ionic/react';
import { Caption, Title } from '../shared/text/Text';
import { IonButton } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import './Empty.css';
import { useHistory } from 'react-router';
import { useIonRouter } from '@ionic/react';

const Empty = () => {
  const router = useIonRouter();

  const handleExplore = () => {
    router.push('/events', 'root', 'push');
  };

  return (
    <div className='no-events'>
      <Title color='tertiary' size='xs' className=''>
        Although there are no events today.
      </Title>

      <Caption color='tertiary' size='sm' className=''>
        We present you our best upcoming recommendations. From concerts to exhibitions, discover unique experiences with our app.
      </Caption>
      <Caption color='tertiary' size='sm' className=''>
        ¡Explore and live unforgettable moments!
      </Caption>
      <IonButton color='primary' onClick={handleExplore}>
        Explore Events
        <IonIcon slot='end' icon={arrowForwardOutline}></IonIcon>
      </IonButton>
    </div>
  );
};

export default Empty;
