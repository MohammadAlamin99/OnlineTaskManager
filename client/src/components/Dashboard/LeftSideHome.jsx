import { RxDashboard } from "react-icons/rx";
import { GoTasklist } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import { AiOutlineTeam } from "react-icons/ai";
const LeftSideHome = () => {
  const path = useLocation().pathname;
  return (
    <div>
      <div className="manuLeft px-4 py-2">
        <ul className="p-0">
          <Link style={{ textDecoration: "none" }} to={"/"}>
            <li
              className={`${
                path === "/" ? "activeSideMenu" : "Not_active_sidemenu"
              }`}
            >
              <RxDashboard /> Dashboard
            </li>
          </Link>
          <Link style={{ textDecoration: "none" }} to={"/profile"}>
            <li
              className={`${
                path === "/profile" ? "activeSideMenu" : "Not_active_sidemenu"
              }`}
            >
              <FiUserPlus /> Profile
            </li>
          </Link>

          <Link style={{ textDecoration: "none" }} to={"/task"}>
            <li
              className={`${
                path === "/task" ? "activeSideMenu" : "Not_active_sidemenu"
              }`}
            >
              <GoTasklist /> Tasks
            </li>
          </Link>
          <Link style={{ textDecoration: "none" }} to={"/member"}>
            <li
              className={`${
                path === "/member" ? "activeSideMenu" : "Not_active_sidemenu"
              }`}
            >
              <AiOutlineTeam /> Members
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default LeftSideHome;
