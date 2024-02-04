import { useEffect } from 'react';
import { useEventStore } from '../store/useEventStore';
import * as Dayjs from 'dayjs';

const useEvents = () => {
  const events = useEventStore((state) => state.events);
  const loading = useEventStore((state) => state.loading);

  const fetchEvents = useEventStore((state) => state.fetchEvents);

  useEffect(() => {
    fetchEvents();
  }, []);

  const todayEvents = events.filter((event) => {
    const eventDate = Dayjs(event.date);
    const today = Dayjs();
    return eventDate.isSame(today, 'day');
  });

  const getEvent = (id: string) => {
    return events.find((event) => event.id === Number(id));
  };

  return {
    loading,
    events,
    todayEvents,
    getEvent,
  };
};

export default useEvents;
