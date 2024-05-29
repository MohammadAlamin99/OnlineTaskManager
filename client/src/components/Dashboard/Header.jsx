import React from 'react';
import { MdOutlineAddTask } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
const Header = () => {
    return (
        <div>
            <div className="row">
                <div className="col-lg-2">
                <div className="MainHeader d-flex">
                <span><MdOutlineAddTask style={{marginLeft:"5px", marginBottom:"2px"}}/></span>
              <p>Online Task</p>
           </div>
                </div>
                <div className="col-lg-9">
                <input type="text" className="form-control px-5" id="exampleFormControlInput1" placeholder="Search"
                    style={{color:"#495057", background:"#fff",width:"255px"}} />
                </div>
                <div className="col-lg-1">
                <IoMdNotificationsOutline style={{fontSize:"24px", cursor:"pointer", }}/>
                <div className="profil">
                    
                </div>
                </div>
            </div>
        </div>
    );
};

export default Header;