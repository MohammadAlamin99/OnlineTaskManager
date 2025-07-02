import Header from '../components/Dashboard/Header';
import LeftSideHome from '../components/Dashboard/LeftSideHome';
import Profile from '../components/Profile';

const ProfilePage = () => {
    return (
        <>
            <div className="">
                <div className="row g-0">
                    <div className="col-lg-12">
                        <Header />
                    </div>
                </div>
                <div className="row g-0">
                    <div className="col-lg-2 p-0 bg-white">
                        <LeftSideHome />
                    </div>
                    <div className="col-lg-10">
                        <div className="row g-0">
                            <div className="getTask d-flex pb-2">
                                <div className="col-lg-12">
                                    <Profile />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;