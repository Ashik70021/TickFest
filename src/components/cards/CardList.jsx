import { getData } from "../../data/cards";
import Cards from "./Cards";

export default function CardList() {
  const cardItems = getData();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 md:px-8 py-10">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-10">
        Upcoming Events
      </h1>
      <div className="grid grid-cols-3  gap-4">
        {cardItems.map((card) => (
          <Cards key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
