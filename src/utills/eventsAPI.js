// Utility function to fetch events data
export const getEventsData = async () => {
  try {
    const response = await fetch('/events/all-events.json');
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    const data = await response.json();
    return data.events;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

// Get single event by ID
export const getEventById = async (eventId) => {
  try {
    const events = await getEventsData();
    return events.find(event => event.id === eventId);
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
};

// Filter events by category
export const getEventsByCategory = async (category) => {
  try {
    const events = await getEventsData();
    return events.filter(event => event.category.toLowerCase() === category.toLowerCase());
  } catch (error) {
    console.error('Error filtering events:', error);
    return [];
  }
};

// Get featured events
export const getFeaturedEvents = async () => {
  try {
    const events = await getEventsData();
    return events.filter(event => event.featured === true);
  } catch (error) {
    console.error('Error fetching featured events:', error);
    return [];
  }
};

// Get trending events
export const getTrendingEvents = async () => {
  try {
    const events = await getEventsData();
    return events.filter(event => event.trending === true);
  } catch (error) {
    console.error('Error fetching trending events:', error);
    return [];
  }
};

// Search events
export const searchEvents = async (query) => {
  try {
    const events = await getEventsData();
    const searchTerm = query.toLowerCase();
    return events.filter(event => 
      event.name.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm) ||
      event.category.toLowerCase().includes(searchTerm) ||
      event.location.toLowerCase().includes(searchTerm) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  } catch (error) {
    console.error('Error searching events:', error);
    return [];
  }
};

// Get events by date range
export const getEventsByDateRange = async (startDate, endDate) => {
  try {
    const events = await getEventsData();
    return events.filter(event => {
      const eventDate = new Date(event.fullDate);
      return eventDate >= startDate && eventDate <= endDate;
    });
  } catch (error) {
    console.error('Error fetching events by date:', error);
    return [];
  }
};

// Get all categories
export const getCategories = async () => {
  try {
    const events = await getEventsData();
    const categories = [...new Set(events.map(event => event.category))];
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Format event data for cards
export const formatEventForCard = (event) => {
  // Get the lowest priced ticket
  const lowestPrice = Math.min(...event.ticketTypes.map(ticket => ticket.price));
  
  // Get total available tickets
  const totalTickets = event.ticketTypes.reduce((sum, ticket) => sum + ticket.remaining, 0);
  
  return {
    id: event.id,
    name: event.name,
    description: event.description,
    cover: event.cover,
    month: event.month,
    date: event.date,
    price: lowestPrice === 0 ? 'Free' : lowestPrice.toString(),
    category: event.category,
    location: event.location,
    time: event.time,
    tickets: totalTickets + '+',
  };
};
