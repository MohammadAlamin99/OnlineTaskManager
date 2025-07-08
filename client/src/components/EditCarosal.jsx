// // import { useEffect, useRef, useState } from "react";
// // import {
// //   UpdateTaskRequest,
// //   getTaskbyIdRequest,
// // } from "../apiRequiest/apiRequiest";
// // import toast, { Toaster } from "react-hot-toast";
// // import {
// //   FaRegCalendarAlt,
// //   FaTimes,
// //   FaPaperclip,
// //   FaUserPlus,
// // } from "react-icons/fa";
// // import { getUserDetails } from "../Helper/SessionHelper";

// // const EditCarosal = ({ props }) => {
// //   const { taskId, hideUpdate } = props;
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [selectedTask, setSelectedTask] = useState(null);
// //   console.log(selectedTask);

// //   const [newChecklistItem, setNewChecklistItem] = useState("");
// //   const [newAttachment, setNewAttachment] = useState("");
// //   const [newAssignee, setNewAssignee] = useState("");

// //   // Refs
// //   const titleRef = useRef();
// //   const descriptionRef = useRef();
// //   const priorityRef = useRef();
// //   const statusRef = useRef();
// //   const dueDateRef = useRef();

// //   // Load task data by ID
// //   useEffect(() => {
// //     (async () => {
// //       const result = await getTaskbyIdRequest(taskId);
// //       if (result?.[0]) {
// //         setSelectedTask(result[0]);
// //       } else {
// //         toast.error("Failed to fetch task data.");
// //       }
// //     })();
// //   }, [taskId]);

// //   // Safety render fallback
// //   if (!selectedTask) {
// //     return <div>Loading task...</div>;
// //   }

// //   const user = getUserDetails();
// //   // Update task
// //   const onUpdateHandler = async () => {
// //     try {
// //       setIsLoading(true);
// //       const title = titleRef.current.value;
// //       const description = descriptionRef.current.value;
// //       const dueDate = dueDateRef.current.value || null;
// //       const priority = priorityRef.current.value;
// //       const status = statusRef.current.value;
// //       const todoCheckList = selectedTask.todoCheckList || [];
// //       const attachments = selectedTask.attachments || [];
// //       const assignTo = selectedTask.assignTo || [];
// //       const createdBy = user?._id;
// //       const progress = 33;
// //       const response = await UpdateTaskRequest(
// //         taskId,
// //         title,
// //         description,
// //         dueDate,
// //         priority,
// //         status,
// //         todoCheckList,
// //         attachments,
// //         assignTo,
// //         createdBy,
// //         progress
// //       );
// //       if (response.status === "success") {
// //         toast.success("Task updated successfully!");
// //         setTimeout(() => {
// //           hideUpdate();
// //           window.location.reload();
// //         }, 1000);
// //       }
// //     } catch (e) {
// //       toast.error("Failed to update task.");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // Progress Calculation
// //   const calculateProgress = (checklist) => {
// //     if (!checklist || checklist.length === 0) return 0;
// //     const completed = checklist.filter((item) => item.completed).length;
// //     return Math.round((completed / checklist.length) * 100);
// //   };

// //   // Checklist Handlers
// //   const handleAddChecklistItem = () => {
// //     if (newChecklistItem.trim()) {
// //       setSelectedTask((prev) => ({
// //         ...prev,
// //         todoCheckList: [
// //           ...prev.todoCheckList,
// //           { title: newChecklistItem, completed: false },
// //         ],
// //       }));
// //       setNewChecklistItem("");
// //     }
// //   };

// //   const handleRemoveChecklistItem = (index) => {
// //     const updatedChecklist = [...selectedTask.todoCheckList];
// //     updatedChecklist.splice(index, 1);
// //     setSelectedTask((prev) => ({ ...prev, todoCheckList: updatedChecklist }));
// //   };

// //   const toggleChecklistCompletion = (index) => {
// //     const updatedChecklist = [...selectedTask.todoCheckList];
// //     updatedChecklist[index].completed = !updatedChecklist[index].completed;
// //     setSelectedTask((prev) => ({ ...prev, todoCheckList: updatedChecklist }));
// //   };

// //   // Attachment Handlers
// //   const handleAddAttachment = () => {
// //     if (newAttachment.trim()) {
// //       setSelectedTask((prev) => ({
// //         ...prev,
// //         attachments: [...prev.attachments, newAttachment],
// //       }));
// //       setNewAttachment("");
// //     }
// //   };

// //   const handleRemoveAttachment = (index) => {
// //     const updated = [...selectedTask.attachments];
// //     updated.splice(index, 1);
// //     setSelectedTask((prev) => ({ ...prev, attachments: updated }));
// //   };

// //   // Assignee Handlers
// //   const handleAddAssignee = () => {
// //     if (newAssignee.trim()) {
// //       setSelectedTask((prev) => ({
// //         ...prev,
// //         assignTo: [...prev.assignTo, newAssignee],
// //       }));
// //       setNewAssignee("");
// //     }
// //   };

// //   const handleRemoveAssignee = (index) => {
// //     const updated = [...selectedTask.assignTo];
// //     updated.splice(index, 1);
// //     setSelectedTask((prev) => ({ ...prev, assignTo: updated }));
// //   };

