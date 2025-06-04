import Banner from "../Banner";
import CardList from "../cards/CardList";
import FlagshipEvents from "../EventAndReview/FlagshipEvent";
import MakeOwnEvent from "../MakeOwnEvent/MakeOwnEvent";
import Partner from "../Partner";
const Landing = () => {
    return (
        <div>
            <Banner></Banner>
            <CardList></CardList>

            <MakeOwnEvent></MakeOwnEvent>
            <FlagshipEvents></FlagshipEvents>
            <Partner></Partner>
        </div>
    );
};

export default Landing;