import Banner from "../Banner";
import CardList from "../cards/CardList";
import MakeOwnEvent from "../MakeOwnEvent/MakeOwnEvent";
const Landing = () => {
    return (
        <div>
            <Banner></Banner>
            <CardList></CardList>
            <MakeOwnEvent></MakeOwnEvent>
        </div>
    );
};

export default Landing;