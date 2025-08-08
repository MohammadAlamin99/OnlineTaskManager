import LeftSideHome from "./LeftSideHome";
import Header from "./Header";
import Dashboard from "../Dashboard";

const Home = () => {
  return (
    <div>
      <div className="MainContainer w-100 m-0 p-0">
        <div className="row g-0">
          <div className="col-lg-12 p-0"> 
            <Header />
          </div>
        </div>
        <div className="rightSide row g-0 w-100 m-0">
          <div className="col-lg-2 p-0 bg-white">
            <LeftSideHome />
          </div>
          <div className="col-lg-10">
            <Dashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
