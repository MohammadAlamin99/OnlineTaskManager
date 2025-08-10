import { useState, useRef, useEffect } from "react";
import { getUsersRequest, UserRegistrationRequiest, userUpdateRequest } from "../apiRequiest/apiRequiest";
import { IsEmpty } from "../Helper/FormHelper";
import toast, { Toaster } from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";
import badge from "../assets/images/adminVarificationBadge.png";
import { useDispatch, useSelector } from "react-redux";
import { setMember } from "../redux/state-slice/member-slice";
import { getUserDetails } from "../Helper/SessionHelper";
import { LiaEditSolid } from "react-icons/lia";

const Members = () => {
  const [load, setLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const getAllmember = useSelector((state) => state.getAllMember.member);
  const memberDispatch = useDispatch();

  const userDetails = getUserDetails();

  useEffect(() => {
    (async () => {
      const result = await getUsersRequest();
      memberDispatch(setMember(result?.data));
    })();
  }, [memberDispatch]);

  const nameRef = useRef();
  const positionRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();

  const handleClose = () => setShowModal(false);
  const handleActiveClose = () => {
    setActiveModal(false);
    setSelectedUserId(null);
  };

  const handleAddMember = async () => {
    const name = nameRef.current.value;
    const position = positionRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const password = passwordRef.current.value;
    const admincode = "none";
    const photo = "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg";

    if (IsEmpty(name)) {
      toast.error("Name Required!");
    } else if (IsEmpty(email)) {
      toast.error("Email Required!");
    } else if (IsEmpty(password)) {
      toast.error("Password Required!");
    } else {
      try {
        setLoaded(true);
        const res = await UserRegistrationRequiest(
          email,
          name,
          phone,
          password,
          admincode,
          position,
          photo
        );
        setLoaded(false);

        if (res.status === 200) {
          if (res.data.status === "Success") {
            toast.success("User Add successfully !");
            setShowModal(false);
            const result = await getUsersRequest();
            memberDispatch(setMember(result?.data));
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

  const handleActionClick = (id) => {
    setActiveModal(true);
    setSelectedUserId(id);
  };

  const handleStatusUpdate = async (status) => {
    try {
      setLoaded(true);
      await userUpdateRequest(selectedUserId, status);
      const result = await getUsersRequest();
      memberDispatch(setMember(result?.data));
      toast.success(`User status updated successfully!`);
      setLoaded(false);
      setActiveModal(false);
      setSelectedUserId(null);
    } catch (error) {
      toast.error("Something went wrong");
      setLoaded(false);
    }
  };

  if (load) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <BeatLoader color="#0866FF" size={20} aria-label="Loading Spinner" data-testid="loader" />
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <div className="heading__wrapper d-flex justify-content-between align-items-center px-4">
        <h2 className="team__main__tile">🏆 Members</h2>
        {userDetails?.role === "admin" && (
          <button className="commonBtn d-block" onClick={() => setShowModal(true)}>
            + Add Member
          </button>
        )}
      </div>

      <div className="container-fluid">
        <div className="row members__container__wrapper">
          <div className="col-12 bg-white py-3 px-4 shadow-sm rounded">
            <div className="table-responsive">
              <table className="table mb-0">
                <thead className="table-height">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Position</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getAllmember && getAllmember.map((member, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td className="d-flex align-items-center gap-2">
                        <img src={member?.photo} alt={member?.photo} width={30} height={30} className="user_img rounded-circle" />
                        {member?.name}
                        {member?.role === "admin" && (
                          <img width={15} height={15} src={badge} alt="" />
                        )}
                      </td>
                      <td>{member?.designation}</td>
                      <td>{member.email}</td>
                      <td>{member.mobile}</td>
                      <td>
                        <span className={`badge ${member?.isActive !== false ? 'bg-success' : 'bg-danger'}`}>
                          {member?.isActive !== false ? 'Active' : 'Disable'}
                        </span>
                      </td>
                      <td>
                        <div className="edit__team__member__button">
                          <LiaEditSolid onClick={() => handleActionClick(member?._id)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Add Member Modal */}
        {showModal && (
          <>
            <div className="modal fade show d-block" tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header add__memberBG text-white">
                    <h5 className="modal-title fs-6">Add New Team Member</h5>
                    <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
                  </div>
                  <div>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label className="form-label">Full Name <span className="text-danger">*</span></label>
                        <input type="text" className="form-control w-100" ref={nameRef} placeholder="Enter full name" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Position <span className="text-danger">*</span></label>
                        <input type="text" className="form-control w-100" ref={positionRef} placeholder="Enter position" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email <span className="text-danger">*</span></label>
                        <input type="email" className="form-control w-100" ref={emailRef} placeholder="Enter email address" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input type="tel" className="form-control w-100" ref={phoneRef} placeholder="Enter phone number" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control w-100" ref={passwordRef} placeholder="Enter user password" />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="cencell_common_btn" onClick={handleClose}>Cancel</button>
                      <button type="button" className="commonBtn" onClick={handleAddMember}>Add Member</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Backdrop */}
            <div className="modal-backdrop fade show"></div>
          </>
        )}

        {/* User Status Update Modal */}
        {activeModal && (
          <>
            <div className="modal fade show d-block" tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header add__memberBG text-white">
                    <h5 className="modal-title fs-6">Update User Status</h5>
                    <button type="button" className="btn-close btn-close-white" onClick={handleActiveClose}></button>
                  </div>
                  <div className="modal-body">
                    <p>Are you sure you want to update the user status?</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-success me-2" onClick={() => handleStatusUpdate(true)}>Active</button>
                    <button type="button" className="btn btn-danger" onClick={() => handleStatusUpdate(false)}>Deactivate</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Backdrop */}
            <div className="modal-backdrop fade show"></div>
          </>
        )}
      </div>
    </>
  );
};

export default Members;
