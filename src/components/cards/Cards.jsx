import getImage from "../../utills/grtImage";

export default function Cards({ card }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col">
      <img
        src={getImage(card.cover)}
        alt={card.name}
        className="w-96 h-48 object-cover rounded-2xl ml-20"
      />
      <div className="p-4 flex flex-row text- gap-2 ml-16">
        {/* Date Block */}
        <div className="text-center w-16">
          <p className="text-sm font-semibold text-gray-500">
            {card.month.toUpperCase()}
          </p>
          <p className="text-2xl font-bold text-gray-900 leading-none">
            {card.date}
          </p>
        </div>

        {/* Details Block */}
        <div className="w-56">
          <h3 className="text-sm font-bold text-gray-800">{card.name}</h3>
          <p className="text-xs text-gray-500 mt-1">{card.description}</p>
        </div>
      </div>
    </div>
  );
}
