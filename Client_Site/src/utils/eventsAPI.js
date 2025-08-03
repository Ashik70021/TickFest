// API utility for handling events data
export const getEventsData = async () => {
  try {
    const response = await fetch('/events/all-events.json');
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    const data = await response.json();
    return data.events;
  } catch (error) {
    console.error('Error loading events:', error);
    return [];
  }
};

export const getEventById = async (id) => {
  const events = await getEventsData();
  return events.find(event => event.id === id);
};

export const getEventsByCategory = async (category) => {
  const events = await getEventsData();
  return category === 'All Events' 
    ? events 
    : events.filter(event => event.category === category);
};

export const getFeaturedEvents = async () => {
  const events = await getEventsData();
  return events.filter(event => event.featured === true);
};

export const searchEvents = async (searchTerm) => {
  const events = await getEventsData();
  return events.filter(event => 
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
