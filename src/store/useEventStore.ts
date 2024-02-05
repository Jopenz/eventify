import { create } from 'zustand';
import Event from '../types/Event';
import * as data from '../db/Events.json';

type State = {
  loading: boolean;
  events: Event[];
  search: string;
  fetchEvents: () => Promise<void>;
  addEvent: (event: Event) => void;
  removeEvent: (id: number) => void;
  setSearch: (search: string) => void;
  editEvent: (event: Event) => void;
};

export const useEventStore = create<State>((set) => ({
  loading: true,
  events: [],
  search: '',
  fetchEvents: async () => {
    if (!data && !data['default']) {
      set({ loading: false });
    }
    set({ events: data.default, loading: false });
  },
  setSearch: (search: string) => set({ search }),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  editEvent: (event) =>
    set((state) => ({
      events: state.events.map((e) => (e.id === event.id ? event : e)),
    })),
  removeEvent: (id) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    })),
}));
