import { Person } from './Person';

export default interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  isFeatured: boolean;
  category: string;
  organizer: Person;
  price: number;
  confirmed: Person[];
  status: string;
  createdAt: string;
  updatedAt: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}
