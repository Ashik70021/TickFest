import { getData } from "../../data/cards";
import Cards from "./Cards";

export default function CardList() {
  const cardItems = getData();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 md:px-8 py-10">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-16">
        Upcoming Events
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardItems.map((card) => (
          <Cards key={card.id} card={card} />
        ))}
      </div>
      <div className="mt-16 text-center">
        <button className="px-6 py-2 border border-blue-500 text-blue-500 rounded-2xl hover:bg-blue-50">
          Load More
        </button>
      </div>
    </div>
  );
}
