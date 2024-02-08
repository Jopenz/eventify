import { IonItem, IonText, IonTextarea } from '@ionic/react';
import { useFormContext } from 'react-hook-form';
import { FC } from 'react';

interface TextAreaProps {
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
  required?: boolean;
}

const TextArea: FC<TextAreaProps> = ({ name, label, rows, placeholder, required }) => {
  const { formState, register } = useFormContext();

  const { errors } = formState;

  const error = errors[name];

  return (
    <IonItem lines='none'>
      <IonTextarea
        {...register(name)}
        id={`${name}-input`}
        rows={rows || 1}
        labelPlacement='stacked'
        fill='solid'
        placeholder={placeholder}
        className={error ? 'ion-invalid ion-touched' : ''}
        errorText={error?.message?.toString()}
      >
        <div slot='label'>
          {label} {required && <IonText color='danger'>*</IonText>}
        </div>
      </IonTextarea>
    </IonItem>
  );
};

export default TextArea;
