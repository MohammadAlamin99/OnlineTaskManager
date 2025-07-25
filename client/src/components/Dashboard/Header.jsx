import React, { useEffect } from "react";
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
          <div className="notification">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 18.0233C21 18.5113 20.6043 18.907 20.1163 18.907H3.88372C3.39565 18.907 3 18.5113 3 18.0233C3 17.5352 3.39566 17.1395 3.88372 17.1395H3.9V10.9809C3.9 6.57288 7.527 3 12 3C16.473 3 20.1 6.57288 20.1 10.9809V17.1395H20.1163C20.6043 17.1395 21 17.5352 21 18.0233ZM5.7 17.1395H18.3V10.9809C18.3 7.5494 15.4794 4.76744 12 4.76744C8.5206 4.76744 5.7 7.5494 5.7 10.9809V17.1395ZM9.97604 20.7558C9.73121 20.2608 10.1977 19.7907 10.75 19.7907H13.25C13.8023 19.7907 14.2688 20.2608 14.024 20.7558C13.9155 20.9751 13.7699 21.1773 13.591 21.3529C13.169 21.7672 12.5967 22 12 22C11.4033 22 10.831 21.7672 10.409 21.3529C10.2301 21.1773 10.0845 20.9751 9.97604 20.7558Z"
                fill="#768396"
              />
            </svg>
            <span>2</span>
          </div>
          <div className="profil">
            <a href="/profile">
              <img src={userGet?.photo} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
