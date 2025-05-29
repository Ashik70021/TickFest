import getImage from "../../utills/grtImage";
export default function Cards({ card }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={getImage(card.cover)}
        alt={card.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 flex gap-4">
        <div className="text-center">
          <p className="text-lg font-bold text-blue-800">{card.month}</p>
          <p className="text-2xl font-extrabold text-gray-900">{card.date}</p>
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-700">{card.name}</h3>
          <p className="text-xs text-gray-400 mt-1">{card.description}</p>
        </div>
      </div>
    </div>
  );
}
