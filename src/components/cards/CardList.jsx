import { getData } from "../../data/cards";
import Cards from "./Cards";

export default function CardList() {
  const cardItems = getData();
  return (
    <div>
      <h1 className="text-center text-4xl text-bold mb-8">
        Explore Upcomings!
      </h1>
      {cardItems.map((card) => (
        <Cards key={card.id} card={card} />
      ))}
    </div>
  );
}
