import Banner from "../Banner";
import CardList from "../cards/CardList";
import MakeOwnEvent from "../MakeOwnEvent/MakeOwnEvent";
import Partner from "../Partner";
const Landing = () => {
    return (
        <div>
            <Banner></Banner>
            <CardList></CardList>
            <MakeOwnEvent></MakeOwnEvent>
            <Partner></Partner>
        </div>
    );
};

export default Landing;