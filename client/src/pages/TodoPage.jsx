import LeftSideHome from '../components/Dashboard/LeftSideHome';
import TodoTask from '../components/TodoTask';
import Header from '../components/Dashboard/Header';

const TodoPage = () => {
    return (
        <>
            <div className="">
                <div className="row g-0">
                    <div className="col-lg-12">
                        <Header />
                    </div>
                </div>
                <div className="row g-0">
                    <div className="col-lg-2">
                        <LeftSideHome />
                    </div>
                    <div className="col-lg-10">
                        <div className="row g-0">
                            <div className="getTask d-flex pb-2">
                                <div className="col-lg-12">
                                    <TodoTask />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TodoPage;