// //   return (
// //     <>
// //       <Toaster position="top-center" />
// //       <div className="modal-backdrop fade show"></div>

// //       <div className="modal fade show d-block" tabIndex="-1">
// //         <div className="modal-dialog modal-dialog-centered modal-lg">
// //           <div className="modal-content">
// //             <div className="modal-header bg-light">
// //               <h5 className="modal-title fw-bold">Edit Task</h5>
// //               <button
// //                 type="button"
// //                 className="btn-close"
// //                 onClick={hideUpdate}
// //                 disabled={isLoading}
// //               ></button>
// //             </div>

// //             <div className="modal-body">
// //               <form>
// //                 <div className="mb-3">
// //                   <label className="form-label fw-bold">Title*</label>
// //                   <input
// //                     ref={titleRef}
// //                     type="text"
// //                     className="form-control w-100"
// //                     required
// //                     disabled={isLoading}
// //                     defaultValue={selectedTask.title}
// //                   />
// //                 </div>

// //                 <div className="mb-3">
// //                   <label className="form-label fw-bold">Description</label>
// //                   <textarea
// //                     ref={descriptionRef}
// //                     className="form-control w-100"
// //                     rows="4"
// //                     defaultValue={selectedTask.description}
// //                   />
// //                 </div>

// //                 <div className="row mb-3">
// //                   <div className="col-md-4">
// //                     <label className="form-label fw-bold">Due Date</label>
// //                     <div className="input-group">
// //                       <span className="input-group-text">
// //                         <FaRegCalendarAlt />
// //                       </span>
// //                       <input
// //                         ref={dueDateRef}
// //                         type="date"
// //                         className="form-control"
// //                         disabled={isLoading}
// //                         defaultValue={selectedTask?.dueDate?.split("T")[0]}
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="col-md-4">
// //                     <label className="form-label fw-bold">Status*</label>
// //                     <select
// //                       ref={statusRef}
// //                       className="form-select"
// //                       required
// //                       disabled={isLoading}
// //                       defaultValue={selectedTask.status}
// //                     >
// //                       <option value="Pending">Pending</option>
// //                       <option value="In Progress">In Progress</option>
// //                       <option value="Completed">Completed</option>
// //                     </select>
// //                   </div>

// //                   <div className="col-md-4">
// //                     <label className="form-label fw-bold">Priority*</label>
// //                     <select
// //                       ref={priorityRef}
// //                       className="form-select"
// //                       required
// //                       disabled={isLoading}
// //                       defaultValue={selectedTask.priority}
// //                     >
// //                       <option value="Low">Low</option>
// //                       <option value="Medium">Medium</option>
// //                       <option value="High">High</option>
// //                     </select>
// //                   </div>
// //                 </div>

// //                 {/* Checklist */}
// //                 <div className="mb-3">
// //                   <label className="form-label fw-bold">Checklist</label>
// //                   <div className="input-group mb-2">
// //                     <input
// //                       type="text"
// //                       className="form-control w-100"
// //                       placeholder="Add new checklist item"
// //                       value={newChecklistItem}
// //                       onChange={(e) => setNewChecklistItem(e.target.value)}
// //                       onKeyDown={(e) =>
// //                         e.key === "Enter" && handleAddChecklistItem()
// //                       }
// //                       disabled={isLoading}
// //                     />
// //                     <button
// //                       className="btn btn-outline-primary"
// //                       type="button"
// //                       onClick={handleAddChecklistItem}
// //                       disabled={isLoading}
// //                     >
// //                       Add
// //                     </button>
// //                   </div>

// //                   {selectedTask?.todoCheckList?.length > 0 && (
// //                     <div className="border rounded p-2">
// //                       <div className="d-flex justify-content-between mb-1">
// //                         <small>
// //                           Progress:{" "}
// //                           {calculateProgress(selectedTask.todoCheckList)}%
// //                         </small>
// //                         <small>
// //                           {
// //                             selectedTask.todoCheckList.filter(
// //                               (item) => item.completed
// //                             ).length
// //                           }{" "}
// //                           of {selectedTask.todoCheckList.length} completed
// //                         </small>
// //                       </div>

// //                       {selectedTask.todoCheckList.map((item, index) => (
// //                         <div
// //                           key={index}
// //                           className="d-flex justify-content-between align-items-center mb-1"
// //                         >
// //                           <div className="form-check">
// //                             <input
// //                               className="form-check-input"
// //                               type="checkbox"
// //                               checked={item.completed}
// //                               onChange={() => toggleChecklistCompletion(index)}
// //                               disabled={isLoading}
// //                             />
// //                             <label
// //                               className={`form-check-label ${
// //                                 item.completed
// //                                   ? "text-decoration-line-through text-muted"
// //                                   : ""
// //                               }`}
// //                             >
// //                               {item.title}
// //                             </label>
// //                           </div>
// //                           <button
// //                             className="btn btn-sm btn-outline-danger"
// //                             onClick={() => handleRemoveChecklistItem(index)}
// //                             disabled={isLoading}
// //                           >
// //                             <FaTimes />
// //                           </button>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* Attachments */}
// //                 <div className="mb-3">
// //                   <label className="form-label fw-bold">Attachments</label>
// //                   <div className="input-group mb-2">
// //                     <input
// //                       type="text"
// //                       className="form-control"
// //                       placeholder="Add attachment URL"
// //                       value={newAttachment}
// //                       onChange={(e) => setNewAttachment(e.target.value)}
// //                       onKeyDown={(e) =>
// //                         e.key === "Enter" && handleAddAttachment()
// //                       }
// //                       disabled={isLoading}
// //                     />
// //                     <button
// //                       className="btn btn-outline-primary"
// //                       type="button"
// //                       onClick={handleAddAttachment}
// //                       disabled={isLoading}
// //                     >
// //                       <FaPaperclip />
// //                     </button>
// //                   </div>

