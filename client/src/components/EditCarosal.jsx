

import { useEffect, useRef, useState } from "react";
import {
  UpdateTaskRequest,
  getTaskbyIdRequest,
  getUpdateTaskRequest,
} from "../apiRequiest/apiRequiest";
import toast, { Toaster } from "react-hot-toast";
import { FaRegCalendarAlt, FaTimes, FaPaperclip, FaUserPlus } from "react-icons/fa";

const EditCarosal = ({ props, updateTask }) => {
  const { taskId, hideUpdate } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState([]);
  // console.log(selectedTask)
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
    todoCheckList: [],
    attachments: [],
    assignTo: [],
  });
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [newAttachment, setNewAttachment] = useState("");
  const [newAssignee, setNewAssignee] = useState("");

  // Refs for form inputs
  const titleRef = useRef();
  const descriptionRef = useRef();
  const priorityRef = useRef();
  const statusRef = useRef();
  const dueDateRef = useRef();
  const todoChecklistRef = useRef(); 
  const attachmentsRef = useRef(); 
  const assignToRef = useRef(); 
  const createdByRef = useRef(); 


  // get task by id
  useEffect(() => {
    (async () => {
      let result = await getTaskbyIdRequest(taskId);
      setSelectedTask(result?.[0])
    })()
  }, [])

  // Load task data
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const result = await getUpdateTaskRequest(taskId);
        if (result && result.length > 0) {
          const data = result[0];
          setTaskData({
            title: data.title || "",
            description: data.description || "",
            dueDate: data.dueDate || "",
            priority: data.priority || "Medium",
            status: data.status || "Pending",
            todoCheckList: data.todoCheckList || [],
            attachments: data.attachments || [],
            assignTo: data.assignTo || [],
          });
        }
      } catch (error) {
        toast.error("Failed to load task data.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [taskId]);

  // Set form values when data is loaded
  // useEffect(() => {
  //   if (titleRef.current) titleRef.current.value = taskData.title || "";
  //   if (descriptionRef.current) descriptionRef.current.value = taskData.description || "";
  //   if (statusRef.current) statusRef.current.value = taskData.status || "Pending";
  //   if (priorityRef.current) priorityRef.current.value = taskData.priority || "Medium";
  //   if (dueDateRef.current) {
  //     dueDateRef.current.value = taskData.dueDate
  //       ? new Date(taskData.dueDate).toISOString().split("T")[0]
  //       : "";
  //   }

  //   // Reset input fields for adding new items
  //   setNewChecklistItem("");
  //   setNewAttachment("");
  //   setNewAssignee("");
  // }, [taskData]);

  // Checklist handlers
  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setTaskData(prev => ({
        ...prev,
        todoCheckList: [
          ...prev.todoCheckList,
          { title: newChecklistItem, completed: false }
        ]
      }));
      setNewChecklistItem("");
    }
  };

  const handleRemoveChecklistItem = (index) => {
    setTaskData(prev => {
      const updatedChecklist = [...prev.todoCheckList];
      updatedChecklist.splice(index, 1);
      return { ...prev, todoCheckList: updatedChecklist };
    });
  };

  const toggleChecklistCompletion = (index) => {
    setTaskData(prev => {
      const updatedChecklist = [...prev.todoCheckList];
      updatedChecklist[index] = {
        ...updatedChecklist[index],
        completed: !updatedChecklist[index].completed
      };
      return { ...prev, todoCheckList: updatedChecklist };
    });
  };

  // Attachment handlers
  const handleAddAttachment = () => {
    if (newAttachment.trim()) {
      setTaskData(prev => ({
        ...prev,
        attachments: [...prev.attachments, newAttachment]
      }));
      setNewAttachment("");
    }
  };

  const handleRemoveAttachment = (index) => {
    setTaskData(prev => {
      const updatedAttachments = [...prev.attachments];
      updatedAttachments.splice(index, 1);
      return { ...prev, attachments: updatedAttachments };
    });
  };

  // Assignee handlers
  const handleAddAssignee = () => {
    if (newAssignee.trim()) {
      setTaskData(prev => ({
        ...prev,
        assignTo: [...prev.assignTo, newAssignee]
      }));
      setNewAssignee("");
    }
  };

  const handleRemoveAssignee = (index) => {
    setTaskData(prev => {
      const updatedAssignees = [...prev.assignTo];
      updatedAssignees.splice(index, 1);
      return { ...prev, assignTo: updatedAssignees };
    });
  };

  // Update task handler
  const onUpdateHandler = async () => {
    try {
      setIsLoading(true);
      const updatedTask = {
        _id: taskId,
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        dueDate: dueDateRef.current.value || null,
        priority: priorityRef.current.value,
        status: statusRef.current.value || "Pending",
        todoCheckList: todoChecklistRef.current.value || [],
        attachments: attachmentsRef.current.value || [],
        assignTo: assignToRef.current.value || [],
        progress: calculateProgress(taskData.todoCheckList)
      };
      const response = await UpdateTaskRequest(
        taskId,
        updatedTask.title,
        updatedTask.description,
        updatedTask.dueDate,
        updatedTask.priority,
        updatedTask.status,
        updatedTask.todoCheckList,
        updatedTask.attachments,
        // updatedTask.assignTo,
        updatedTask.progress
      );
      console.log(response);
      if (response.data.status === "success") {
        toast.success("Task updated successfully!");
        if (updateTask) updateTask(updatedTask);
        hideUpdate();
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to update task.");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate progress based on completed checklist items
  const calculateProgress = (checklist) => {
    if (!checklist || checklist.length === 0) return 0;
    const completed = checklist.filter(item => item.completed).length;
    return Math.round((completed / checklist.length) * 100);
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="modal-backdrop fade show"></div>

      <div className="modal fade show d-block" tabIndex="-1" aria-labelledby="editTaskModal">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h5 className="modal-title fw-bold">Edit Task</h5>
              <button
                type="button"
                className="btn-close"
                onClick={hideUpdate}
                disabled={isLoading}
                aria-label="Close"
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
                    defaultValue={selectedTask?.title}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Description</label>
                  <textarea
                    ref={descriptionRef}
                    className="form-control w-100"
                    rows="4"
                    defaultValue={selectedTask?.description}
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
                        defaultValue={
                          selectedTask?.dueDate
                            ? new Date(selectedTask.dueDate).toISOString().split("T")[0]
                            : ""
                        }
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
                      value={selectedTask?.status}
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
                      value={selectedTask?.priority}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                {/* Todo Checklist Section */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Checklist</label>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add new checklist item"
                      value={newChecklistItem}
                      onChange={(e) => setNewChecklistItem(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddChecklistItem()}
                      disabled={isLoading}
                      ref={todoChecklistRef}
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

                  {taskData.todoCheckList.length > 0 && (
                    <div className="border rounded p-2">
                      <div className="d-flex justify-content-between mb-1">
                        <small>Progress: {calculateProgress(taskData.todoCheckList)}%</small>
                        <small>
                          {taskData.todoCheckList.filter(item => item.completed).length} of {taskData.todoCheckList.length} completed
                        </small>
                      </div>

                      {selectedTask?.todoCheckList?.map((item, index) => (
                        <div key={index} className="d-flex align-items-center justify-content-between mb-2">
                          <div className="d-flex align-items-center">
                            <input
                              type="checkbox"
                              className="form-check-input me-2"
                              checked={item.completed}
                              onChange={() => toggleChecklistCompletion(index)}
                              disabled={isLoading}
                            />
                            <span className={item.completed ? "text-decoration-line-through text-muted" : ""}>
                              {item.title || "checklist"}
                            </span>
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

                {/* Attachments Section */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Attachments</label>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add attachment URL"
                      value={newAttachment}
                      onChange={(e) => setNewAttachment(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddAttachment()}
                      disabled={isLoading}
                      ref={attachmentsRef}
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

                  {taskData.attachments.length > 0 && (
                    <div className="border rounded p-2">
                      {selectedTask?.attachments?.map((url, index) => (
                        <div key={index} className="d-flex align-items-center justify-content-between mb-2">
                          <a href={url} target="_blank" rel="noopener noreferrer">
                            {url.length > 30 ? `${url.substring(0, 30)}...` : url}
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

                {/* Assignees Section */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Assign To</label>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add user ID to assign"
                      value={newAssignee}
                      onChange={(e) => setNewAssignee(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddAssignee()}
                      disabled={isLoading}
                      ref={assignToRef}
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

                  {taskData.assignTo.length > 0 && (
                    <div className="border rounded p-2">
                      {taskData.assignTo.map((userId, index) => (
                        <div key={index} className="d-flex align-items-center justify-content-between mb-2">
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
                type="button"
                className="btn btn-outline-secondary"
                onClick={hideUpdate}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="button"
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