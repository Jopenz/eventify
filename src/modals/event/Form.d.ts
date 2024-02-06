import Event from '../../types/Event';

export interface EventForm extends Event {
  file: any;
}

export interface EventModalProps {
  onDismiss: (data?: EventForm | null | undefined | number, role?: string) => void;
}
