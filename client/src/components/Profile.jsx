import React, { useEffect, useRef } from 'react';
import { UserProfileUpdateRequest, userDetailsRequest } from '../apiRequiest/apiRequiest';
import { useDispatch, useSelector } from 'react-redux';
import { setuserDetails } from '../redux/state-slice/getUserDetails-slice';

const Profile = () => {
    const dispatch = useDispatch();
    const userGet = useSelector((state)=> state.userGet.userDetails);
    useEffect(() => {
        (async () => {
            let result = await userDetailsRequest();
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
        <div>
           <div className="container">
            <div className="row">
                <div className="col-12 profileP">
                    <img src={userGet.photo} alt="" />
                    <p>Change photo:</p>
                    <input ref={photoRef} type="text" placeholder='Image URL' defaultValue={userGet.photo}/>
                    <p>First Name:</p>
                    <input ref={firstNameRef} type="text" defaultValue={userGet.firstName}/>
                    <p>Last Name:</p>
                    <input ref={lastNameRef} type="text" defaultValue={userGet.lastName}/>
                    <p>Email:</p>
                    <input ref={emailRef} type="text" defaultValue={userGet.email} readOnly/>
                    <p>Phone:</p>
                    <input ref={mobileRef} type="text" defaultValue={userGet.mobile}/>
                    <p>Set New Password:</p>
                    <input ref={passwordRef} type="password" defaultValue={userGet.password}/>
                </div>
                <button onClick={onSubmitHanler} className='btn btn-primary w-auto mt-3' 
                style={{marginLeft:"11px"}}>Update</button>
            </div>
           </div>
        </div>
    );
};

export default Profile;