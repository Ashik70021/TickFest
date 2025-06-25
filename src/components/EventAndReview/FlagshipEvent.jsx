import Marquee from "react-fast-marquee";
import { getData } from "../../data/carts";
import getImage from "../../utills/getImage";
export default function FlagshipEvents() {
    const cards = getData();
    return (
        <>
            <div className="text-center flex flex-col gap-2">
                <h1 className="text-3xl font-bold ">
                    Flagship Events in Review: Made Easy with Tickfest Ticketing
                </h1>
                <p className="text-xl">
                    We are proud to showcase the success of our previous flagship events,
                    where Tickify provided exceptional ticketing solutions from start to
                    finish.
                </p>
            </div>
            <Marquee speed={100}>
                <div className="mt-10 flex flex-row gap-4 mb-4 bg-white rounded-xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl ">
                    {cards.map((card, i) => (
                        <img
                            key={i}
                            src={getImage(card.cover)}
                            alt={card.name}
                            className="w-96 h-48 object-cover rounded-2xl ml-8"
                        />
                    ))}
                </div>
            </Marquee>
            <Marquee direction="right" speed={100}>
                <div className="mt-10 flex flex-row gap-4 mb-10 bg-white rounded-xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl ">
                    {cards.map((card, i) => (
                        <img
                            key={i}
                            src={getImage(card.cover)}
                            alt={card.name}
                            className="w-96 h-48 object-cover rounded-2xl ml-8"
                        />
                    ))}
                </div>
            </Marquee>
        </>
    );
}