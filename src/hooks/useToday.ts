import { useEffect, useState } from 'react';
import { useEventStore } from '../store/useEventStore';
import dayjs from 'dayjs';
import Event from '../types/Event';

const useToday = () => {
  const events = useEventStore((state) => state.events);
  const [todayEvents, setTodayEvents] = useState<Event[]>([]);

  useEffect(() => {
    const filter = async () => {
      const todayEvents = await events.filter((event) => {
        const eventDate = dayjs(event.date);
        const today = dayjs();
        return eventDate.isSame(today, 'day');
      });
      setTodayEvents(todayEvents);
    };

    if (events.length === 0) return;
    filter();
  }, [events]);

  return {
    events: todayEvents,
  };
};

export default useToday;
