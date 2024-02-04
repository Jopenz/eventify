import { IonIcon } from '@ionic/react';
import { Caption, Title } from '../shared/text/Text';
import { IonButton } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import './Empty.css';
import { useIonRouter } from '@ionic/react';
import { FC } from 'react';

interface EmptyProps {
  title: string;
  message?: string;
  button?: {
    label: string;
    url: string;
  };
}

const Empty: FC<EmptyProps> = ({ message, button, title }) => {
  const router = useIonRouter();

  const handleClick = () => {
    if (!button) return;
    router.push(button.url, 'root', 'push');
  };

  return (
    <div className='no-events'>
      <div className='no-events-wrapper'>
        <Title color='tertiary' size='xs' className='title'>
          {title}
        </Title>

        <Caption color='tertiary' size='sm' className='message'>
          {message}
        </Caption>

        {button ? (
          <IonButton color='primary' onClick={handleClick}>
            {button.label}
            <IonIcon slot='end' icon={arrowForwardOutline}></IonIcon>
          </IonButton>
        ) : null}
      </div>
    </div>
  );
};

export default Empty;
