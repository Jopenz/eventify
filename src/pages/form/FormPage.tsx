import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { FC, useEffect } from 'react';
import Event from '../../types/Event';
import { useForm, SubmitHandler, Resolver, Controller, FormProvider } from 'react-hook-form';
import './FormPage.css';
import { EventForm } from './Form';
import schema from './FormModel';
import { yupResolver } from '@hookform/resolvers/yup';
import useMyEvents from '../../hooks/useMyEvents';
import useUser from '../../hooks/useUser';
import { saveOutline } from 'ionicons/icons';
import DateTime from './inputs/DateTime';
import TextInput from './inputs/TextInput';
import UploadImage from './inputs/UploadImage';
import Toggle from './inputs/Toggle';
import TextArea from './inputs/TextArea';
import { RouteComponentProps, useHistory } from 'react-router';
import PlacesModal from '../../modals/places/PlacesModal';

interface FormPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const defaultValues: EventForm = {
  id: 0,
  title: '',
  date: new Date(),
  location: '',
  description: '',
  image: '',
  isFeatured: false,
  category: '',
  organizer: undefined,
  price: 50,
  followers: [],
  status: 'active',
  createdAt: new Date(),
  updatedAt: new Date(),
  latitude: 0,
  longitude: 0,
};

const FormPage: FC<FormPageProps> = ({ match }) => {
  const history = useHistory();
  const { addEvent, editEvent } = useMyEvents();

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema) as Resolver<EventForm>,
  });

  const { handleSubmit, reset, formState } = methods;

  const { getEvent } = useMyEvents();
  const { user } = useUser();
  const { id } = match.params;

  const onSubmit: SubmitHandler<EventForm> = (data: Event) => {
    if (data.id === 0) {
      addEvent(data);
    } else {
      editEvent(data);
    }
    reset(defaultValues);
    history.goBack();
  };

  const handleBack = () => {
    history.goBack();
  };

  useEffect(() => {
    console.log(id);
    if (Number(id)) {
      const event = getEvent(id);

      if (event) {
        if (event.organizer.id !== user?.id) {
          history.push('/myevents');
        }
        reset({ ...event, organizer: user });
      }
    } else {
      reset({ ...defaultValues, organizer: user });
    }
  }, [id]);

  return (
    <FormProvider {...methods}>
      <form className='w-full h-full' onSubmit={handleSubmit(onSubmit)}>
        <IonPage>
          <IonHeader>
            <IonToolbar mode='ios'>
              <IonButtons slot='start'>
                <IonButton color='medium' onClick={handleBack}>
                  Cancel
                </IonButton>
              </IonButtons>
              <IonTitle color='primary'>Create Event</IonTitle>
              <IonButtons slot='end'>
                <IonButton type='submit' strong={true}>
                  <IonIcon size='small' icon={saveOutline} slot='start' />
                  Save
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <br />
            <UploadImage name='image' label='Upload' />
            <br />
            <Toggle name='isFeatured' label='Featured' />
            <br />
            <DateTime name='date' label='Date' required={true} />
            <br />
            <TextInput name='title' label='Title' required={true} />
            <br />
            <TextInput name='category' label='Category' required={true} />
            <br />
            <PlacesModal placeholder='Search place' label='Location' name='location' required={true} />
            {/* <TextInput name='location' label='Location' required={true} /> */}
            <br />
            <TextInput name='price' label='Price' type='number' />
            <br />
            <TextArea name='description' label='Description' rows={6} required={true} />
            <br />
            <br />
          </IonContent>
        </IonPage>
      </form>
    </FormProvider>
  );
};

export default FormPage;
