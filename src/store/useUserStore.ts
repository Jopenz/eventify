import { create } from 'zustand';
import * as data from '../db/Events.json';
import Person from '../types/Person';

type State = {
  user: Person | null;
  setUser: (user: Person) => void;
};

export const useUserStore = create<State>((set) => ({
  user: {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  setUser: (user) => set({ user }),
}));
