import { useEffect, useRef, useState } from "react";
import {
  UpdateTaskRequest,
  getTaskbyIdRequest,
} from "../apiRequiest/apiRequiest";
import toast, { Toaster } from "react-hot-toast";
import {
  FaRegCalendarAlt,
  FaTimes,
  FaPaperclip,
  FaUserPlus,
} from "react-icons/fa";
import { getUserDetails } from "../Helper/SessionHelper";

const EditCarosal = ({ props }) => {
  const { taskId, hideUpdate } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  console.log(selectedTask);

  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [newAttachment, setNewAttachment] = useState("");
  const [newAssignee, setNewAssignee] = useState("");

  // Refs
  const titleRef = useRef();
  const descriptionRef = useRef();
  const priorityRef = useRef();
  const statusRef = useRef();
  const dueDateRef = useRef();

  // Load task data by ID
  useEffect(() => {
    (async () => {
      const result = await getTaskbyIdRequest(taskId);
      if (result?.[0]) {
        setSelectedTask(result[0]);
      } else {
        toast.error("Failed to fetch task data.");
      }
    })();
  }, [taskId]);

  // Safety render fallback
  if (!selectedTask) {
    return <div>Loading task...</div>;
  }

  const user = getUserDetails();
  // Update task
  const onUpdateHandler = async () => {
    try {
      setIsLoading(true);
      const title = titleRef.current.value;
      const description = descriptionRef.current.value;
      const dueDate = dueDateRef.current.value || null;
      const priority = priorityRef.current.value;
      const status = statusRef.current.value;
      const todoCheckList = selectedTask.todoCheckList || [];
      const attachments = selectedTask.attachments || [];
      const assignTo = selectedTask.assignTo || [];
      const createdBy = user?._id;
      const progress = 33;
      const response = await UpdateTaskRequest(
        taskId,
        title,
        description,
        dueDate,
        priority,
        status,
        todoCheckList,
        attachments,
        assignTo,
        createdBy,
        progress
      );
      if (response.status === "success") {
        toast.success("Task updated successfully!");
        setTimeout(() => {
          hideUpdate();
          window.location.reload();
        }, 1000);
      }
    } catch (e) {
      toast.error("Failed to update task.");
    } finally {
      setIsLoading(false);
    }
  };

  // Progress Calculation
  const calculateProgress = (checklist) => {
    if (!checklist || checklist.length === 0) return 0;
    const completed = checklist.filter((item) => item.completed).length;
    return Math.round((completed / checklist.length) * 100);
  };

  // Checklist Handlers
  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setSelectedTask((prev) => ({
        ...prev,
        todoCheckList: [
          ...prev.todoCheckList,
          { title: newChecklistItem, completed: false },
        ],
      }));
      setNewChecklistItem("");
    }
  };

  const handleRemoveChecklistItem = (index) => {
    const updatedChecklist = [...selectedTask.todoCheckList];
    updatedChecklist.splice(index, 1);
    setSelectedTask((prev) => ({ ...prev, todoCheckList: updatedChecklist }));
  };

  const toggleChecklistCompletion = (index) => {
    const updatedChecklist = [...selectedTask.todoCheckList];
    updatedChecklist[index].completed = !updatedChecklist[index].completed;
    setSelectedTask((prev) => ({ ...prev, todoCheckList: updatedChecklist }));
  };

  // Attachment Handlers
  const handleAddAttachment = () => {
    if (newAttachment.trim()) {
      setSelectedTask((prev) => ({
        ...prev,
        attachments: [...prev.attachments, newAttachment],
      }));
      setNewAttachment("");
    }
  };

  const handleRemoveAttachment = (index) => {
    const updated = [...selectedTask.attachments];
    updated.splice(index, 1);
    setSelectedTask((prev) => ({ ...prev, attachments: updated }));
  };

  // Assignee Handlers
  const handleAddAssignee = () => {
    if (newAssignee.trim()) {
      setSelectedTask((prev) => ({
        ...prev,
        assignTo: [...prev.assignTo, newAssignee],
      }));
      setNewAssignee("");
    }
  };

  const handleRemoveAssignee = (index) => {
    const updated = [...selectedTask.assignTo];
    updated.splice(index, 1);
    setSelectedTask((prev) => ({ ...prev, assignTo: updated }));
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="modal-backdrop fade show"></div>

      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h5 className="modal-title fw-bold">Edit Task</h5>
              <button
                type="button"
                className="btn-close"
                onClick={hideUpdate}
                disabled={isLoading}
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label fw-bold">Title*</label>
                  <input
                    ref={titleRef}
                    type="text"
                    className="form-control w-100"
                    required
                    disabled={isLoading}
                    defaultValue={selectedTask.title}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Description</label>
                  <textarea
                    ref={descriptionRef}
                    className="form-control w-100"
                    rows="4"
                    defaultValue={selectedTask.description}
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Due Date</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaRegCalendarAlt />
                      </span>
                      <input
                        ref={dueDateRef}
                        type="date"
                        className="form-control"
                        disabled={isLoading}
                        defaultValue={selectedTask?.dueDate?.split("T")[0]}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-bold">Status*</label>
                    <select
                      ref={statusRef}
                      className="form-select"
                      required
                      disabled={isLoading}
                      defaultValue={selectedTask.status}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-bold">Priority*</label>
                    <select
                      ref={priorityRef}
                      className="form-select"
                      required
                      disabled={isLoading}
                      defaultValue={selectedTask.priority}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                {/* Checklist */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Checklist</label>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control w-100"
                      placeholder="Add new checklist item"
                      value={newChecklistItem}
                      onChange={(e) => setNewChecklistItem(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleAddChecklistItem()
                      }
                      disabled={isLoading}
                    />
                    <button
                      className="btn btn-outline-primary"
                      type="button"
                      onClick={handleAddChecklistItem}
                      disabled={isLoading}
                    >
                      Add
                    </button>
                  </div>

                  {selectedTask?.todoCheckList?.length > 0 && (
                    <div className="border rounded p-2">
                      <div className="d-flex justify-content-between mb-1">
                        <small>
                          Progress:{" "}
                          {calculateProgress(selectedTask.todoCheckList)}%
                        </small>
                        <small>
                          {
                            selectedTask.todoCheckList.filter(
                              (item) => item.completed
                            ).length
                          }{" "}
                          of {selectedTask.todoCheckList.length} completed
                        </small>
                      </div>

                      {selectedTask.todoCheckList.map((item, index) => (
                        <div
                          key={index}
                          className="d-flex justify-content-between align-items-center mb-1"
                        >
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={item.completed}
                              onChange={() => toggleChecklistCompletion(index)}
                              disabled={isLoading}
                            />
                            <label
                              className={`form-check-label ${
                                item.completed
                                  ? "text-decoration-line-through text-muted"
                                  : ""
                              }`}
                            >
                              {item.title}
                            </label>
                          </div>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemoveChecklistItem(index)}
                            disabled={isLoading}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Attachments */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Attachments</label>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add attachment URL"
                      value={newAttachment}
                      onChange={(e) => setNewAttachment(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleAddAttachment()
                      }
                      disabled={isLoading}
                    />
                    <button
                      className="btn btn-outline-primary"
                      type="button"
                      onClick={handleAddAttachment}
                      disabled={isLoading}
                    >
                      <FaPaperclip />
                    </button>
                  </div>

                  {selectedTask.attachments?.length > 0 && (
                    <div className="border rounded p-2">
                      {selectedTask.attachments.map((url, index) => (
                        <div
                          key={index}
                          className="d-flex justify-content-between align-items-center mb-1"
                        >
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {url.length > 30 ? `${url.slice(0, 30)}...` : url}
                          </a>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemoveAttachment(index)}
                            disabled={isLoading}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Assignees */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Assign To</label>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add user ID"
                      value={newAssignee}
                      onChange={(e) => setNewAssignee(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleAddAssignee()
                      }
                      disabled={isLoading}
                    />
                    <button
                      className="btn btn-outline-primary"
                      type="button"
                      onClick={handleAddAssignee}
                      disabled={isLoading}
                    >
                      <FaUserPlus />
                    </button>
                  </div>

                  {selectedTask.assignTo?.length > 0 && (
                    <div className="border rounded p-2">
                      {selectedTask.assignTo.map((userId, index) => (
                        <div
                          key={index}
                          className="d-flex justify-content-between align-items-center mb-1"
                        >
                          <span>{userId}</span>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemoveAssignee(index)}
                            disabled={isLoading}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </form>
            </div>

            <div className="modal-footer border-top-0">
              <button
                className="btn btn-outline-secondary"
                onClick={hideUpdate}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={onUpdateHandler}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Updating...
                  </>
                ) : (
                  "Update Task"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCarosal;