// //                   {selectedTask.attachments?.length > 0 && (
// //                     <div className="border rounded p-2">
// //                       {selectedTask.attachments.map((url, index) => (
// //                         <div
// //                           key={index}
// //                           className="d-flex justify-content-between align-items-center mb-1"
// //                         >
// //                           <a
// //                             href={url}
// //                             target="_blank"
// //                             rel="noopener noreferrer"
// //                           >
// //                             {url.length > 30 ? `${url.slice(0, 30)}...` : url}
// //                           </a>
// //                           <button
// //                             className="btn btn-sm btn-outline-danger"
// //                             onClick={() => handleRemoveAttachment(index)}
// //                             disabled={isLoading}
// //                           >
// //                             <FaTimes />
// //                           </button>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* Assignees */}
// //                 <div className="mb-3">
// //                   <label className="form-label fw-bold">Assign To</label>
// //                   <div className="input-group mb-2">
// //                     <input
// //                       type="text"
// //                       className="form-control"
// //                       placeholder="Add user ID"
// //                       value={newAssignee}
// //                       onChange={(e) => setNewAssignee(e.target.value)}
// //                       onKeyDown={(e) =>
// //                         e.key === "Enter" && handleAddAssignee()
// //                       }
// //                       disabled={isLoading}
// //                     />
// //                     <button
// //                       className="btn btn-outline-primary"
// //                       type="button"
// //                       onClick={handleAddAssignee}
// //                       disabled={isLoading}
// //                     >
// //                       <FaUserPlus />
// //                     </button>
// //                   </div>

// //                   {selectedTask.assignTo?.length > 0 && (
// //                     <div className="border rounded p-2">
// //                       {selectedTask.assignTo.map((userId, index) => (
// //                         <div
// //                           key={index}
// //                           className="d-flex justify-content-between align-items-center mb-1"
// //                         >
// //                           <span>{userId}</span>
// //                           <button
// //                             className="btn btn-sm btn-outline-danger"
// //                             onClick={() => handleRemoveAssignee(index)}
// //                             disabled={isLoading}
// //                           >
// //                             <FaTimes />
// //                           </button>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   )}
// //                 </div>
// //               </form>
// //             </div>

// //             <div className="modal-footer border-top-0">
// //               <button
// //                 className="btn btn-outline-secondary"
// //                 onClick={hideUpdate}
// //                 disabled={isLoading}
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 className="btn btn-primary"
// //                 onClick={onUpdateHandler}
// //                 disabled={isLoading}
// //               >
// //                 {isLoading ? (
// //                   <>
// //                     <span className="spinner-border spinner-border-sm me-2"></span>
// //                     Updating...
// //                   </>
// //                 ) : (
// //                   "Update Task"
// //                 )}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default EditCarosal;

// "use client";

// import { useEffect, useRef, useState } from "react";
// import {
//   UpdateTaskRequest,
//   getTaskbyIdRequest,
// } from "../apiRequiest/apiRequiest";
// import toast, { Toaster } from "react-hot-toast";
// import {
//   FaRegCalendarAlt,
//   FaTimes,
//   FaPaperclip,
//   FaSearch,
//   FaUser,
// } from "react-icons/fa";
// import { getUserDetails } from "../Helper/SessionHelper";

// // Mock user search function - replace with your actual API call
// const searchUsers = async (query) => {
//   // Simulate API delay
//   await new Promise((resolve) => setTimeout(resolve, 300));

//   // Replace this with your actual user search API
//   const mockUsers = [
//     { _id: "user1", name: "John Doe", email: "john@example.com" },
//     { _id: "user2", name: "Jane Smith", email: "jane@example.com" },
//     { _id: "user3", name: "Bob Johnson", email: "bob@example.com" },
//     { _id: "user4", name: "Alice Brown", email: "alice@example.com" },
//     { _id: "user5", name: "Charlie Wilson", email: "charlie@example.com" },
//     { _id: "user6", name: "David Miller", email: "david@example.com" },
//     { _id: "user7", name: "Emma Davis", email: "emma@example.com" },
//   ];

//   console.log("Mock users available:", mockUsers);
//   console.log("Searching for query:", query);

//   const filteredUsers = mockUsers.filter(
//     (user) =>
//       user.name.toLowerCase().includes(query.toLowerCase()) ||
//       user.email.toLowerCase().includes(query.toLowerCase())
//   );

//   console.log("Users matching query:", filteredUsers);
//   return filteredUsers;
// };

