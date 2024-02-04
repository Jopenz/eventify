import { useEffect } from 'react';
import { useEventStore } from '../store/useEventStore';
import * as Dayjs from 'dayjs';
import { useUserStore } from '../store/useUserStore';

const useEvents = () => {
  const events = useEventStore((state) => state.events);
  const user = useUserStore((state) => state.user);
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

  const getMyEvents = () => {
    return events.filter((event) => event.organizer.id === user?.id);
  };

  return {
    loading,
    events,
    todayEvents,
    getMyEvents,
    getEvent,
  };
};

export default useEvents;
