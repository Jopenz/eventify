import { IonInput, IonItem, IonText } from '@ionic/react';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface TextInputProps {
  name: string;
  label: string;
  type?: 'text' | 'number' | 'email' | 'password';
  placeholder?: string;
  required?: boolean;
}

const TextInput: FC<TextInputProps> = (props) => {
  const { label, required, name, placeholder, type } = props;
  const { register, formState } = useFormContext();

  const { errors } = formState;

  const error = errors[name];

  return (
    <IonItem lines='none'>
      <IonInput
        {...register(name)}
        labelPlacement='floating'
        type={type || 'text'}
        fill='solid'
        placeholder={placeholder || ''}
        className={error ? 'ion-invalid ion-touched' : ''}
        errorText={error?.message?.toString() || ''}
      >
        <div slot='label'>
          {label} {required && <IonText color='danger'>*</IonText>}
        </div>
      </IonInput>
    </IonItem>
  );
};

export default TextInput;
