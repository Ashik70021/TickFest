import { Outlet } from "react-router-dom";
import CardList from "../components/cards/CardList";
import Footer from "../components/footer/Footer";
import Navbar from "../components/header/Navbar";
const MainLayout = () => {
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div className="min-h-screen">
        <Outlet>
          <CardList />
        </Outlet>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default MainLayout;
