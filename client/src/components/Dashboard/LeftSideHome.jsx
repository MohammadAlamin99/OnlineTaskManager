import { RxDashboard } from "react-icons/rx";
import { GoTasklist } from "react-icons/go";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { TbProgress } from "react-icons/tb";
import { RiTodoLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { FiUserPlus } from "react-icons/fi";
const LeftSideHome = () => {
    const path = useLocation().pathname;
    return (
        <div>
            <div className="manuLeft">
                <ul className='p-0'>
                    <Link style={{textDecoration:"none"}} to={"/"}>
                        <li className={`${path === "/" ? "activeSideMenu" : "Not_active_sidemenu"}`}><RxDashboard/> Dashboard</li>
                    </Link>
                    <Link style={{textDecoration:"none"}} to={"/profile"}>
                        <li className={`${path === "/profile" ? "activeSideMenu" : "Not_active_sidemenu"}`}><FiUserPlus/> Profile</li>
                    </Link>

                    <Link style={{textDecoration:"none"}} to={"/task"}>
                        <li className={`${path === "/task" ? "activeSideMenu" : "Not_active_sidemenu"}`}><GoTasklist/> Tasks</li>
                    </Link>
                    
                    <Link style={{textDecoration:"none"}} to={"/complete"}>
                        <li className={`${path === "/complete" ? "activeSideMenu" : "Not_active_sidemenu"}`}><MdOutlineAssignmentTurnedIn/> Complete</li>
                    </Link>

                    <Link style={{textDecoration:"none"}} to={"/inprogress"}>
                        <li className={`${path === "/inprogress" ? "activeSideMenu" : "Not_active_sidemenu"}`}><TbProgress/> In Progress</li>
                    </Link>

                    <Link style={{textDecoration:"none"}} to={"/todo"}>
                        <li className={`${path === "/todo" ? "activeSideMenu" : "Not_active_sidemenu"}`}><RiTodoLine/> To Do</li>
                    </Link>
                    <Link style={{textDecoration:"none"}} to={"/teamTasks"}>
                        <li className={`${path === "/teamTasks" ? "activeSideMenu" : "Not_active_sidemenu"}`}><FaUsers/> Assign Tasks</li>
                    </Link>

                </ul>
            </div>
        </div>
    );
};

export default LeftSideHome;