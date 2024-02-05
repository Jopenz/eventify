import { useEffect } from 'react';
import { useEventStore } from '../store/useEventStore';
import * as Dayjs from 'dayjs';
import { useUserStore } from '../store/useUserStore';

const useEvents = () => {
  const events = useEventStore((state) => state.events);
  const user = useUserStore((state) => state.user);
  const loading = useEventStore((state) => state.loading);
  const sText = useEventStore((state) => state.search);

  const fetchEvents = useEventStore((state) => state.fetchEvents);
  const setSearch = useEventStore((state) => state.setSearch);

  const removeEvent = useEventStore((state) => state.removeEvent);
  const addEvent = useEventStore((state) => state.addEvent);
  const editEvent = useEventStore((state) => state.editEvent);

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

  const getEvent = (id: string) => {
    return events.find((event) => event.id === Number(id));
  };

  const search = (search: string) => {
    setSearch(search);
  };

  const getMyEvents = () => {
    return events.filter((event) => event.organizer.id === user?.id);
  };

  const filterEvents = events.filter((event) => {
    return event.title.toLowerCase().includes(sText.toLowerCase());
  });

  return {
    loading,
    search: sText,
    events: filterEvents,
    todayEvents,
    getMyEvents,
    getEvent,
    setSearch: search,
    removeEvent,
    editEvent,
    addEvent,
  };
};

export default useEvents;
