import { useEffect } from 'react';
import { useEventStore } from '../store/useEventStore';
import * as Dayjs from 'dayjs';

const useToday = () => {
  const events = useEventStore((state) => state.events);
  const fetchEvents = useEventStore((state) => state.fetchEvents);

  useEffect(() => {
    if (events.length === 0) {
      fetchEvents();
    }
  }, []);

  const todayEvents = events.filter((event) => {
    const eventDate = Dayjs(event.date);
    const today = Dayjs();
    return eventDate.isSame(today, 'day');
  });

  return {
    events: todayEvents,
  };
};

export default useToday;
