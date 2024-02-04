import { IonHeader, IonToolbar } from '@ionic/react';
import { FC } from 'react';

interface HeaderProps {
  mode?: 'ios' | 'md';
  collapse?: 'condense' | 'fade';
  color?: string;
  children?: React.ReactNode;
}

const Header: FC<HeaderProps> = ({ color, mode = undefined, children }) => {
  return (
    <IonHeader className='header ion-no-border' mode={'ios'}>
      <IonToolbar color={color}>{children}</IonToolbar>
    </IonHeader>
  );
};

export default Header;
