import { useEffect } from 'react';
import { useEventStore } from '../store/useEventStore';
import { useUserStore } from '../store/useUserStore';

const useMyEvents = () => {
  const events = useEventStore((state) => state.events);
  const user = useUserStore((state) => state.user);
  const loading = useEventStore((state) => state.loading);

  const fetchEvents = useEventStore((state) => state.fetchEvents);

  const removeEvent = useEventStore((state) => state.removeEvent);
  const addEvent = useEventStore((state) => state.addEvent);
  const editEvent = useEventStore((state) => state.editEvent);
  useEffect(() => {
    if (events.length === 0) {
      fetchEvents();
    }
  }, []);

  const getEvent = (id: string) => {
    return events.find((event) => event.id === Number(id));
  };

  const myEvents = events.filter((event) => event.organizer.id === user?.id);

  return {
    loading,
    events: myEvents,
    getEvent,
    removeEvent,
    editEvent,
    addEvent,
  };
};

export default useMyEvents;
