export interface Place extends google.maps.places.AutocompletePrediction {}

export interface PlaceModalProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}
