import React, { useEffect } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { userDetailsRequest } from "../../apiRequiest/apiRequiest";
import { setuserDetails } from "../../redux/state-slice/getUserDetails-slice";
const Header = () => {
  const dispatch = useDispatch();
  const userGet = useSelector((state) => state.userGet.userDetails);
  useEffect(() => {
    (async () => {
      let result = await userDetailsRequest();
      dispatch(setuserDetails(result["data"][0]));
    })();
  }, [0]);
  return (
    <div>
      <div className="header_wrapper g-0 row py-3 justify-content-between align-items-center px-4 m-0 g-0 ">
        <div className="col-lg-2 p-0">
          <div className="MainHeader d-flex align-items-center gap-2">
            <span>
              <FaTasks />
            </span>
            <p className="m-0"> Dashboard</p>
          </div>
        </div>
        <div className="col-lg-8 p-0">
          <input
            type="text"
            className="form-control px-5"
            id="exampleFormControlInput1"
            placeholder="Search"
          />
        </div>
        <div className="header_right col-lg-2 d-flex justify-content-end align-items-center gap-3 p-0">
          <IoMdNotificationsOutline />
          <div className="profil">
            <a href="/profile">
              <img src={userGet.photo} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