// // User search component with debugging
// const UserSearchInput = ({ onUserSelect, assignedUsers, disabled }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isSearching, setIsSearching] = useState(false);
//   const searchRef = useRef();

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSearch = async (query) => {
//     setSearchQuery(query);

//     if (query.trim().length < 2) {
//       setSearchResults([]);
//       setShowDropdown(false);
//       return;
//     }

//     setIsSearching(true);
//     try {
//       console.log("Searching for:", query);
//       const results = await searchUsers(query);
//       console.log("Search results from API:", results);
//       console.log("Currently assigned users:", assignedUsers);

//       // Ensure assignedUsers is an array and has proper structure
//       const safeAssignedUsers = Array.isArray(assignedUsers)
//         ? assignedUsers
//         : [];

//       // Filter out already assigned users - be more careful with the comparison
//       const filteredResults = results.filter((user) => {
//         const isAlreadyAssigned = safeAssignedUsers.some((assigned) => {
//           // Handle both string IDs and user objects
//           const assignedId =
//             typeof assigned === "string" ? assigned : assigned._id;
//           return assignedId === user._id;
//         });
//         return !isAlreadyAssigned;
//       });

//       console.log("Filtered results:", filteredResults);
//       setSearchResults(filteredResults);
//       setShowDropdown(true);
//     } catch (error) {
//       console.error("Search error:", error);
//       toast.error("Failed to search users");
//       setSearchResults([]);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   const handleUserSelect = (user) => {
//     onUserSelect(user);
//     setSearchQuery("");
//     setSearchResults([]);
//     setShowDropdown(false);
//   };

//   return (
//     <div className="position-relative" ref={searchRef}>
//       <div className="input-group">
//         <span className="input-group-text">
//           <FaSearch />
//         </span>
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search users by name or email..."
//           value={searchQuery}
//           onChange={(e) => handleSearch(e.target.value)}
//           onFocus={() => searchQuery.length >= 2 && setShowDropdown(true)}
//           disabled={disabled}
//         />
//         {isSearching && (
//           <span className="input-group-text">
//             <div className="spinner-border spinner-border-sm" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </span>
//         )}
//       </div>

//       {showDropdown && searchResults.length > 0 && (
//         <div
//           className="dropdown-menu show w-100 mt-1"
//           style={{ maxHeight: "200px", overflowY: "auto" }}
//         >
//           {searchResults.map((user) => (
//             <button
//               key={user._id}
//               className="dropdown-item d-flex align-items-center"
//               type="button"
//               onClick={() => handleUserSelect(user)}
//             >
//               <FaUser className="me-2 text-muted" />
//               <div>
//                 <div className="fw-medium">{user.name}</div>
//                 <small className="text-muted">{user.email}</small>
//               </div>
//             </button>
//           ))}
//         </div>
//       )}

//       {showDropdown &&
//         searchResults.length === 0 &&
//         searchQuery.length >= 2 &&
//         !isSearching && (
//           <div className="dropdown-menu show w-100 mt-1">
//             <div className="dropdown-item-text text-muted">
//               No users found matching "{searchQuery}"
//               <br />
//               <small>Debug: Check console for search details</small>
//             </div>
//           </div>
//         )}
//     </div>
//   );
// };

// const EditCarosal = ({ props }) => {
//   const { taskId, hideUpdate } = props;
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [newChecklistItem, setNewChecklistItem] = useState("");
//   const [newAttachment, setNewAttachment] = useState("");

//   // Refs
//   const titleRef = useRef();
//   const descriptionRef = useRef();
//   const priorityRef = useRef();
//   const statusRef = useRef();
//   const dueDateRef = useRef();

//   // Load task data by ID
//   useEffect(() => {
//     (async () => {
//       const result = await getTaskbyIdRequest(taskId);
//       if (result?.[0]) {
//         const task = result[0];
//         console.log("Loaded task:", task);

//         // Handle assignTo array properly
//         if (task.assignTo && Array.isArray(task.assignTo)) {
//           // If assignTo contains just IDs, convert them to user objects
//           const assignedUsers = task.assignTo.map((item) => {
//             if (typeof item === "string") {
//               // Don't use the same IDs as mock users to avoid filtering conflicts
//               return {
//                 _id: item,
//                 name: `User ${item}`,
//                 email: `${item}@company.com`,
//               };
//             }
//             return item;
//           });
//           task.assignTo = assignedUsers;
//         } else {
//           task.assignTo = [];
//         }

//         console.log("Processed assignTo:", task.assignTo);
//         setSelectedTask(task);
//       } else {
//         toast.error("Failed to fetch task data.");
//       }
//     })();
//   }, [taskId]);

//   // Safety render fallback
//   if (!selectedTask) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: "200px" }}
//       >
//         <div className="spinner-border" role="status">
//           <span className="visually-hidden">Loading task...</span>
//         </div>
//       </div>
//     );
//   }

//   const user = getUserDetails();

//   // Update task
//   const onUpdateHandler = async () => {
//     try {
//       setIsLoading(true);
//       const title = titleRef.current.value;
//       const description = descriptionRef.current.value;
//       const dueDate = dueDateRef.current.value || null;
//       const priority = priorityRef.current.value;
//       const status = statusRef.current.value;
//       const todoCheckList = selectedTask.todoCheckList || [];
//       const attachments = selectedTask.attachments || [];

//       // Extract user IDs from assigned users
//       const assignTo = selectedTask.assignTo.map((user) => user._id);

//       const createdBy = user?._id;
//       const progress = calculateProgress(todoCheckList);

//       const response = await UpdateTaskRequest(
//         taskId,
//         title,
//         description,
//         dueDate,
//         priority,
//         status,
//         todoCheckList,
//         attachments,
//         assignTo,
//         createdBy,
//         progress
//       );

//       if (response.status === "success") {
//         toast.success("Task updated successfully!");
//         setTimeout(() => {
//           hideUpdate();
//           window.location.reload();
//         }, 1000);
//       }
//     } catch (e) {
//       toast.error("Failed to update task.");
//       console.error("Update error:", e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Progress Calculation
//   const calculateProgress = (checklist) => {
//     if (!checklist || checklist.length === 0) return 0;
//     const completed = checklist.filter((item) => item.completed).length;
//     return Math.round((completed / checklist.length) * 100);
//   };

//   // Checklist Handlers
//   const handleAddChecklistItem = () => {
//     if (newChecklistItem.trim()) {
//       setSelectedTask((prev) => ({
//         ...prev,
//         todoCheckList: [
//           ...prev.todoCheckList,
//           { title: newChecklistItem, completed: false },
//         ],
//       }));
//       setNewChecklistItem("");
//     }
//   };

//   const handleRemoveChecklistItem = (index) => {
//     const updatedChecklist = [...selectedTask.todoCheckList];
//     updatedChecklist.splice(index, 1);
//     setSelectedTask((prev) => ({ ...prev, todoCheckList: updatedChecklist }));
//   };

//   const toggleChecklistCompletion = (index) => {
//     const updatedChecklist = [...selectedTask.todoCheckList];
//     updatedChecklist[index].completed = !updatedChecklist[index].completed;
//     setSelectedTask((prev) => ({ ...prev, todoCheckList: updatedChecklist }));
//   };

//   // Attachment Handlers
//   const handleAddAttachment = () => {
//     if (newAttachment.trim()) {
//       setSelectedTask((prev) => ({
//         ...prev,
//         attachments: [...prev.attachments, newAttachment],
//       }));
//       setNewAttachment("");
//     }
//   };

//   const handleRemoveAttachment = (index) => {
//     const updated = [...selectedTask.attachments];
//     updated.splice(index, 1);
//     setSelectedTask((prev) => ({ ...prev, attachments: updated }));
//   };

//   // User Assignment Handlers
//   const handleUserSelect = (user) => {
//     // Check if user is already assigned
//     const isAlreadyAssigned = selectedTask.assignTo.some(
//       (assigned) => assigned._id === user._id
//     );

//     if (isAlreadyAssigned) {
//       toast.error("User is already assigned to this task");
//       return;
//     }

//     setSelectedTask((prev) => ({
//       ...prev,
//       assignTo: [...prev.assignTo, user],
//     }));

//     toast.success(`${user.name} assigned to task`);
//   };

//   const handleRemoveAssignee = (index) => {
//     const removedUser = selectedTask.assignTo[index];
//     const updated = [...selectedTask.assignTo];
//     updated.splice(index, 1);
//     setSelectedTask((prev) => ({ ...prev, assignTo: updated }));
//     toast.success(`${removedUser.name} removed from task`);
//   };

//   return (
//     <>
//       <Toaster position="top-center" />
//       <div className="modal-backdrop fade show"></div>
//       <div className="modal fade show d-block" tabIndex="-1">
//         <div className="modal-dialog modal-dialog-centered modal-lg">
//           <div className="modal-content">
//             <div className="modal-header bg-light">
//               <h5 className="modal-title fw-bold">Edit Task</h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 onClick={hideUpdate}
//                 disabled={isLoading}
//               ></button>
//             </div>
//             <div className="modal-body">
//               <form>
//                 <div className="mb-3">
//                   <label className="form-label fw-bold">Title*</label>
//                   <input
//                     ref={titleRef}
//                     type="text"
//                     className="form-control w-100"
//                     required
//                     disabled={isLoading}
//                     defaultValue={selectedTask.title}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label fw-bold">Description</label>
//                   <textarea
//                     ref={descriptionRef}
//                     className="form-control w-100"
//                     rows="4"
//                     defaultValue={selectedTask.description}
//                   />
//                 </div>
//                 <div className="row mb-3">
//                   <div className="col-md-4">
//                     <label className="form-label fw-bold">Due Date</label>
//                     <div className="input-group">
//                       <span className="input-group-text">
//                         <FaRegCalendarAlt />
//                       </span>
//                       <input
//                         ref={dueDateRef}
//                         type="date"
//                         className="form-control"
//                         disabled={isLoading}
//                         defaultValue={selectedTask?.dueDate?.split("T")[0]}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <label className="form-label fw-bold">Status*</label>
//                     <select
//                       ref={statusRef}
//                       className="form-select"
//                       required
//                       disabled={isLoading}
//                       defaultValue={selectedTask.status}
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="In Progress">In Progress</option>
//                       <option value="Completed">Completed</option>
//                     </select>
//                   </div>
//                   <div className="col-md-4">
//                     <label className="form-label fw-bold">Priority*</label>
//                     <select
//                       ref={priorityRef}
//                       className="form-select"
//                       required
//                       disabled={isLoading}
//                       defaultValue={selectedTask.priority}
//                     >
//                       <option value="Low">Low</option>
//                       <option value="Medium">Medium</option>
//                       <option value="High">High</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Checklist */}
//                 <div className="mb-3">
//                   <label className="form-label fw-bold">Checklist</label>
//                   <div className="input-group mb-2">
//                     <input
//                       type="text"
//                       className="form-control w-100"
//                       placeholder="Add new checklist item"
//                       value={newChecklistItem}
//                       onChange={(e) => setNewChecklistItem(e.target.value)}
//                       onKeyDown={(e) =>
//                         e.key === "Enter" && handleAddChecklistItem()
//                       }
//                       disabled={isLoading}
//                     />
//                     <button
//                       className="btn btn-outline-primary"
//                       type="button"
//                       onClick={handleAddChecklistItem}
//                       disabled={isLoading}
//                     >
//                       Add
//                     </button>
//                   </div>
//                   {selectedTask?.todoCheckList?.length > 0 && (
//                     <div className="border rounded p-2">
//                       <div className="d-flex justify-content-between mb-1">
//                         <small>
//                           Progress:{" "}
//                           {calculateProgress(selectedTask.todoCheckList)}%
//                         </small>
//                         <small>
//                           {
//                             selectedTask.todoCheckList.filter(
//                               (item) => item.completed
//                             ).length
//                           }{" "}
//                           of {selectedTask.todoCheckList.length} completed
//                         </small>
//                       </div>
//                       {selectedTask.todoCheckList.map((item, index) => (
//                         <div
//                           key={index}
//                           className="d-flex justify-content-between align-items-center mb-1"
//                         >
//                           <div className="form-check">
//                             <input
//                               className="form-check-input"
//                               type="checkbox"
//                               checked={item.completed}
//                               onChange={() => toggleChecklistCompletion(index)}
//                               disabled={isLoading}
//                             />
//                             <label
//                               className={`form-check-label ${
//                                 item.completed
//                                   ? "text-decoration-line-through text-muted"
//                                   : ""
//                               }`}
//                             >
//                               {item.title}
//                             </label>
//                           </div>
//                           <button
//                             className="btn btn-sm btn-outline-danger"
//                             onClick={() => handleRemoveChecklistItem(index)}
//                             disabled={isLoading}
//                           >
//                             <FaTimes />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Attachments */}
//                 <div className="mb-3">
//                   <label className="form-label fw-bold">Attachments</label>
//                   <div className="input-group mb-2">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Add attachment URL"
//                       value={newAttachment}
//                       onChange={(e) => setNewAttachment(e.target.value)}
//                       onKeyDown={(e) =>
//                         e.key === "Enter" && handleAddAttachment()
//                       }
//                       disabled={isLoading}
//                     />
//                     <button
//                       className="btn btn-outline-primary"
//                       type="button"
//                       onClick={handleAddAttachment}
//                       disabled={isLoading}
//                     >
//                       <FaPaperclip />
//                     </button>
//                   </div>
//                   {selectedTask.attachments?.length > 0 && (
//                     <div className="border rounded p-2">
//                       {selectedTask.attachments.map((url, index) => (
//                         <div
//                           key={index}
//                           className="d-flex justify-content-between align-items-center mb-1"
//                         >
//                           <a
//                             href={url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                           >
//                             {url.length > 30 ? `${url.slice(0, 30)}...` : url}
//                           </a>
//                           <button
//                             className="btn btn-sm btn-outline-danger"
//                             onClick={() => handleRemoveAttachment(index)}
//                             disabled={isLoading}
//                           >
//                             <FaTimes />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Assign Users */}
//                 <div className="mb-3">
//                   <label className="form-label fw-bold">Assign To</label>
//                   <UserSearchInput
//                     onUserSelect={handleUserSelect}
//                     assignedUsers={selectedTask.assignTo || []}
//                     disabled={isLoading}
//                   />

//                   {selectedTask.assignTo?.length > 0 && (
//                     <div className="border rounded p-2 mt-2">
//                       <small className="text-muted mb-2 d-block">
//                         Assigned Users ({selectedTask.assignTo.length})
//                       </small>
//                       {selectedTask.assignTo.map((user, index) => (
//                         <div
//                           key={user._id}
//                           className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded"
//                         >
//                           <div className="d-flex align-items-center">
//                             <FaUser className="me-2 text-primary" />
//                             <div>
//                               <div className="fw-medium">{user.name}</div>
//                               <small className="text-muted">{user.email}</small>
//                             </div>
//                           </div>
//                           <button
//                             className="btn btn-sm btn-outline-danger"
//                             onClick={() => handleRemoveAssignee(index)}
//                             disabled={isLoading}
//                             title="Remove user"
//                           >
//                             <FaTimes />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </form>
//             </div>
//             <div className="modal-footer border-top-0">
//               <button
//                 className="btn btn-outline-secondary"
//                 onClick={hideUpdate}
//                 disabled={isLoading}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="btn btn-primary"
//                 onClick={onUpdateHandler}
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <span className="spinner-border spinner-border-sm me-2"></span>
//                     Updating...
//                   </>
//                 ) : (
//                   "Update Task"
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


"use client"

import { useEffect, useRef, useState } from "react"
import { UpdateTaskRequest, getTaskbyIdRequest } from "../apiRequiest/apiRequiest"
import toast, { Toaster } from "react-hot-toast"
import { FaRegCalendarAlt, FaTimes, FaPaperclip, FaSearch, FaUser } from "react-icons/fa"
import { getUserDetails } from "../Helper/SessionHelper"

// Mock user search function - replace with your actual API call
const searchUsers = async (query) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Replace this with your actual user search API
  const mockUsers = [
    { _id: "user1", name: "John Doe", email: "john@example.com" },
    { _id: "user2", name: "Jane Smith", email: "jane@example.com" },
    { _id: "user3", name: "Bob Johnson", email: "bob@example.com" },
    { _id: "user4", name: "Alice Brown", email: "alice@example.com" },
    { _id: "user5", name: "Charlie Wilson", email: "charlie@example.com" },
    { _id: "user6", name: "David Miller", email: "david@example.com" },
    { _id: "user7", name: "Emma Davis", email: "emma@example.com" },
  ]

  console.log("Mock users available:", mockUsers)
  console.log("Searching for query:", query)

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) || user.email.toLowerCase().includes(query.toLowerCase()),
  )

  console.log("Users matching query:", filteredUsers)
  return filteredUsers
}

