import { RxDashboard } from "react-icons/rx";
import { GoTasklist } from "react-icons/go";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { TbProgress } from "react-icons/tb";
import { RiTodoLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
const LeftSideHome = () => {
    const path = useLocation().pathname;


    return (
        <div>
            <div className="manuLeft">
                <ul className='p-0'>
                    <Link style={{textDecoration:"none"}} to={"/"}>
                        <li className={`${path === "/" ? "activeSideMenu" : "Not_active_sidemenu"}`}><RxDashboard/> Dashboard</li>
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

                    <li><FaUsers/> Member</li>
                </ul>
            </div>
        </div>
    );
};

export default LeftSideHome;