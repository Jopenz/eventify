import { IonChip } from '@ionic/react';
import { FC } from 'react';

export interface PriceProps {
  price: number;
}

const Price: FC<PriceProps> = ({ price }) => {
  if (price === 0) {
    return (
      <IonChip>
        <span className='price-currency'>Free</span>
      </IonChip>
    );
  }

  return (
    <IonChip color='secondary'>
      <span className='price-currency'>$</span>
      <span className='price-amount'>{price}</span>
    </IonChip>
  );
};

export default Price;
