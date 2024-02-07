import { IonInput, IonList } from '@ionic/react';
import { FC, Ref, RefAttributes, RefObject, useState } from 'react';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

interface AutocompleteProps {
  onPlaceSelected: (place: any) => void;
}

const Autocomplete: FC<AutocompleteProps> = ({ onPlaceSelected }) => {
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } = useGoogle({
    apiKey: 'AIzaSyDo0MzQpiB1N_vo5Cawwf5sBxMBvPM08bo',
  });

  const [value, setValue] = useState('');

  return (
    <>
      <IonInput
        id='google-places-address'
        aria-label='google places address'
        onIonChange={(e) => {
          setValue(e.detail.value!);
          getPlacePredictions({ input: e.detail.value! });
        }}
      />
      <div
        style={{
          marginTop: '20px',
          width: '200px',
          height: '200px',
          display: 'flex',
          flex: '1',
          flexDirection: 'column',
          marginBottom: '100px',
        }}
      >
        {!isPlacePredictionsLoading && (
          <IonList>
            {placePredictions.map((prediction) => (
              <div
                key={prediction.place_id}
                onClick={() => {
                  setValue(prediction.description);
                  getPlacePredictions({ input: value }); // Fix: Pass an object of type 'AutocompletionRequest' to 'getPlacePredictions'
                  onPlaceSelected(prediction);
                }}
              >
                {prediction.description}
              </div>
            ))}
          </IonList>
        )}
      </div>
    </>
  );
};

export default Autocomplete;
