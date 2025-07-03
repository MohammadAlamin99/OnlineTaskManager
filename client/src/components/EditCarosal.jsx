// import { useEffect, useRef, useState } from "react";
// import {
//   UpdateTaskRequest,
//   getUpdateTaskRequest,
// } from "../apiRequiest/apiRequiest";
// import toast, { Toaster } from "react-hot-toast";

// const EditCarosal = ({ props, updateTask }) => {
//   const { taskId } = props;
//   const { hideUpdate } = props;

//   const titleRef = useRef();
//   const descriptionRef = useRef();
//   const categoryRef = useRef();
//   const statusRef = useRef();
//   const priorityRef = useRef();
//   const dueDateRef = useRef();

//   // Loading state
//   const [isLoading, setIsLoading] = useState(false);

//   // store update default data
//   const [update, setUpdate] = useState([]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const result = await getUpdateTaskRequest(taskId);
//         setUpdate(result[0]);
//       } catch (error) {
//         toast.error("Failed to load task data.");
//       }
//     })();
//   }, [taskId]);

//   useEffect(() => {
//     if (
//       update &&
//       statusRef.current &&
//       priorityRef.current &&
//       dueDateRef.current
//     ) {
//       statusRef.current.value = update.status;
//       priorityRef.current.value = update.priority;
//       dueDateRef.current.value = update.dueDate
//         ? new Date(update.dueDate).toISOString().split("T")[0]
//         : "";
//     }
//   }, [update]);
//   const onUpdateHandler = async () => {
//     try {
//       setIsLoading(true);
//       const updatedTask = {
//         _id: taskId,
//         title: titleRef.current.value,
//         description: descriptionRef.current.value,
//         category: categoryRef.current.value,
//         status: statusRef.current.value,
//         priority: priorityRef.current.value,
//         dueDate: dueDateRef.current.value,
//       };

//       const response = await UpdateTaskRequest(
//         taskId,
//         updatedTask.title,
//         updatedTask.description,
//         updatedTask.dueDate,
//         updatedTask.priority,
//         updatedTask.status,
//         updatedTask.category
//       );
//       if (response.data.status === "success") {
//         toast.success("Task updated successfully!");
//         if (updateTask) updateTask(updatedTask);
//       }
//     } catch (error) {
//       toast.error("Failed to update task.");
//     } finally {
//       hideUpdate();
//       setIsLoading(false);
//     }
//   };
//   return (
//     <>
//       {/* Toast Notification */}
//       <Toaster position="top-center" />

//       {/* Modal Backdrop */}
//       <div className="modal-backdrop fade show"></div>

//       {/* Modal */}
//       <div
//         className="modal fade show d-block"
//         tabIndex="-1"
//         role="dialog"
//         aria-labelledby="editTaskModal"
//         aria-hidden="true"
//       >
//         <div
//           className="modal-dialog modal-dialog-centered modal-lg"
//           role="document"
//         >
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="editTaskModal">
//                 Edit Task
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 aria-label="Close"
//                 onClick={hideUpdate}
//                 disabled={isLoading}
//               ></button>
//             </div>
//             <div className="modal-body">
//               <form>
//                 <div className="mb-3">
//                   <label htmlFor="taskTitle" className="form-label fw-bold">
//                     Title
//                   </label>
//                   <input
//                     ref={titleRef}
//                     id="taskTitle"
//                     defaultValue={update.title}
//                     type="text"
//                     className="form-control w-100"
//                     disabled={isLoading}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label
//                     htmlFor="taskDescription"
//                     className="form-label fw-bold"
//                   >
//                     Description
//                   </label>
//                   <textarea
//                     ref={descriptionRef}
//                     id="taskDescription"
//                     defaultValue={update.description}
//                     className="form-control w-100"
//                     rows="4"
//                     disabled={isLoading}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="taskCategory" className="form-label fw-bold">
//                     Category
//                   </label>
//                   <input
//                     ref={categoryRef}
//                     id="taskCategory"
//                     defaultValue={update.category}
//                     type="text"
//                     className="form-control w-100"
//                     disabled={isLoading}
//                   />
//                 </div>
//                 <div className="row">
//                   <div className="col-md-4 mb-3">
//                     <label htmlFor="taskStatus" className="form-label fw-bold">
//                       Status
//                     </label>
//                     <select
//                       ref={statusRef}
//                       id="taskStatus"
//                       className="form-select"
//                       disabled={isLoading}
//                     >
//                       <option value="TODO">TODO</option>
//                       <option value="In Progress">In Progress</option>
//                       <option value="Completed">Completed</option>
//                     </select>
//                   </div>
//                   <div className="col-md-4 mb-3">
//                     <label
//                       htmlFor="taskPriority"
//                       className="form-label fw-bold"
//                     >
//                       Priority
//                     </label>
//                     <select
//                       ref={priorityRef}
//                       id="taskPriority"
//                       className="form-select"
//                       disabled={isLoading}
//                     >
//                       <option value="Low">Low</option>
//                       <option value="Medium">Medium</option>
//                       <option value="High">High</option>
//                     </select>
//                   </div>
//                   <div className="col-md-4 mb-3">
//                     <label htmlFor="taskDueDate" className="form-label fw-bold">
//                       Due Date
//                     </label>
//                     <input
//                       ref={dueDateRef}
//                       id="taskDueDate"
//                       type="date"
//                       className="form-control"
//                       disabled={isLoading}
//                     />
//                   </div>
//                 </div>
//               </form>
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="cencell_common_btn me-2"
//                 onClick={hideUpdate}
//                 disabled={isLoading}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={onUpdateHandler}
//                 className="commonBtn"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <span
//                       className="spinner-border spinner-border-sm me-2"
//                       role="status"
//                       aria-hidden="true"
//                     ></span>
//                     Updating...
//                   </>
//                 ) : (
//                   "Update"
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EditCarosal;


