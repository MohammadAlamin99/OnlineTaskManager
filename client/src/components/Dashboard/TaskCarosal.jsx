import { useEffect, useRef, useState } from "react";
import {
  CreateTaskRequest,
  getUsersRequest,
  userDetailsRequest,
} from "../../apiRequiest/apiRequiest";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/state-slice/user-slice";
import toast, { Toaster } from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";
const TaskCarosal = ({ props, onTaskCreated }) => {
  // Refs for form inputs
  const titleRef = useRef();
  const descriptionRef = useRef();
  const priorityRef = useRef();
  const statusRef = useRef();
  const dueDateRef = useRef();

  // State variables
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [todoCheckList, setTodoCheckList] = useState([]);
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [id, setId] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [assign, setAssign] = useState("");

  useEffect(() => {
    (async () => {
      const result = await userDetailsRequest();
      setId(result?.data?.[0]._id);
    })();
  }, []);

  const onBtnClick = async () => {
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const priority = priorityRef.current.value;
    const status = statusRef.current.value;
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
      const taskData = {
        title,
        description,
        priority,
        status,
        dueDate: dueDate ? new Date(dueDate) : null,
        assignTo: selectedUsers,
        createdBy: id,
        attachments,
        todoCheckList,
      };

      const createTask = await CreateTaskRequest(taskData);
      toast.success("Task Created Successfully!");
      if (onTaskCreated) onTaskCreated(createTask?.data?.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create task");
    } finally {
      setIsLoading(false);
      props();
    }
  };

  // Checklist functions
  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setTodoCheckList([
        ...todoCheckList,
        {
          title: newChecklistItem,
          completed: false,
        },
      ]);
      setNewChecklistItem("");
    }
  };

  const handleRemoveChecklistItem = (index) => {
    const updatedChecklist = [...todoCheckList];
    updatedChecklist.splice(index, 1);
    setTodoCheckList(updatedChecklist);
  };

  const handleToggleChecklistItem = (index) => {
    const updatedChecklist = [...todoCheckList];
    updatedChecklist[index].completed = !updatedChecklist[index].completed;
    setTodoCheckList(updatedChecklist);
  };

  // Attachment functions
  // const handleFileUpload = (e) => {
  //   const files = Array.from(e.target.files);
  //   const fileUrls = files.map((file) => URL.createObjectURL(file));
  //   setAttachments([...attachments, ...fileUrls]);
  // };

  const handleAddUrlAttachment = () => {
    if (attachmentUrl.trim()) {
      setAttachments([...attachments, attachmentUrl]);
      setAttachmentUrl("");
    }
  };

  const handleRemoveAttachment = (index) => {
    const updatedAttachments = [...attachments];
    // Only revoke object URLs (for file uploads)
    if (typeof updatedAttachments[index] !== 'string') {
      URL.revokeObjectURL(updatedAttachments[index]);
    }
    updatedAttachments.splice(index, 1);
    setAttachments(updatedAttachments);
  };

  // User selection functions
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
  }, [dispatch]);

  const assignToUser = SearchUser?.filter((user) =>
    user.name.toLowerCase().includes(assign.toLowerCase())
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
            <label className="form-label">Title*</label>
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

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Status*</label>
              <select ref={statusRef} className="form-select" required>
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Priority*</label>
              <select ref={priorityRef} className="form-select" required>
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
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
            <label className="form-label">Checklist</label>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Add checklist item"
                value={newChecklistItem}
                onChange={(e) => setNewChecklistItem(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleAddChecklistItem()
                }
              />
              <button
                className="checklistBtn"
                type="button"
                onClick={handleAddChecklistItem}
              >
                Add +
              </button>
            </div>

            {todoCheckList.length > 0 && (
              <div className="border rounded p-2 mb-3">
                {todoCheckList.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center justify-content-between mb-2"
                  >
                    <div className="d-flex align-items-center">
                      <input
                        type="checkbox"
                        className="form-check-input me-2"
                        checked={item.completed}
                        onChange={() => handleToggleChecklistItem(index)}
                      />
                      <span
                        className={
                          item.completed ? "text-decoration-line-through" : ""
                        }
                      >
                        {item.title}
                      </span>
                    </div>
                    <button
                      className="common-delete-icon"
                      onClick={() => handleRemoveChecklistItem(index)}
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Add Attachment URL</label>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Enter URL"
                value={attachmentUrl}
                onChange={(e) => setAttachmentUrl(e.target.value)}
              />
              <button
                className="checklistBtn"
                type="button"
                onClick={handleAddUrlAttachment}
              >
                Add +
              </button>
            </div>
          </div>

          {attachments.length > 0 && (
            <div className="mb-3">
              <label className="form-label">Attachments List</label>
              <div className="border rounded p-2">
                {attachments.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center justify-content-between mb-2"
                  >
                    <a href={item} target="_blank" rel="noopener noreferrer">
                      {item}
                    </a>
                    <button
                      className="common-delete-icon"
                      onClick={() => handleRemoveAttachment(index)}
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Assign To</label>
            <input
              placeholder="User Name"
              type="text"
              className="form-control w-100 small"
              onChange={(e) => setAssign(e.target.value)}
            />
          </div>

          {assign && (
            <div className="border rounded p-2 mb-3">
              {assignToUser
                .filter((user) => user._id !== id)
                .map((item) => {
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
                      <label className="small">{item?.name}</label>
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
                        src={user?.photo || "/placeholder.svg"}
                        alt=""
                        width="20"
                        height="20"
                      />
                      <span className="small">{user?.name}</span>
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
            className="commonBtn mt-3 w-100"
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