import React from 'react';
import LeftSideHome from '../components/Dashboard/LeftSideHome';
import TodoTask from '../components/TodoTask';
import Header from '../components/Dashboard/Header';

const TodoPage = () => {
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

                        <div className="row">
                            <div className="getTask d-flex pb-2">
                                <div className="col-lg-12">
                                <TodoTask/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoPage;