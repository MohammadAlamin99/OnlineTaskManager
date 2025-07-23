"use client";

import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IsEmpty } from "../Helper/FormHelper";
import { UserRegistrationRequiest } from "../apiRequiest/apiRequiest";
import toast, { Toaster } from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";

const Register = () => {
  const [load, setLoaded] = useState(false);
  const emailRef = useRef();
  const firstNameRef = useRef();
  const adminCodeRef = useRef();
  const mobileRef = useRef();
  const passwordRef = useRef();
  const designationRef = useRef();
  const navigate = useNavigate();

  const onRegistration = async () => {
    const email = emailRef.current.value;
    const Name = firstNameRef.current.value;
    const admincode = adminCodeRef.current.value;
    const mobile = mobileRef.current.value;
    const password = passwordRef.current.value;
    const designation = designationRef.current.value;
    const photo =
      "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg";

    if (IsEmpty(email)) {
      toast.error("Valid Email Required!");
    } else if (IsEmpty(Name)) {
      toast.error("First Name Required!");
    } else if (IsEmpty(admincode)) {
      toast.error("Admin Secret key Required!");
    } else if (admincode !== "admin1234") {
      toast.error("Invalid Admin Secret Key!");
    } else if (IsEmpty(mobile)) {
      toast.error("Valid Mobile Number Required!");
    } else if (IsEmpty(password)) {
      toast.error("Password Required!");
    } else if (IsEmpty(designation)) {
      toast.error("Designation Required!");
    } else {
      try {
        setLoaded(true);
        const res = await UserRegistrationRequiest(
          email,
          Name,
          mobile,
          password,
          admincode,
          designation,
          photo
        );
        setLoaded(false);

        if (res.status === 200) {
          if (res.data.status === "Success") {
            toast.success("Registration has been successful");
            navigate("/login");
          } else if (res.data.status === "fail") {
            if (
              res.data.message.keyPattern &&
              res.data.message.keyPattern.email === 1
            ) {
              toast.error("Email Already Exists");
            } else {
              toast.error("Something Went Wrong");
            }
          }
        }
      } catch (error) {
        toast.error("Something Went Wrong");
        setLoaded(false);
      }
    }
  };

  if (load) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <BeatLoader
          color="#0866FF"
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-vh-100 d-flex align-items-center bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-lg border-0">
                <div className="login__body card-body p-5">
                  <div className="text-center mb-4">
                    <h2 className="login__heading mb-2">Create Account</h2>
                    <p className="text-muted">Join us today and get started</p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      onRegistration();
                    }}
                  >
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label fw-semibold">
                        Email Address
                      </label>
                      <input
                        ref={emailRef}
                        id="email"
                        type="email"
                        className="form-control w-100 fs-6 form-control-lg"
                        placeholder="Email"
                        required
                      />
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label
                          htmlFor="firstName"
                          className="form-label fw-semibold"
                        >
                          Name
                        </label>
                        <input
                          ref={firstNameRef}
                          id="firstName"
                          type="text"
                          className="form-control w-100 fs-6 form-control-lg"
                          placeholder="First name"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor="firstName"
                          className="form-label fw-semibold"
                        >
                          Admin Secret Key
                        </label>
                        <input
                          ref={adminCodeRef}
                          id="firstName"
                          type="text"
                          className="form-control w-100 fs-6 form-control-lg"
                          placeholder="Admin Secret Key"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="mobile"
                        className="form-label fw-semibold"
                      >
                        Mobile Number
                      </label>
                      <input
                        ref={mobileRef}
                        id="mobile"
                        type="tel"
                        className="form-control w-100 fs-6 form-control-lg"
                        placeholder="Phone number"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Designation
                      </label>
                      <input
                        ref={designationRef}
                        type="tel"
                        className="form-control w-100 fs-6 form-control-lg"
                        placeholder="Designation"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="form-label fw-semibold"
                      >
                        Create Password
                      </label>
                      <input
                        ref={passwordRef}
                        id="password"
                        type="password"
                        className="form-control w-100 fs-6 form-control-lg"
                        placeholder="Password"
                        required
                      />
                    </div>

                    <div className="d-grid mb-4">
                      <button
                        type="submit"
                        className="commonBtn fs-6"
                        disabled={load}
                      >
                        {load ? "Creating Account..." : "Create Account"}
                      </button>
                    </div>
                  </form>

                  <div className="text-center">
                    <p className="mb-0 text-muted">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-decoration-none fw-semibold text-dark"
                      >
                        Sign In
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
