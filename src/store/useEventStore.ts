import { create } from 'zustand';
import Event from '../types/Event';
import * as data from '../db/Events.json';
import dayjs from 'dayjs';

type State = {
  loading: boolean;
  events: Event[];
  search: string;
  open: number;
  fetchEvents: () => Promise<void>;
  addEvent: (event: Event) => void;
  setOpen: (open: number) => void;
  removeEvent: (id: number) => void;
  setSearch: (search: string) => void;
  editEvent: (event: Event) => void;
};

const formatEvents = (data: any) => {
  if (data.default) data = data.default;
  return data.map((event: any) => {
    return {
      ...event,
      date: dayjs(event.date).format('YYYY-MM-DD'),
      createdAt: dayjs(event.createdAt).format('YYYY-MM-DD'),
      updatedAt: dayjs(event.updatedAt).format('YYYY-MM-DD'),
    };
  });
};

export const useEventStore = create<State>((set) => ({
  loading: true,
  events: [],
  search: '',
  open: 0,
  fetchEvents: async () => {
    if (!data && !data['default']) {
      set({ loading: false });
    }
    set({ events: formatEvents(data), loading: false });
  },
  setSearch: (search: string) => set({ search }),
  setOpen: (open: number) => set({ open }),
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
