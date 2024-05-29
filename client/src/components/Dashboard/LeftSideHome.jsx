import React from 'react';
import { RxDashboard } from "react-icons/rx";
import { GoTasklist } from "react-icons/go";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { TbProgress } from "react-icons/tb";
import { RiTodoLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { Link } from 'react-router-dom';
const LeftSideHome = () => {
    return (
        <div>
            <div className="manuLeft">
                <ul className='p-0'>
                    <Link style={{textDecoration:"none"}} to={"/"}><li><RxDashboard/> Dashboard</li></Link>
                    <Link style={{textDecoration:"none"}} to={"/task"}><li><GoTasklist/> Tasks</li></Link>
                    <li><MdOutlineAssignmentTurnedIn/> Complete</li>
                    <li><TbProgress/> In Progress</li>
                    <li><RiTodoLine/> To Do</li>
                    <li><FaUsers/> Member</li>
                </ul>
            </div>
        </div>
    );
};

export default LeftSideHome;