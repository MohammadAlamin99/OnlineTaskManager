import { useState } from "react";

const Members = () => {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      position: "Frontend Developer",
      email: "john@example.com",
      phone: "+1234567890",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Backend Developer",
      email: "jane@example.com",
      phone: "+0987654321",
    },
    {
      id: 3,
      name: "Mike Johnson",
      position: "UI/UX Designer",
      email: "mike@example.com",
      phone: "+1122334455",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (formData.name && formData.position && formData.email) {
      const newMember = {
        id: members.length + 1,
        ...formData,
      };
      setMembers([...members, newMember]);
      setFormData({ name: "", position: "", email: "", phone: "" });
      setShowModal(false);
    } else {
      alert("Please fill in all required fields");
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({ name: "", position: "", email: "", phone: "" });
  };
  return (
    <>
      <div className="heading__wrapper d-flex justify-content-between align-items-center px-4">
        <h2 className="team__main__tile">🏆 Members</h2>
        <button
          className="commonBtn"
          onClick={() => setShowModal(true)}
        >
          + Add Member
        </button>
      </div>
      <div className="container">
        <div className="row members__container__wrapper">
          <div className="col-12 bg-white py-3 px-4 shadow-sm rounded">
            {/* Team Members Table */}
            <div className="table-responsive">
              <table className="table mb-0">
                <thead className="table-height">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Position</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member, index) => (
                    <tr key={member.id}>
                      <th>{index + 1}</th>
                      <td>{member.name}</td>
                      <td>
                          {member.position}
                      </td>
                      <td>{member.email}</td>
                      <td>{member.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Popup */}
        {showModal && (
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">Add New Team Member</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={handleClose}
                  ></button>
                </div>

                <div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter full name"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="position" className="form-label">
                        Position <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        placeholder="Enter position"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email address"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Phone
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSubmit}
                    >
                      Add Member
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Members;
