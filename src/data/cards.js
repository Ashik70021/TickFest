let cards = [
  {
    id: crypto.randomUUID(),
    name: "Wonder Girls 2010 Wonder Girls World Tour San Francisco",
    description:
      "We’ll get you directly seated and inside for you to enjoy the show.",
    cover: "Rectangle 12.jpg",
    month: "APR",
    date: 14,
  },
  {
    id: crypto.randomUUID(),
    name: "JYJ 2011 JYJ Worldwide Concert Barcelona",
    description: "Directly seated and inside for you to enjoy the show.",
    cover: "image-1.jpg",
    month: "AUG",
    date: 20,
  },
  {
    id: crypto.randomUUID(),
    name: "2011 Super Junior SM Town Live '10 World Tour New York City",
    description: "Directly seated and inside for you to enjoy the show.",
    cover: "image-2.jpg",
    month: "SEP",
    date: 18,
  },
  {
    id: crypto.randomUUID(),
    name: "Wonder Girls 2010 Wonder Girls World Tour San Francisco",
    description:
      "We’ll get you directly seated and inside for you to enjoy the show.",
    cover: "image-3.jpg",
    month: "APR",
    date: 14,
  },
  {
    id: crypto.randomUUID(),
    name: `2011 Super Junior SM Town Live '10 World Tour New York City`,
    description: "Directly seated and inside for you to enjoy the show.",
    cover: "image-4.jpg",
    month: "SEP",
    date: 18,
  },
  {
    id: crypto.randomUUID(),
    name: `JYJ 2011 JYJ Worldwide Concert Barcelona`,
    description: `Directly seated and inside for
     you to enjoy the show.`,
    cover: "image-5.jpg",
    month: "Aug",
    date: 20,
  },
];
export function getData() {
  return cards;
}
