import React from 'react';
import LeftSideHome from './LeftSideHome';
import Header from './Header';

const Home = () => {
  return (
    <div>
      <div className="">
        <div className="row">
          <div className="col-lg-12 pt-3">
            <Header/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
           <LeftSideHome/>
          </div>
          <div className="col-lg-10">
             <h1>this is Dashboard</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;