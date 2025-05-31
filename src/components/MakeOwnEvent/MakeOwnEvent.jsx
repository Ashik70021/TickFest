import TwoPeople from "../../assets/image-6.png";

export default function MakeOwnEvent() {
  return (
    <div className="w-full h-[252px] top-[1907px] mx-auto bg-[#EEE1FF] flex items-center  justify-between px-10 mb-10">
      <div className="w-1/2 h-full flex  items-center justify-center ">
        <div className=" w-[544px] h-[303px] left-28 bottom-12  relative ">
          <img
            src={TwoPeople}
            alt="Two people on a couch"
            className="w-full h-full   object-contain"
          />
        </div>
      </div>

      <div className="w-1/2 flex flex-col items-start justify-center space-y-4">
        <h1 className="text-xl md:text-4xl font-bold text-gray-800">
          Make your own Event
        </h1>
        <p className="text-lg text-gray-600">
          lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <button className="bg-pink-500 text-white font-semibold py-3 px-12 rounded-full hover:bg-pink-600 transition">
          Create Events
        </button>
      </div>
    </div>
  );
}
