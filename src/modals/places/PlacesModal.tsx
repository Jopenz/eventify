import { FC, useEffect, useRef, useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonTitle,
  IonSearchbar,
  IonToolbar,
  IonPage,
  IonModal,
  IonInput,
  IonText,
  IonLoading,
  IonRadioGroup,
  IonRadio,
} from '@ionic/react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

import type { Place, PlaceModalProps } from './PlacesModal.d';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { environment } from '../../environments/environment';
import { useFormContext } from 'react-hook-form';

const PlacesModal: FC<PlaceModalProps> = ({ placeholder, name, label, required }) => {
  const { placesService, placePredictions, getPlacePredictions, isPlacePredictionsLoading } = usePlacesService({
    apiKey: environment.mapsKey,
    libraries: ['places', 'geometry'],
  });
  const modal = useRef<HTMLIonModalElement>(null);
  const loader = useRef<HTMLIonLoadingElement>(null);

  const { register, formState, setValue } = useFormContext();

  const { errors } = formState;
  const error = errors[name];
  const coords = errors['coordinate'];

  const selected = useRef<Place | null>();

  const searchPlaces = async (query: string) => {
    console.log('searching places', query);
    if (query) {
      getPlacePredictions({ input: query });
    }
  };

  const compareWith = (o1: Place, o2: Place) => {
    return o1.place_id === o2.place_id;
  };

  return (
    <IonItem lines='none'>
      <IonInput
        labelPlacement='stacked'
        fill='solid'
        placeholder={placeholder || ''}
        {...register(name, { required })}
        className={error ? 'ion-invalid ion-touched' : ''}
        errorText={error?.message?.toString() || coords?.message?.toString() || ''}
        readonly
        onClick={() => modal.current?.present()}
      >
        <div slot='label'>
          {label} {required && <IonText color='danger'>*</IonText>}
        </div>
      </IonInput>
      <input type='hidden' {...register('latitude')} />
      <input type='hidden' {...register('longitude')} />

      <IonModal
        ref={modal}
        trigger='open-modal'
        onWillDismiss={(ev) => {
          modal.current?.dismiss();
        }}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonButton color='danger' onClick={() => modal.current?.dismiss()}>
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle>Search Places</IonTitle>
            <IonButtons slot='end'>
              <IonButton
                color='primary'
                strong={true}
                onClick={() => {
                  if (selected.current) {
                    placesService?.getDetails(
                      {
                        placeId: selected.current.place_id,
                      },
                      (placeDetails) => {
                        if (placeDetails && placeDetails.geometry && placeDetails.geometry.location) {
                          console.log(coords, 'coords');
                          setValue(name, selected.current?.description, { shouldValidate: true });
                          setValue('latitude', placeDetails.geometry.location.lat(), { shouldValidate: true });
                          setValue('longitude', placeDetails.geometry.location.lng(), { shouldValidate: true });
                        }
                      }
                    );
                  }
                  modal.current?.dismiss(selected.current);
                }}
              >
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar
              mode='ios'
              placeholder='Search for places'
              onIonChange={(ev) => {
                searchPlaces(ev.detail.value!);
              }}
            />
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
          <IonLoading isOpen={isPlacePredictionsLoading} message='Loading places...' ref={loader} />
          <IonList>
            <IonRadioGroup
              compareWith={compareWith}
              onIonChange={(e) => {
                selected.current = e.detail.value;
              }}
            >
              {placePredictions.map((place) => (
                <IonItem key={place.place_id}>
                  <IonRadio key={place.place_id} value={place}>
                    {place.description}
                  </IonRadio>
                </IonItem>
              ))}
            </IonRadioGroup>
          </IonList>
        </IonContent>
      </IonModal>
    </IonItem>
  );
};
export default PlacesModal;
