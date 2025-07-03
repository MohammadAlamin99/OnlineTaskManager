import React from 'react';
import Header from '../components/Dashboard/Header';
import LeftSideHome from '../components/Dashboard/LeftSideHome';
import TeamTask from '../components/TeamTask';

const TeamTaskPage = () => {
    return (
        <div>
            <div className="">
                <div className="row g-0">
                    <div className="col-lg-">
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
                                    <TeamTask/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamTaskPage;