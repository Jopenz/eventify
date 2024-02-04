import { Person } from './Person';

export default interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  isFeatured: boolean;
  isFree: boolean;
  isPaid: boolean;
  isOnline: boolean;
  link: string;
  category: string;
  organizer: Person;
  price: number;
  capacity: number;
  confirmed: Person[];
  status: string;
  createdAt: string;
  updatedAt: string;
}
