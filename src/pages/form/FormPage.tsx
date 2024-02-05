import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonSearchbar, IonInput, IonList, IonItem } from '@ionic/react';
import { FC } from 'react';
import Event from '../../types/Event';
import { useForm, SubmitHandler } from 'react-hook-form';
import './FormPage.css';

interface FormPageProps {}

interface EventForm extends Event {}

const FormPage: FC<FormPageProps> = () => {
  const { register, handleSubmit } = useForm<EventForm>();
  const onSubmit: SubmitHandler<EventForm> = (data) => console.log(data);

  return (
    <IonPage>
      <IonHeader className='ion-no-border' mode='ios'>
        <IonToolbar>
          <IonTitle color='primary'>Eventify</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='ion-padding'>
        <IonHeader className='ion-no-border' mode='ios' collapse='fade'>
          <IonToolbar></IonToolbar>
        </IonHeader>
        <form className='container events'>
          <IonText color='primary' className='ion-margin-bottom'>
            Create a new event
          </IonText>
          <IonList>
            <IonItem>
              <IonInput {...register('title')} type='text' class='custom' labelPlacement='floating' fill='outline' placeholder='Enter text'></IonInput>
            </IonItem>
            <IonItem>
              <IonInput {...register('description')} type='text' class='custom' labelPlacement='floating' fill='outline' placeholder='Enter text'></IonInput>
            </IonItem>
            <IonItem>
              <IonInput {...register('date')} type='date' class='custom' labelPlacement='floating' fill='outline' placeholder='Enter text'></IonInput>
            </IonItem>
            <IonItem>
              <IonInput {...register('price')} type='number' class='custom' labelPlacement='floating' fill='outline' placeholder='Enter text'></IonInput>
            </IonItem>
          </IonList>

          {/* <div className='ion-margin-bottom'>
            <input type='text' placeholder='Location' {...register('location')} />
          </div>
          <div className='ion-margin-bottom'>
            <input type='date' {...register('date')} />
          </div> */}

          <button onClick={handleSubmit(onSubmit)}>Submit</button>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default FormPage;
