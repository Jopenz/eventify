import { IonDatetime, IonDatetimeButton, IonItem, IonLabel, IonModal, IonText } from '@ionic/react';
import { FC, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface DateTimeProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

const DateTime: FC<DateTimeProps> = (props) => {
  const { label, required, name } = props;
  const { formState, setValue, control, register } = useFormContext();
  const [date, setDate] = useState(new Date().toISOString());

  const { errors } = formState;

  const error = errors[name];

  const handleChanged = (e: CustomEvent) => {
    setDate(e.detail.value);
  };

  useEffect(() => {
    if (!date) return;
    setValue('date', date);
  }, [date]);

  return (
    <IonItem lines='none'>
      <input type='hidden' value={date} {...register('date')} />
      <IonLabel>
        {label} {required && <IonText color='danger'>*</IonText>}
        <div slot='label'>
          <IonText color='danger'>
            <sub>{error?.message?.toString()}</sub>
          </IonText>
        </div>
      </IonLabel>
      <IonDatetimeButton datetime='datetime'></IonDatetimeButton>

      <Controller
        render={({ field }) => (
          <IonModal keepContentsMounted={true}>
            <IonDatetime id='datetime' value={date} onIonChange={handleChanged} min={new Date().toISOString()}></IonDatetime>
          </IonModal>
        )}
        control={control}
        name={name}
      />
    </IonItem>
  );
};

export default DateTime;
