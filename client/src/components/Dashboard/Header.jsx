import React, { useEffect } from 'react';
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { userDetailsRequest } from '../../apiRequiest/apiRequiest';
import { setuserDetails } from '../../redux/state-slice/getUserDetails-slice';
const Header = () => {
    const dispatch = useDispatch();
    const userGet = useSelector((state)=> state.userGet.userDetails);
    useEffect(() => {
        (async () => {
            let result = await userDetailsRequest();
            dispatch(setuserDetails(result['data'][0]))
        })();
    }, [0]);
    return (
        <div>
            <div className="row">
                <div className="col-lg-2">
                <div className="MainHeader d-flex">
                <span><FaTasks style={{marginLeft:"6px", marginBottom:"3px", fontSize:"16px"}}/></span>
              <p> Dashboard</p>
           </div>
                </div>
                <div className="col-lg-9">
                <input type="text" className="form-control px-5" id="exampleFormControlInput1" placeholder="Search"
                    style={{color:"#495057", background:"#fff",width:"255px"}} />
                </div>
                <div className="col-lg-1 d-flex">
                <IoMdNotificationsOutline style={{fontSize:"24px", cursor:"pointer", marginTop:"8px"}}/>
                <div className="profil">
                   <a href="/profile"> <img src={userGet.photo} alt="" /></a>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Header;