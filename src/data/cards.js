import { getEventsData, formatEventForCard } from '../utills/eventsAPI';

// Function to get formatted cards data from the events API
export async function getData() {
  try {
    const events = await getEventsData();
    return events.map(event => formatEventForCard(event));
  } catch (error) {
    console.error('Error loading events data:', error);
    // Return fallback data if API fails
    return [
      {
        id: "event-1",
        name: "Let's Vibe with Oni Hasan ft All Stars",
        description: "Get ready to vibe with the sensational Oni Hasan and his all-star lineup! This electrifying concert promises an unforgettable night of music, energy, and pure entertainment.",
        cover: "image-1.jpg",
        month: "DEC",
        date: 25,
        price: "800",
        category: "Concert",
        location: "Dhaka, Bangladesh",
        time: "7:00 PM",
        tickets: "620+",
      },
      {
        id: "event-2",
        name: "Digital Bangladesh Conference 2024",
        description: "Join Bangladesh's premier technology conference featuring industry leaders, innovators, and policymakers discussing the future of digital transformation in Bangladesh.",
        cover: "image-2.jpg",
        month: "NOV",
        date: 15,
        price: "500",
        category: "Conference",
        location: "Dhaka, Bangladesh",
        time: "9:00 AM",
        tickets: "375+",
      },
      {
        id: "event-3",
        name: "Bangladesh Education & Career Expo 2024",
        description: "The largest education and career expo in Bangladesh, featuring universities, colleges, skill development institutes, and career opportunities from around the world.",
        cover: "image-3.jpg",
        month: "OCT",
        date: 20,
        price: "Free",
        category: "Education Expo",
        location: "Dhaka, Bangladesh",
        time: "10:00 AM",
        tickets: "1900+",
      },
      {
        id: "event-4",
        name: "Dhaka Premier League (DPL) Final 2024",
        description: "Witness the thrilling final match of Dhaka Premier League 2024, featuring the top cricket teams battling for the championship title.",
        cover: "image-4.jpg",
        month: "DEC",
        date: 18,
        price: "200",
        category: "Sports",
        location: "Dhaka, Bangladesh",
        time: "2:00 PM",
        tickets: "720+",
      },
      {
        id: "event-5",
        name: "Dhaka Comedy Club: Laughter Night",
        description: "Get ready for an evening of non-stop laughter with Bangladesh's funniest comedians. A perfect night out filled with humor, wit, and entertainment.",
        cover: "image-5.jpg",
        month: "NOV",
        date: 30,
        price: "800",
        category: "Comedy",
        location: "Dhaka, Bangladesh",
        time: "8:00 PM",
        tickets: "155+",
      },
      {
        id: "event-6",
        name: "Dhaka International Folk Festival 2024",
        description: "A celebration of traditional folk music and culture from Bangladesh and around the world, featuring renowned folk artists and cultural performances.",
        cover: "image-6.jpg",
        month: "JAN",
        date: 5,
        price: "300",
        category: "Festival",
        location: "Dhaka, Bangladesh",
        time: "4:00 PM",
        tickets: "950+",
      },
    ];
  }
}
