import { Person } from './Person';

export default interface Event {
  id: number;
  title: string;
  date: date;
  location: string;
  description: string;
  image: string;
  isFeatured: boolean;
  category: string;
  organizer: Person;
  price: number;
  followers: Person[];
  status: string;
  createdAt: date;
  updatedAt: date;
  latitude: number;
  longitude: number;
}
