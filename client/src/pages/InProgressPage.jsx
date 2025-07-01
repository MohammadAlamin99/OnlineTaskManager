import React from 'react';
import InProgress from '../components/InProgress';
import LeftSideHome from '../components/Dashboard/LeftSideHome';
import Header from '../components/Dashboard/Header';

const InProgressPage = () => {
    
    return (
        <div>
            <div className="">
                <div className="row g-0">
                    <div className="col-lg-12">
                        <Header/>
                    </div>
                </div>
                <div className="row g-0">
                    <div className="col-lg-2">
                        <LeftSideHome/>
                    </div>
                    <div className="col-lg-10">

                        <div className="row g-0">
                            <div className="getTask d-flex pb-2">
                                <div className="col-lg-12">
                                <InProgress/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InProgressPage;