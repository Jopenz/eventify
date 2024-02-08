import { IonSpinner, IonTitle } from '@ionic/react';
import { FC } from 'react';

const LoaderSpinner: FC = () => {
  return (
    <IonTitle>
      <IonSpinner name='circular'></IonSpinner>
    </IonTitle>
  );
};

export default LoaderSpinner;
