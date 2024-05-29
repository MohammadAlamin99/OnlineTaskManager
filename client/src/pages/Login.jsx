import React, { Fragment, useRef, useState} from "react";
import { Link } from "react-router-dom";
import { UserLoginRequiest } from "../apiRequiest/apiRequiest";
import { IsEmpty } from "../Helper/FormHelper";
import { setToken, setUserDetails } from "../Helper/SessionHelper";
import Loading from 'react-fullscreen-loading';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [load, setLoaded] = useState(false);

  const emailRef = useRef(); 
  const passRef = useRef();

  const onLogin = async () => {
    const email = emailRef.current.value;
    const pass = passRef.current.value;

    if (IsEmpty(email)) {
      toast.error("Invalid email address !");
    } else if (IsEmpty(pass)) {
      toast.error("Password Required !");
    } else {
      try {
        setLoaded(true)
        const res = await UserLoginRequiest(email, pass);
        setLoaded(false)
        if (res.status === 200) {
          if(res.data.status==='fail'){
            toast.error("Wrong Password or Email")
          }
          else{
            setToken(res.data['token']);
            setUserDetails(res.data['data']);
            toast.success("Login Success");
            window.location.href = "/";
          }
        } 
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    load?(  <Loading loading={true} loaderColor="#419CA6" />):(
      <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90  p-4">
                            <div className="card-body">
                                <h4 className="Loginpage">SIGN IN</h4>
                                <br/>
                                <input ref={emailRef} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                <br/>
                                <input ref={passRef} placeholder="User Password" className="form-control animated fadeInUp" type="password"/>
                                <br/>
                                <button onClick={onLogin} style={{fontFamily:"'Poppins', sans-serif;", fontWeight:"400", background:"#419CA6", color:"#fff"}} className="btn w-100 animated fadeInUp float-end">Next</button>
                                <hr/>
                                <div className="float-end mt-3 forgoteBtn">

                                    <span>
                                        <Link style={{textDecoration:"none"}} className="text-center ms-3 h6 animated fadeInUp" to="/register">Sign Up </Link>
                                        <span className="ms-2">|</span>
                                        <Link style={{textDecoration:"none"}} className="text-center ms-3 h6 animated fadeInUp">Forget Password</Link>
                                    </span>

                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
  );
};

export default Login;
