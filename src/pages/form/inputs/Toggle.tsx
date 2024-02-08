import { IonItem, IonLabel, IonToggle } from '@ionic/react';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface ToggleProps {
  label: string;
  name: string;
}

const Toggle: FC<ToggleProps> = ({ label, name }) => {
  const { control } = useFormContext();

  return (
    <IonItem lines='none'>
      <Controller
        render={({ field }) => (
          <IonToggle {...field} id={`${name}-input`} checked={field.value} value={field.value.toString()}>
            <IonLabel>{label}</IonLabel>
          </IonToggle>
        )}
        control={control}
        name={name}
      />
    </IonItem>
  );
};

export default Toggle;
