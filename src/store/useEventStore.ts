import { create } from 'zustand';
import Event from '../types/Event';
import * as data from '../db/Events.json';

type State = {
  loading: boolean;
  events: Event[];
  fetchEvents: () => Promise<void>;
  addEvent: (event: Event) => void;
  removeEvent: (id: string) => void;
};

export const useEventStore = create<State>((set) => ({
  loading: true,
  events: [],
  fetchEvents: async () => {
    if (!data && !data['default']) {
      set({ loading: false });
    }
    set({ events: data.default, loading: false });
  },
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  removeEvent: (id) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    })),
}));