// User search component with debugging
const UserSearchInput = ({ onUserSelect, assignedUsers, disabled }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const searchRef = useRef()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = async (query) => {
    setSearchQuery(query)

    if (query.trim().length < 2) {
      setSearchResults([])
      setShowDropdown(false)
      return
    }

    setIsSearching(true)
    try {
      console.log("Searching for:", query)
      const results = await searchUsers(query)
      console.log("Search results from API:", results)
      console.log("Currently assigned users:", assignedUsers)

      // Ensure assignedUsers is an array and has proper structure
      const safeAssignedUsers = Array.isArray(assignedUsers) ? assignedUsers : []

      // Filter out already assigned users - be more careful with the comparison
      const filteredResults = results.filter((user) => {
        const isAlreadyAssigned = safeAssignedUsers.some((assigned) => {
          // Handle both string IDs and user objects
          const assignedId = typeof assigned === "string" ? assigned : assigned._id
          return assignedId === user._id
        })
        return !isAlreadyAssigned
      })

      console.log("Filtered results:", filteredResults)
      setSearchResults(filteredResults)
      setShowDropdown(true)
    } catch (error) {
      console.error("Search error:", error)
      toast.error("Failed to search users")
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleUserSelect = (user) => {
    onUserSelect(user)
    setSearchQuery("")
    setSearchResults([])
    setShowDropdown(false)
  }

  return (
    <div className="position-relative" ref={searchRef}>
      <div className="input-group">
        <span className="input-group-text">
          <FaSearch />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search users by name or email..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => searchQuery.length >= 2 && setShowDropdown(true)}
          disabled={disabled}
        />
        {isSearching && (
          <span className="input-group-text">
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </span>
        )}
      </div>

      {showDropdown && searchResults.length > 0 && (
        <div className="dropdown-menu show w-100 mt-1" style={{ maxHeight: "200px", overflowY: "auto" }}>
          {searchResults.map((user) => (
            <button
              key={user._id}
              className="dropdown-item d-flex align-items-center"
              type="button"
              onClick={() => handleUserSelect(user)}
            >
              <FaUser className="me-2 text-muted" />
              <div>
                <div className="fw-medium">{user.name}</div>
                <small className="text-muted">{user.email}</small>
              </div>
            </button>
          ))}
        </div>
      )}

      {showDropdown && searchResults.length === 0 && searchQuery.length >= 2 && !isSearching && (
        <div className="dropdown-menu show w-100 mt-1">
          <div className="dropdown-item-text text-muted">
            No users found matching "{searchQuery}"
            <br />
            <small>Debug: Check console for search details</small>
          </div>
        </div>
      )}
    </div>
  )
}

const EditCarosal = ({ props }) => {
  const { taskId, hideUpdate } = props
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [newChecklistItem, setNewChecklistItem] = useState("")
  const [newAttachment, setNewAttachment] = useState("")

  // Refs
  const titleRef = useRef()
  const descriptionRef = useRef()
  const priorityRef = useRef()
  const statusRef = useRef()
  const dueDateRef = useRef()

  // Load task data by ID
  useEffect(() => {
    ;(async () => {
      const result = await getTaskbyIdRequest(taskId)
      if (result?.[0]) {
        const task = result[0]
        console.log("Loaded task:", task)

        // Handle assignTo array properly
        if (task.assignTo && Array.isArray(task.assignTo)) {
          // If assignTo contains just IDs, convert them to user objects
          const assignedUsers = task.assignTo.map((item) => {
            if (typeof item === "string") {
              // Don't use the same IDs as mock users to avoid filtering conflicts
              return { _id: item, name: `User ${item}`, email: `${item}@company.com` }
            }
            return item
          })
          task.assignTo = assignedUsers
        } else {
          task.assignTo = []
        }

        console.log("Processed assignTo:", task.assignTo)
        setSelectedTask(task)
      } else {
        toast.error("Failed to fetch task data.")
      }
    })()
  }, [taskId])

  // Safety render fallback
  if (!selectedTask) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading task...</span>
        </div>
      </div>
    )
  }

  const user = getUserDetails()

  // Update task
  const onUpdateHandler = async () => {
    try {
      setIsLoading(true)
      const title = titleRef.current.value
      const description = descriptionRef.current.value
      const dueDate = dueDateRef.current.value || null
      const priority = priorityRef.current.value
      const status = statusRef.current.value
      const todoCheckList = selectedTask.todoCheckList || []
      const attachments = selectedTask.attachments || []

      // Extract user IDs from assigned users
      const assignTo = selectedTask.assignTo.map((user) => user._id)

      const createdBy = user?._id
      const progress = calculateProgress(todoCheckList)

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
        progress,
      )

      if (response.status === "success") {
        toast.success("Task updated successfully!")
        setTimeout(() => {
          hideUpdate()
          window.location.reload()
        }, 1000)
      }
    } catch (e) {
      toast.error("Failed to update task.")
      console.error("Update error:", e)
    } finally {
      setIsLoading(false)
    }
  }

  // Progress Calculation
  const calculateProgress = (checklist) => {
    if (!checklist || checklist.length === 0) return 0
    const completed = checklist.filter((item) => item.completed).length
    return Math.round((completed / checklist.length) * 100)
  }

  // Checklist Handlers
  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setSelectedTask((prev) => ({
        ...prev,
        todoCheckList: [...prev.todoCheckList, { title: newChecklistItem, completed: false }],
      }))
      setNewChecklistItem("")
    }
  }

  const handleRemoveChecklistItem = (index) => {
    const updatedChecklist = [...selectedTask.todoCheckList]
    updatedChecklist.splice(index, 1)
    setSelectedTask((prev) => ({ ...prev, todoCheckList: updatedChecklist }))
  }

  const toggleChecklistCompletion = (index) => {
    const updatedChecklist = [...selectedTask.todoCheckList]
    updatedChecklist[index].completed = !updatedChecklist[index].completed
    setSelectedTask((prev) => ({ ...prev, todoCheckList: updatedChecklist }))
  }

  // Attachment Handlers
  const handleAddAttachment = () => {
    if (newAttachment.trim()) {
      setSelectedTask((prev) => ({
        ...prev,
        attachments: [...prev.attachments, newAttachment],
      }))
      setNewAttachment("")
    }
  }

  const handleRemoveAttachment = (index) => {
    const updated = [...selectedTask.attachments]
    updated.splice(index, 1)
    setSelectedTask((prev) => ({ ...prev, attachments: updated }))
  }

  // User Assignment Handlers
  const handleUserSelect = (user) => {
    // Check if user is already assigned
    const isAlreadyAssigned = selectedTask.assignTo.some((assigned) => assigned._id === user._id)

    if (isAlreadyAssigned) {
      toast.error("User is already assigned to this task")
      return
    }

    setSelectedTask((prev) => ({
      ...prev,
      assignTo: [...prev.assignTo, user],
    }))

    toast.success(`${user.name} assigned to task`)
  }

  const handleRemoveAssignee = (index) => {
    const removedUser = selectedTask.assignTo[index]
    const updated = [...selectedTask.assignTo]
    updated.splice(index, 1)
    setSelectedTask((prev) => ({ ...prev, assignTo: updated }))
    toast.success(`${removedUser.name} removed from task`)
  }

  return (
    <>
      <Toaster position="top-center" />
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h5 className="modal-title fw-bold">Edit Task</h5>
              <button type="button" className="btn-close" onClick={hideUpdate} disabled={isLoading}></button>
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
                      onKeyDown={(e) => e.key === "Enter" && handleAddChecklistItem()}
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
                        <small>Progress: {calculateProgress(selectedTask.todoCheckList)}%</small>
                        <small>
                          {selectedTask.todoCheckList.filter((item) => item.completed).length} of{" "}
                          {selectedTask.todoCheckList.length} completed
                        </small>
                      </div>
                      {selectedTask.todoCheckList.map((item, index) => (
                        <div key={index} className="d-flex justify-content-between align-items-center mb-1">
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
                                item.completed ? "text-decoration-line-through text-muted" : ""
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
                      onKeyDown={(e) => e.key === "Enter" && handleAddAttachment()}
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
                        <div key={index} className="d-flex justify-content-between align-items-center mb-1">
                          <a href={url} target="_blank" rel="noopener noreferrer">
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

                {/* Assign Users */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Assign To</label>
                  <UserSearchInput
                    onUserSelect={handleUserSelect}
                    assignedUsers={selectedTask.assignTo || []}
                    disabled={isLoading}
                  />

                  {selectedTask.assignTo?.length > 0 && (
                    <div className="border rounded p-2 mt-2">
                      <small className="text-muted mb-2 d-block">Assigned Users ({selectedTask.assignTo.length})</small>
                      {selectedTask.assignTo.map((user, index) => (
                        <div
                          key={user._id}
                          className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded"
                        >
                          <div className="d-flex align-items-center">
                            <FaUser className="me-2 text-primary" />
                            <div>
                              <div className="fw-medium">{user.name}</div>
                              <small className="text-muted">{user.email}</small>
                            </div>
                          </div>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemoveAssignee(index)}
                            disabled={isLoading}
                            title="Remove user"
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
              <button className="btn btn-outline-secondary" onClick={hideUpdate} disabled={isLoading}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={onUpdateHandler} disabled={isLoading}>
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
  )
}

export default EditCarosal