import { useEffect, useRef, useState } from "react";
import {
  UpdateTaskRequest,
  getUpdateTaskRequest,
} from "../apiRequiest/apiRequiest";
import toast, { Toaster } from "react-hot-toast";
import { FaRegCalendarAlt, FaTimes } from "react-icons/fa";

const EditCarosal = ({ props, updateTask }) => {
  const { taskId, hideUpdate } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [update, setUpdate] = useState({});
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState("");

  // Refs for form inputs
  const titleRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const statusRef = useRef();
  const priorityRef = useRef();
  const startDateRef = useRef();
  const dueDateRef = useRef();
  const endDateRef = useRef();

  // Load task data
  useEffect(() => {
    (async () => {
      try {
        const result = await getUpdateTaskRequest(taskId);
        const taskData = result[0];
        setUpdate(taskData);
        setSubtasks(taskData.subtasks || []);
      } catch (error) {
        toast.error("Failed to load task data.");
      }
    })();
  }, [taskId]);

  // Set form values when data is loaded
  useEffect(() => {
    if (update && Object.keys(update).length > 0) {
      if (titleRef.current) titleRef.current.value = update.title || "";
      if (descriptionRef.current) descriptionRef.current.value = update.description || "";
      if (categoryRef.current) categoryRef.current.value = update.category || "";
      if (statusRef.current) statusRef.current.value = update.status || "TODO";
      if (priorityRef.current) priorityRef.current.value = update.priority || "Medium";
      if (startDateRef.current) startDateRef.current.value = update.startDate ? new Date(update.startDate).toISOString().split("T")[0] : "";
      if (dueDateRef.current) dueDateRef.current.value = update.dueDate ? new Date(update.dueDate).toISOString().split("T")[0] : "";
      if (endDateRef.current) endDateRef.current.value = update.endDate ? new Date(update.endDate).toISOString().split("T")[0] : "";
    }
  }, [update]);

  // Subtask handlers
  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      setSubtasks([...subtasks, { title: newSubtask, completed: false }]);
      setNewSubtask("");
    }
  };

  const handleRemoveSubtask = (index) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks.splice(index, 1);
    setSubtasks(updatedSubtasks);
  };

  const toggleSubtaskCompletion = (index) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].completed = !updatedSubtasks[index].completed;
    setSubtasks(updatedSubtasks);
  };

  // Update task handler
  const onUpdateHandler = async () => {
    try {
      setIsLoading(true);
      
      // Validate dates
      const startDate = startDateRef.current.value;
      const endDate = endDateRef.current.value;
      
      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        toast.error("End date must be after start date");
        return;
      }

      const updatedTask = {
        _id: taskId,
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        category: categoryRef.current.value,
        status: statusRef.current.value,
        priority: priorityRef.current.value,
        startDate: startDate || null,
        dueDate: dueDateRef.current.value || null,
        endDate: endDate || null,
        subtasks: subtasks
      };

      const response = await UpdateTaskRequest(
        taskId,
        updatedTask.title,
        updatedTask.description,
        updatedTask.startDate,
        updatedTask.dueDate,
        updatedTask.endDate,
        updatedTask.priority,
        updatedTask.status,
        updatedTask.category,
        updatedTask.subtasks
      );

      if (response.data.status === "success") {
        toast.success("Task updated successfully!");
        if (updateTask) updateTask(updatedTask);
        hideUpdate();
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update task.");
    } finally {
      setIsLoading(false);
    }
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
                    className="form-control"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Description</label>
                  <textarea
                    ref={descriptionRef}
                    className="form-control"
                    rows="4"
                    disabled={isLoading}
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Start Date</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaRegCalendarAlt />
                      </span>
                      <input
                        ref={startDateRef}
                        type="date"
                        className="form-control"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
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
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">End Date</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaRegCalendarAlt />
                      </span>
                      <input
                        ref={endDateRef}
                        type="date"
                        className="form-control"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Status*</label>
                    <select
                      ref={statusRef}
                      className="form-select"
                      required
                      disabled={isLoading}
                    >
                      <option value="TODO">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Priority*</label>
                    <select
                      ref={priorityRef}
                      className="form-select"
                      required
                      disabled={isLoading}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Category</label>
                  <input
                    ref={categoryRef}
                    type="text"
                    className="form-control"
                    disabled={isLoading}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Subtasks</label>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add new subtask"
                      value={newSubtask}
                      onChange={(e) => setNewSubtask(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddSubtask()}
                      disabled={isLoading}
                    />
                    <button
                      className="btn btn-outline-primary"
                      type="button"
                      onClick={handleAddSubtask}
                      disabled={isLoading}
                    >
                      Add
                    </button>
                  </div>
                  
                  {subtasks.length > 0 && (
                    <div className="border rounded p-2">
                      {subtasks.map((subtask, index) => (
                        <div key={index} className="d-flex align-items-center justify-content-between mb-2">
                          <div className="d-flex align-items-center">
                            <input
                              type="checkbox"
                              className="form-check-input me-2"
                              checked={subtask.completed}
                              onChange={() => toggleSubtaskCompletion(index)}
                              disabled={isLoading}
                            />
                            <span className={subtask.completed ? "text-decoration-line-through text-muted" : ""}>
                              {subtask.title}
                            </span>
                          </div>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemoveSubtask(index)}
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