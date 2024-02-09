import { create } from 'zustand';
import Event from '../types/Event';
import * as data from '../db/Events.json';
import dayjs from 'dayjs';
import { cloneDeep, merge } from 'lodash';
import Person from '../types/Person';

type State = {
  loading: boolean;
  events: Event[];
  search: string;
  open: number;
  fetchEvents: () => Promise<void>;
  setOpen: (id: number) => void;
  addEvent: (event: Event) => void;
  removeEvent: (id: number) => void;
  setSearch: (search: string) => void;
  editEvent: (event: Event) => void;
  followEvent: (id: number, user: Person) => void;
  unFollowEvent: (id: number, user: Person) => void;
};

const formatEvents = (data: any) => {
  if (data.default) data = data.default;
  return data.map((event: any) => {
    return {
      ...event,
      date: dayjs(event.date).toDate(),
      createdAt: dayjs(event.createdAt).toDate(),
      updatedAt: dayjs(event.updatedAt).toDate(),
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
    const events = formatEvents(data);
    events.sort((a: Event, b: Event) => a.date.getTime() - b.date.getTime());
    set({ events, loading: false });
  },
  setOpen: (id: number) => set({ open: id }),
  setSearch: (search: string) => set({ search }),
  followEvent: (id: number, user: Person) => {
    set((state) => {
      const events = cloneDeep(state.events);
      const index = events.findIndex((event) => event.id === id);
      events[index].followers.push(user);
      return { events };
    });
  },
  unFollowEvent: (id: number, user: Person) => {
    set((state) => {
      const events = cloneDeep(state.events);
      const index = events.findIndex((event) => event.id === id);
      events[index].followers = events[index].followers.filter((follower) => follower.id !== user.id);
      return { events };
    });
  },
  addEvent: (event) =>
    set((state) => {
      event.id = state.events.length + 1;
      const events = [...state.events, event];
      return { events };
    }),
  editEvent: (event) => {
    console.log(event, 'event');
    set((state) => {
      const events = cloneDeep(state.events);
      const index = events.findIndex((e) => e.id === event.id);
      events[index] = merge(events[index], event);
      return { events };
    });
  },
  removeEvent: (id) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    })),
}));
