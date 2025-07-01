import { useEffect, useRef, useState } from "react";
import {
  CreateTaskRequiest,
  getUsersRequest,
} from "../../apiRequiest/apiRequiest";
import { getUserDetails } from "../../Helper/SessionHelper";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/state-slice/user-slice";
import toast, { Toaster } from "react-hot-toast";

const TaskCarosal = ({ props, onTaskCreated  }) => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const statusRef = useRef();
  const priorityRef = useRef();
  const dueDateRef = useRef();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const myInfo = getUserDetails();
  const myId = myInfo._id;

  const onBtnClick = async () => {
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const category = categoryRef.current.value;
    const status = statusRef.current.value;
    const priority = priorityRef.current.value;
    const dueDate = dueDateRef.current.value;

    // Validate required fields
    if (!title) {
      toast.error("Title is required!");
      return;
    }
    if (!status) {
      toast.error("Status is required!");
      return;
    }
    if (!priority) {
      toast.error("Priority is required!");
      return;
    }

    setIsLoading(true);
    try {
      const createTask = await CreateTaskRequiest(
        selectedUsers,
        title,
        description,
        dueDate,
        priority,
        status,
        category
      );
      toast.success("Task Created Successfully!");
      if (onTaskCreated) onTaskCreated(createTask?.data?.data); 
      
    } catch (error) {
      toast.error("Failed to create task");
    } finally {
      setIsLoading(false);
      props();
    }
  };

  const handleUserSelection = (userId) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId]
    );
  };

  const dispatch = useDispatch();
  const SearchUser = useSelector((state) => state.users.user);

  useEffect(() => {
    (async () => {
      const result = await getUsersRequest();
      dispatch(setUser(result.data));
    })();
  }, []);

  // assign to
  const [assign, setAssign] = useState("");
  const assignToUser = SearchUser?.filter((user) =>
    (user.firstName.toLowerCase() + "" + user.lastName.toLowerCase()).includes(
      assign.toLowerCase()
    )
  );

  return (
    <div>
      <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
        <div className="main_overlay bg-white rounded p-4 position-relative">
          <button
            className="btn-close position-absolute top-0 end-0 m-3"
            onClick={props}
            aria-label="Close"
          ></button>

          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              ref={titleRef}
              type="text"
              className="form-control w-100"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              ref={descriptionRef}
              className="form-control w-100"
              rows="3"
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              ref={categoryRef}
              type="text"
              className="form-control w-100"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select ref={statusRef} className="form-select" required>
              <option value="">Select Status</option>
              <option value="TODO">TODO</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Priority</label>
            <select ref={priorityRef} className="form-select" required>
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Due Date</label>
            <input
              ref={dueDateRef}
              type="date"
              className="form-control w-100"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Assign To</label>
            <input
              placeholder="User Name or Email"
              type="text"
              className="form-control w-100 small"
              onChange={(e) => setAssign(e.target.value)}
            />
          </div>

          {assign && (
            <div
              className="border rounded p-2 mb-3"
            >
              {assignToUser
                .filter((user) => user._id !== myId)
                .map((item, i) => {
                  return (
                    <div key={item} className="d-flex align-items-center mb-2">
                      <input
                        type="checkbox"
                        className="form-check-input me-2"
                        value={item._id}
                        onChange={() => handleUserSelection(item._id)}
                        checked={selectedUsers.includes(item._id)}
                      />
                      <img
                        className="rounded-circle me-2"
                        src={item.photo || "/placeholder.svg"}
                        alt=""
                        width="20"
                        height="20"
                      />
                      <label
                        className="small"
                      >
                        {item.firstName + " " + item.lastName}
                      </label>
                    </div>
                  );
                })}
            </div>
          )}

          {selectedUsers.length > 0 && (
            <div className="mb-3">
              <div className="d-flex flex-wrap gap-2">
                {selectedUsers.map((item, i) => {
                  const user = SearchUser.find((user) => user._id === item);
                  return (
                    <div
                      key={i}
                      className="d-flex align-items-center px-3 py-1 bg-light rounded-pill"
                    >
                      <img
                        className="rounded-circle me-2"
                        src={user.photo || "/placeholder.svg"}
                        alt=""
                        width="20"
                        height="20"
                      />
                      <span
                        className="small"
                      >
                        {user.firstName + " " + user.lastName}
                      </span>
                      <button
                        className="btn btn-sm ms-2 p-0 border-0 bg-transparent"
                        onClick={() => handleUserSelection(item)}
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <button
            className="commonBtn mt-3"
            onClick={onBtnClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Creating...
              </>
            ) : (
              "Create Task"
            )}
          </button>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default TaskCarosal;
