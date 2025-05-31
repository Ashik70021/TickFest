import { Outlet } from "react-router-dom";
import CardList from "../components/cards/CardList";
import Footer from "../components/footer/Footer";
import Navbar from "../components/header/Navbar";
import MakeOwnEvent from "../components/MakeOwnEvent/MakeOwnEvent";
const MainLayout = () => {
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div className="min-h-screen">
        <CardList />
        <MakeOwnEvent />
        <Outlet />
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default MainLayout;
