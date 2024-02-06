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
} from '@ionic/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { imageOutline } from 'ionicons/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { EventForm, EventModalProps } from './Form';
import schema from './FormModel';
import useMyEvents from '../../hooks/useMyEvents';

const defaultValues: EventForm = {
  id: 0,
  title: '',
  date: '',
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
  const { register, handleSubmit, watch, setValue, control, reset } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

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
          <IonToolbar>
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
        <IonContent className=''>
          <IonItem className='ion-padding-horizontal ion-padding-top'>
            <IonInput {...register('title')} label='Title' type='text' labelPlacement='stacked' placeholder='Event title' />
          </IonItem>
          <IonItem className='ion-padding-horizontal ion-padding-top'>
            <IonInput {...register('date')} label='Date' type='date' class='custom' labelPlacement='stacked' fill='outline' placeholder='Enter text'></IonInput>
          </IonItem>
          <IonItem className='ion-padding-horizontal ion-padding-top'>
            <IonInput
              {...register('location')}
              label='Location'
              type='text'
              labelPlacement='stacked'
              placeholder={"Plaça de Catalunya, L'Eixample, 08002 Barcelona"}
            />
          </IonItem>
          <IonItem className='ion-padding-horizontal ion-padding-top' lines='none'>
            <IonThumbnail slot='start'>
              <img alt='Silhouette of mountains' src={avatar || undefined} />
            </IonThumbnail>
            <input id='uploader' {...register('file')} type='file' accept='image/*' hidden />
            <IonButton slot='end' size='default' onClick={fileOpenDialog}>
              <IonIcon icon={imageOutline} slot='start'></IonIcon>
              Upload
            </IonButton>
          </IonItem>
          <IonItem className='ion-padding-horizontal ion-padding-top'>
            <IonLabel>Featured</IonLabel>
            <Controller
              render={({ field }) => <IonToggle {...field} checked={field.value} value={field.value.toString()} />}
              control={control}
              name='isFeatured'
            />
          </IonItem>
          <IonItem className='ion-padding-horizontal ion-padding-top'>
            <IonInput {...register('category')} label='Category' type='text' labelPlacement='stacked' placeholder='Music' />
          </IonItem>
          <IonItem className='ion-padding-horizontal ion-padding-top'>
            <IonInput
              {...register('price')}
              label='Price'
              type='number'
              class='custom'
              labelPlacement='stacked'
              fill='outline'
              placeholder='Enter text'
            ></IonInput>
          </IonItem>
          <IonItem className='ion-padding-horizontal ion-padding-top'>
            <IonTextarea
              {...register('description')}
              label='Description'
              rows={15}
              class='custom'
              labelPlacement='stacked'
              fill='outline'
              placeholder='Enter text'
            ></IonTextarea>
          </IonItem>
        </IonContent>
      </IonPage>
    </form>
  );
};

export default EventModal;
