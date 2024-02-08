import { useEffect, useState } from 'react';
import { useEventStore } from '../store/useEventStore';
import { useUserStore } from '../store/useUserStore';
import Event from '../types/Event';

const useEvents = () => {
  const events = useEventStore((state) => state.events);
  const user = useUserStore((state) => state.user);
  const loading = useEventStore((state) => state.loading);
  const sText = useEventStore((state) => state.search);
  const open = useEventStore((state) => state.open);

  const fetchEvents = useEventStore((state) => state.fetchEvents);
  const setSearch = useEventStore((state) => state.setSearch);
  const setOpen = useEventStore((state) => state.setOpen);

  const removeEvent = useEventStore((state) => state.removeEvent);
  const addEvent = useEventStore((state) => state.addEvent);
  const editEvent = useEventStore((state) => state.editEvent);

  const followEvent = useEventStore((state) => state.followEvent);
  const unFollowEvent = useEventStore((state) => state.unFollowEvent);

  const [filterEvents, setFilterEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (events.length === 0) {
      fetchEvents();
    }
  }, []);

  useEffect(() => {
    const filter = async () => {
      const filterEvents = await events.filter((event) => {
        return event.title.toLowerCase().includes(sText.toLowerCase());
      });
      setFilterEvents(filterEvents);
    };

    if (events.length === 0) return;
    filter();
  }, [events, sText]);

  const getEvent = (id: string) => {
    return events.find((event) => event.id === Number(id));
  };

  const search = (search: string) => {
    setSearch(search);
  };

  const getMyEvents = () => {
    return events.filter((event) => event.organizer.id === user?.id);
  };

  const event = events.find((event) => event.id === open);

  return {
    loading,
    search: sText,
    events: filterEvents,
    event,
    getMyEvents,
    getEvent,
    setSearch: search,
    removeEvent,
    editEvent,
    addEvent,
    followEvent,
    unFollowEvent,
    setOpen,
  };
};

export default useEvents;
