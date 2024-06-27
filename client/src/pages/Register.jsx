import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IsEmpty } from "../Helper/FormHelper";
import { UserRegistrationRequiest } from "../apiRequiest/apiRequiest"; 
import toast, { Toaster } from 'react-hot-toast';
const Register = () => {
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const mobileRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const onRegistration = async () => {
    const email = emailRef.current.value;
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const mobile = mobileRef.current.value;
    const password = passwordRef.current.value;
    let photo="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"

    if (IsEmpty(email)) {
      toast.error("Valid Email Required !");
    } else if (IsEmpty(firstName)) {
      toast.error("First Name Required !");
    } else if (IsEmpty(lastName)) {
      toast.error("Last Name Required !");
    } else if (IsEmpty(mobile)) {
      toast.error("Valid Mobile Number Required !");
    } else if (IsEmpty(password)) {
      toast.error("Password Required !");
    } else {
      try {
        const res = await UserRegistrationRequiest(email, firstName, lastName, mobile, password,photo);
        if (res.status === 200) {
          if (res.data.status === 'success') {
            toast.success("Registration has been successful");
            navigate("/login");
          } else if (res.data.status === 'fail') {
            if (res.data.message.keyPattern.email === 1) {
              toast.error("Email Already Exists");
            } else {
              toast.error("Something Went Wrong");
            }
          }
        }
      } catch (error) {
        console.error("Error during registration:", error);
        toast.error("Something Went Wrong");
      }
    }
  };

  return (
    <div className="vh-100 vw-100 bg-body-secondary d-flex justify-content-center align-items-center">
      <div className="p-3">
        <div
          className="bg-body p-5 rounded shadow mx-auto "
          style={{ maxWidth: "35rem" }}
        >
          <h3 className="text-muted pb-3 Loginpage">Sign Up</h3>
          <form className="row g-3">
            <div className="col-12">
              <input
                type="email"
                className="form-control focus-ring custom"
                placeholder="Your Email"
                ref={emailRef}
              />
            </div>
            <div className="col-12">
              <input
                type="text"
                className="form-control focus-ring custom"
                placeholder="Your First Name"
                ref={firstNameRef}
              />
            </div>
            <div className="col-12">
              <input
                type="text"
                className="form-control focus-ring custom"
                placeholder="Your Last Name"
                ref={lastNameRef}
              />
            </div>
            <div className="col-12">
              <input
                type="number"
                className="form-control focus-ring custom"
                placeholder="Your Mobile"
                ref={mobileRef}
              />
            </div>
            <div className="col-12">
              <input
                type="password"
                className="form-control focus-ring custom"
                placeholder="Your Password"
                ref={passwordRef}
              />
            </div>

            <div className="col-12">
              <button
                type="button" 
                className="btn text-white"
             
                onClick={onRegistration}
                style={{fontFamily:"'Poppins', sans-serif;", fontWeight:"400", background:"#0866FF", color:"#fff"}} 
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="mt-3 profileInside">
            Already have an account?
            <span className="text-orange-500">
              <Link to="/login" style={{ color: "#0866FF" }}>
                {" "}
                Login
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
