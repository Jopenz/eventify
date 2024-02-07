import { FC, useEffect } from 'react';
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonTextarea,
  IonIcon,
  IonThumbnail,
  IonToggle,
  IonLabel,
  IonList,
  IonText,
  IonDatetimeButton,
  IonModal,
  IonDatetime,
} from '@ionic/react';
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { imageOutline } from 'ionicons/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { EventForm, EventModalProps } from './Form';
import schema from './FormModel';
import useMyEvents from '../../hooks/useMyEvents';
import Autocomplete from '../../components/shared/maps/Autocomplete';

const defaultValues: EventForm = {
  id: 0,
  title: '',
  date: new Date(),
  location: '',
  description: '',
  image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
  isFeatured: false,
  category: '',
  organizer: undefined,
  price: 50,
  confirmed: [],
  status: '',
  createdAt: '',
  updatedAt: '',
  coordinate: {
    latitude: 0,
    longitude: 0,
  },
  file: undefined,
};

const EventModal: FC<EventModalProps> = ({ onDismiss }) => {
  const { register, handleSubmit, watch, setValue, control, reset, formState } = useForm({
    defaultValues,
    resolver: yupResolver(schema) as Resolver<EventForm>,
  });

  const { errors } = formState;
  const { selected } = useMyEvents();

  const file = watch('file');
  const avatar = watch('image');

  const onSubmit: SubmitHandler<EventForm> = (data) => {
    console.dir(data);
    onDismiss(data, 'confirm');
  };

  const fileOpenDialog = () => {
    const fileInput = document.getElementById('uploader');
    fileInput?.click();
  };

  useEffect(() => {
    let filereader = new FileReader();
    filereader.onload = (e) => {
      if (!e.target) return;
      setValue('image', e.target?.result?.toString() ?? '');
    };

    if (file && (file as any[])[0]) {
      filereader.readAsDataURL((file as any[])[0]);
    }
  }, [file]);

  useEffect(() => {
    if (selected) {
      reset(selected);
    } else {
      reset(defaultValues);
    }
  }, [selected]);

  return (
    <form className='w-full h-full' onSubmit={handleSubmit(onSubmit)}>
      <IonPage>
        <IonHeader>
          <IonToolbar mode='ios'>
            <IonButtons slot='start'>
              <IonButton color='medium' onClick={() => onDismiss(null, 'cancel')}>
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle color='primary'>Create Event</IonTitle>
            <IonButtons slot='end'>
              <IonButton type='submit' strong={true}>
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <br />
            <IonItem lines='none'>
              <IonInput
                {...register('title')}
                labelPlacement='stacked'
                type='text'
                fill='solid'
                placeholder='Event title'
                className={errors.title ? 'ion-invalid ion-touched' : ''}
                errorText={errors.title?.message?.toString() || ''}
              >
                <div slot='label'>
                  Title <IonText color='danger'>*</IonText>
                </div>
              </IonInput>
            </IonItem>
            <br />
            <IonItem lines='none'>
              <IonLabel>
                Date <IonText color='danger'>*</IonText>
                <div slot='label'>
                  <IonText color='danger'>
                    <sub>{errors?.date?.message?.toString()}</sub>
                  </IonText>
                </div>
              </IonLabel>
              <IonDatetimeButton datetime='datetime'></IonDatetimeButton>
              <Controller
                render={({ field }) => (
                  <IonModal keepContentsMounted={true}>
                    <IonDatetime
                      id='datetime'
                      {...field}
                      value={(field.value as Date) ? field.value.toISOString() : ''}
                      onIonChange={(e) => {
                        console.log(e.detail.value);
                        const date = new Date(e.detail.value as string);
                        field.onChange(new Date(date));
                      }}
                    ></IonDatetime>
                  </IonModal>
                )}
                control={control}
                name='date'
              />
            </IonItem>
            <br />
            <IonItem lines='none'>
              <IonInput
                {...register('location')}
                type='text'
                labelPlacement='stacked'
                fill='solid'
                placeholder={"Plaça de Catalunya, L'Eixample, 08002 Barcelona"}
                className={errors.location ? 'ion-invalid ion-touched' : ''}
                errorText={errors.location?.message?.toString()}
              >
                <div slot='label'>
                  Location <IonText color='danger'>*</IonText>
                </div>
              </IonInput>
            </IonItem>
            <br />
            <IonItem lines='none'>
              <IonText color='danger'>
                <sub>{errors.file?.message?.toString()}</sub>
              </IonText>
              <IonThumbnail slot='start'>
                <img alt='Silhouette of mountains' src={avatar || undefined} />
              </IonThumbnail>
              <input id='uploader' {...register('file')} type='file' accept='image/*' hidden />
              <IonButton slot='end' size='default' onClick={fileOpenDialog}>
                <IonIcon icon={imageOutline} slot='start'></IonIcon>
                Upload
              </IonButton>
            </IonItem>
            <br />
            <IonItem lines='none'>
              <Controller
                render={({ field }) => (
                  <IonToggle {...field} checked={field.value} value={field.value.toString()}>
                    <IonLabel>Featured</IonLabel>
                  </IonToggle>
                )}
                control={control}
                name='isFeatured'
              />
            </IonItem>
            <br />
            <IonItem lines='none'>
              <IonInput
                {...register('category')}
                type='text'
                labelPlacement='stacked'
                fill='solid'
                placeholder='Music'
                className={errors.category ? 'ion-invalid ion-touched' : ''}
                errorText={errors.category?.message?.toString()}
              >
                <div slot='label'>
                  Category <IonText color='danger'>*</IonText>
                </div>
              </IonInput>
            </IonItem>
            <br />
            <IonItem lines='none'>
              <IonInput {...register('price')} type='number' class='custom' labelPlacement='stacked' fill='solid' placeholder='Enter text'>
                <div slot='label'>Price</div>
              </IonInput>
            </IonItem>
            <br />
            <IonItem lines='none'>
              <Autocomplete
                onPlaceSelected={() => {
                  console.log('place');
                }}
              />
              {/* <Autocomplete
                apiKey='AIzaSyDo0MzQpiB1N_vo5Cawwf5sBxMBvPM08bo'
                onPlaceSelected={(place) => {
                  console.log(place);
                }}
              /> */}
            </IonItem>
            <IonItem lines='none'>
              <IonTextarea
                {...register('description')}
                rows={15}
                class='custom'
                labelPlacement='stacked'
                fill='solid'
                placeholder='Enter text'
                className={errors.description ? 'ion-invalid ion-touched' : ''}
                errorText={errors.description?.message?.toString()}
              >
                <div slot='label'>
                  Description <IonText color='danger'>*</IonText>
                </div>
              </IonTextarea>
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    </form>
  );
};

export default EventModal;
