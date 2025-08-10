import { useEffect, useRef, useState } from "react";
import {
  UserProfileUpdateRequest,
  userDetailsRequest,
} from "../apiRequiest/apiRequiest";
import { useDispatch, useSelector } from "react-redux";
import { setuserDetails } from "../redux/state-slice/getUserDetails-slice";
import { TbLogout } from "react-icons/tb";
import BeatLoader from "react-spinners/BeatLoader";
import toast, { Toaster } from "react-hot-toast";
import badge from "../assets/images/adminVarificationBadge.png";

const Profile = () => {
  const [load, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const userGet = useSelector((state) => state.userGet.userDetails);

  useEffect(() => {
    (async () => {
      setLoaded(true);
      const result = await userDetailsRequest();
      setLoaded(false);
      dispatch(setuserDetails(result["data"][0]));
    })();
  }, [dispatch]);

  // Logout button function
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  // update api call
  const emailRef = useRef();
  const NameRef = useRef();
  const mobileRef = useRef();
  const designationRef = useRef();
  const photoRef = useRef();

  const onSubmitHanler = async () => {
    const email = emailRef.current.value;
    const name = NameRef.current.value;
    const mobile = mobileRef.current.value;
    const designation = designationRef.current.value;
    const photo = photoRef.current.value;
    console.log("designation", designation);

    await UserProfileUpdateRequest(email, name, mobile, designation, photo);
    toast.success("Profile Update Successfully!");
    // window.location.reload();
  };

  return load ? (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <BeatLoader
          color="#0866FF"
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <p className="mt-3 text-muted">Loading profile...</p>
      </div>
    </div>
  ) : (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        {/* Profile Header Section */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-8">
            <div className="card shadow border-0 mb-4">
              <div className="card-body p-4">
                <div className="d-flex align-items-center flex-column flex-md-row text-center text-md-start">
                  <div className="mb-3 mb-md-0  me-md-4">
                    <img
                      src={
                        userGet?.photo ||
                        "/placeholder.svg?height=100&width=100"
                      }
                      alt="Profile"
                      className="rounded-circle profile_image object-fit-cover"
                      width="100"
                      height="100"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <h3 className="fw-bold text-dark fs-5 mb-0 d-flex align-items-center gap-2">
                      {userGet?.name}
                      {userGet?.role === "admin" && (
                        <img
                          className="Varification__badge"
                          src={badge}
                          alt=""
                        />
                      )}
                    </h3>
                    <p className="text-muted mb-0 fs-6">{userGet?.email}</p>
                    <p className="text-muted mb-0 fs-6">{userGet?.mobile}</p>
                  </div>
                  <div>
                    <div className="d-flex gap-2">
                      <p className="adminTag m-0">{userGet?.role}</p>
                      <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
                        <TbLogout className="me-2" />
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Settings Form */}
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow border-0">
              <div className="card-header profile__settings text-white">
                <h4 className="fw-semibold fs-5">Profile Settings</h4>
                <small>Update your personal information</small>
              </div>
              <div className="card-body p-4">
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark">
                      Profile Picture
                    </label>
                    <input
                      ref={photoRef}
                      defaultValue={userGet?.photo}
                      placeholder="Image URL"
                      className="form-control w-100 form-control-lg border-2 fs-6"
                      type="text"
                    />
                  </div>

                  <div className="col-md-6 d-none">
                    <label className="form-label fw-semibold text-dark">
                      Email Address
                    </label>
                    <input
                      ref={emailRef}
                      readOnly
                      defaultValue={userGet?.email}
                      placeholder="User Email"
                      className="form-control w-100 form-control-lg fs-6 border-2"
                      type="email"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark">
                      Name
                    </label>
                    <input
                      ref={NameRef}
                      defaultValue={userGet?.name}
                      placeholder="Name"
                      className="form-control w-100 form-control-lg fs-6 border-2"
                      type="text"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark">
                      Mobile Number
                    </label>
                    <input
                      ref={mobileRef}
                      defaultValue={userGet?.mobile}
                      placeholder="Mobile Number"
                      className="form-control w-100 fs-6 form-control-lg border-2"
                      type="tel"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark">
                      Designation
                    </label>
                    <input
                      ref={designationRef}
                      defaultValue={userGet?.designation}
                      placeholder="Designation"
                      className="form-control w-100 form-control-lg fs-6 border-2"
                      type="text"
                    />
                  </div>

                  <div className="col-12">
                    <br />
                    <div className="d-flex justify-content-end gap-3">
                      <button
                        onClick={onSubmitHanler}
                        className="commonBtn px-4"
                      >
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="row justify-content-center mt-4">
          <div className="col-lg-8">
            <div className="card border-0 bg-primary bg-opacity-10">
              <div className="card-body p-3">
                <div className="d-flex align-items-center">
                  <i className="bi bi-info-circle text-primary fs-4 me-3"></i>
                  <div>
                    <h6 className="mb-1 text-primary">Security Notice</h6>
                    <small className="text-muted">
                      Your profile information is encrypted and secure. Changes
                      will be reflected immediately after update.
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
};

export default Profile;
