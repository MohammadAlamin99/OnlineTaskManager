import React, { useEffect, useRef, useState } from 'react';
import { UserProfileUpdateRequest, userDetailsRequest } from '../apiRequiest/apiRequiest';
import { useDispatch, useSelector } from 'react-redux';
import { setuserDetails } from '../redux/state-slice/getUserDetails-slice';
import { TbLogout } from "react-icons/tb";
import BeatLoader  from "react-spinners/BeatLoader";

const Profile = () => {
    const [load, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const userGet = useSelector((state)=> state.userGet.userDetails);
    useEffect(() => {
        (async () => {
            setLoaded(true)
            let result = await userDetailsRequest();
            setLoaded(false)
            dispatch(setuserDetails(result['data'][0]))
        })();
    }, [0]);


    // update api call
    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const mobileRef = useRef();
    const passwordRef= useRef();
    const photoRef= useRef();

    const onSubmitHanler = async()=>{
        const email = emailRef.current.value;
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const mobile = mobileRef.current.value;
        const password = passwordRef.current.value;
        const photo = photoRef.current.value;
        await UserProfileUpdateRequest(email, firstName, lastName, mobile, password, photo);
        window.location.reload();
    }
    return (
        load?(
          <div className="loader-container">
          <BeatLoader
              color="#0866FF"
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
          />
      </div>
        ):(
          <div>
           <div className="container">
                    <div className="myInformation d-flex">
                       <div className="myIm pt-3">
                       <img src={userGet.photo} alt="" />
                       </div>
                       <div className="myIn">
                       <p>{userGet.firstName+" "+ userGet.lastName}</p>
                       <span>{userGet.email}</span>
                       <h5>{userGet.mobile}</h5>
                       <h6>Log Out <TbLogout /></h6>
                       </div>
                    </div>

            <div className="container pt-4">
    <div className="row d-flex justify-content-center">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <div className="container-fluid">
              <div className="row profileInside">   
                <div className="col-4 p-2">
                <label>Profile Picture</label>
                 <input ref={photoRef} defaultValue={userGet.photo} placeholder="Image URL" className="form-control animated fadeInUp" type="text"/>
                </div>
                <div className="col-4 p-2">
                  <label>Email Address</label>
                  <input ref={emailRef} readOnly defaultValue={userGet.email} placeholder="User Email" className="form-control animated fadeInUp" type="email" />
                </div>
                <div className="col-4 p-2">
                  <label>First Name</label>
                  <input ref={firstNameRef} defaultValue={userGet.firstName} placeholder="First Name" className="form-control animated fadeInUp" type="text" />
                </div>
                <div className="col-4 p-2">
                  <label>Last Name</label>
                  <input ref={lastNameRef} defaultValue={userGet.lastName} className="form-control animated fadeInUp" type="text" />
                </div>
                <div className="col-4 p-2">
                  <label>Mobile</label>
                  <input ref={mobileRef} defaultValue={userGet.mobile} className="form-control animated fadeInUp" type="mobile" />
                </div>
                <div className="col-4 p-2">
                  <label>Password</label>
                  <input ref={passwordRef} defaultValue={userGet.password} placeholder="User Password" className="form-control animated fadeInUp" type="password" />
                </div>
                <div className="col-4 p-2 ProfileUpdateBtn">
                  <button onClick={onSubmitHanler} style={{border:"0", background:"#0866FF"}} className="w-100 float-end animated fadeInUp rounded">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
           </div>
        </div>
        )
    );
};

export default Profile;