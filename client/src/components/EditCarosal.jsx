
import { useEffect, useRef, useState } from "react";
import {
  UpdateTaskRequest,
  getTaskbyIdRequest,
  getUsersRequest,
} from "../apiRequiest/apiRequiest";
import toast, { Toaster } from "react-hot-toast";
import {
  FaRegCalendarAlt,
  FaPaperclip,
  FaSearch,
} from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { getUserDetails } from "../Helper/SessionHelper";

const EditCarosal = ({ props }) => {
  const { taskId, hideUpdate } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [newAttachment, setNewAttachment] = useState("");

  // User search states
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // Refs
  const titleRef = useRef();
  const descriptionRef = useRef();
  const priorityRef = useRef();
  const statusRef = useRef();
  const dueDateRef = useRef();
  const searchInputRef = useRef();

  // Load task data by ID
  useEffect(() => {
    (async () => {
      const result = await getTaskbyIdRequest(taskId);
      if (result?.[0]) {
        const processedTask = {
          ...result[0],
          attachments:
            result[0].attachments?.map((attachment, index) => {
              if (typeof attachment === "string") {
                return { id: Date.now() + index, url: attachment };
              }
              return attachment.id
                ? attachment
                : { id: Date.now() + index, url: attachment.url || attachment };
            }) || [],
          todoCheckList:
            result[0].todoCheckList?.map((item, index) => ({
              title: item.title,
              completed: item.completed || false,
              id: item.id || Date.now() + index,
            })) || [],
          assignTo: Array.isArray(result[0].assignTo)
            ? result[0].assignTo.map(user => {
              if (user && typeof user === 'object' && user._id) {
                return user;
              }
              return user;
            }).filter(Boolean)
            : [],
        };
        setSelectedTask(processedTask);
      } else {
        toast.error("Failed to fetch task data.");
      }
    })();
  }, [taskId]);

  // Helper function to get user ID consistently
  const getUserId = (user) => {
    if (typeof user === 'object' && user._id) {
      return user._id;
    }
    return user;
  };


  // User search functionality - FIXED
  const handleUserSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    try {
      setIsSearching(true);
      setShowSearchDropdown(true);

      const response = await getUsersRequest(query);
      let users = [];

      // Handle different response formats
      if (response) {
        if (response.data && Array.isArray(response.data)) {
          users = response.data;
        } else if (response.users && Array.isArray(response.users)) {
          users = response.users;
        } else if (Array.isArray(response)) {
          users = response;
        } else if (response.status === "success" && response.data) {
          users = Array.isArray(response.data)
            ? response.data
            : [response.data];
        }
      }

      // Filter out already assigned users
      if (users.length > 0 && selectedTask?.assignTo) {
        const filteredResults = users.filter(user => {
          const userId = getUserId(user);
          return !selectedTask.assignTo.some(assigned => {
            const assignedId = getUserId(assigned);
            return assignedId === userId;
          });
        });
        setSearchResults(filteredResults);
      } else {
        setSearchResults(users);
      }
    } catch (error) {
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search with proper dependency handling
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (userSearchQuery.trim() && selectedTask) {
        handleUserSearch(userSearchQuery);
      } else {
        setSearchResults([]);
        setShowSearchDropdown(false);
      }
    }, 300);
    return () => clearTimeout(delayedSearch);
  }, [userSearchQuery, selectedTask]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!selectedTask) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading task...</span>
        </div>
      </div>
    );
  }

  const user = getUserDetails();

  // Update task
  const onUpdateHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const title = titleRef.current.value;
      const description = descriptionRef.current.value;
      const dueDate = dueDateRef.current.value || null;
      const priority = priorityRef.current.value;
      const status = statusRef.current.value;

      const todoCheckList = selectedTask.todoCheckList?.map((item) => ({
        title: item.title,
        completed: item.completed,
      })) || [];

      const attachments = selectedTask.attachments?.map((att) => att.url || att) || [];

      // Properly format assignTo array with user IDs
      const assignTo = selectedTask.assignTo
        .map(user => {
          const userId = user._id;
          return userId;
        })


      const createdBy = user?._id;
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
        createdBy
      );

      if (response.status === "success") {
        toast.success("Task updated successfully!");
        setTimeout(() => {
          hideUpdate();
          window.location.reload();
        }, 1000);
      }
    }
    catch (error) {
      toast.error("Failed to update task.");
    } finally {
      setIsLoading(false);
    }
  };

  // Checklist Handlers
  const handleAddChecklistItem = (e) => {
    e.preventDefault();
    if (newChecklistItem.trim()) {
      setSelectedTask((prev) => ({
        ...prev,
        todoCheckList: [
          ...prev.todoCheckList,
          {
            title: newChecklistItem,
            completed: false,
            id: Date.now(),
          },
        ],
      }));
      setNewChecklistItem("");
    }
  };

  const handleRemoveChecklistItem = (e, indexToRemove) => {
    e.preventDefault();
    e.stopPropagation();

    setSelectedTask((prev) => {
      const updatedChecklist = prev.todoCheckList.filter(
        (_, index) => index !== indexToRemove
      );
      return {
        ...prev,
        todoCheckList: updatedChecklist,
      };
    });
  };

  const toggleChecklistCompletion = (index) => {
    setSelectedTask((prev) => {
      const updatedChecklist = prev.todoCheckList.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      );
      return {
        ...prev,
        todoCheckList: updatedChecklist,
      };
    });
  };

  // Attachment Handlers
  const handleAddAttachment = (e) => {
    e.preventDefault();
    if (newAttachment.trim()) {
      setSelectedTask((prev) => ({
        ...prev,
        attachments: [
          ...prev.attachments,
          {
            id: Date.now(),
            url: newAttachment,
          },
        ],
      }));
      setNewAttachment("");
    }
  };

  const handleRemoveAttachment = (e, attachmentId) => {
    e.preventDefault();
    e.stopPropagation();

    setSelectedTask((prev) => ({
      ...prev,
      attachments: prev.attachments.filter(
        (attachment) => attachment.id !== attachmentId
      ),
    }));
  };

  // FIXED: Assignee Handlers
  const handleAddAssignee = (user) => {
    if (!user || !user._id) {
      toast.error("Invalid user selected.");
      return;
    }

    setSelectedTask(prev => {
      // Check if user is already assigned
      const isAlreadyAssigned = prev.assignTo.some(assignedUser =>
        getUserId(assignedUser) === user._id
      );

      if (isAlreadyAssigned) {
        toast.error("User is already assigned to this task.");
        return prev;
      }

      // Add the new user to the array
      const newAssignTo = [...prev.assignTo, user];

      return {
        ...prev,
        assignTo: newAssignTo
      };
    });

    // Clear search after adding
    setUserSearchQuery("");
    setShowSearchDropdown(false);
    setSearchResults([]);

    toast.success(`${user.name} has been assigned to this task.`);
  };

  const handleRemoveAssignee = (e, indexToRemove) => {
    e.preventDefault();
    e.stopPropagation();

    const userToRemove = selectedTask.assignTo[indexToRemove];

    setSelectedTask(prev => {
      const updatedAssignees = prev.assignTo.filter((_, index) => index !== indexToRemove);
      return {
        ...prev,
        assignTo: updatedAssignees
      };
    });

    // Show success message
    if (userToRemove) {
      const userName = typeof userToRemove === 'object' ? userToRemove.name : userToRemove;
      toast.success(`${userName} has been removed from this task.`);
    }

    // Refresh search results to include the removed user
    if (userSearchQuery.trim()) {
      setTimeout(() => {
        handleUserSearch(userSearchQuery);
      }, 100);
    }
  };

  // Handle search input focus
  const handleSearchInputFocus = () => {
    if (userSearchQuery.trim()) {
      setShowSearchDropdown(true);
      if (searchResults.length === 0) {
        handleUserSearch(userSearchQuery);
      }
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="modal-backdrop fade show"></div>
      <div className="modal edit_model fade show d-block" tabIndex="-1">
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
              <form onSubmit={onUpdateHandler}>
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
                <div className="mb-3">
                  <label className="form-label fw-bold">Checklist</label>
                  <div className="input-group mb-2 d-flex no-wrap flex-nowrap">
                    <input
                      type="text"
                      className="form-control w-90"
                      placeholder="Add new checklist item"
                      value={newChecklistItem}
                      onChange={(e) => setNewChecklistItem(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddChecklistItem(e);
                        }
                      }}
                      disabled={isLoading}
                    />
                    <button
                      className="checklistBtn"
                      type="button"
                      onClick={handleAddChecklistItem}
                      disabled={isLoading}
                    >
                      + Add
                    </button>
                  </div>
                  {selectedTask?.todoCheckList?.length > 0 && (
                    <div className="border rounded p-2">
                      <div className="d-flex justify-content-between mb-1">
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
                          key={`checklist-${index}-${item.id || item.title}`}
                          className="d-flex justify-content-between align-items-center mb-2"
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
                              className={`form-check-label ${item.completed
                                ? "text-decoration-line-through text-muted"
                                : ""
                                }`}
                            >
                              {item.title}
                            </label>
                          </div>
                          <button
                            className="common-delete-icon"
                            type="button"
                            onClick={(e) => handleRemoveChecklistItem(e, index)}
                            disabled={isLoading}
                          >
                            <MdDeleteOutline />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Attachments</label>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add attachment URL"
                      value={newAttachment}
                      onChange={(e) => setNewAttachment(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddAttachment(e);
                        }
                      }}
                      disabled={isLoading}
                    />
                    <button
                      className="checklistBtn"
                      type="button"
                      onClick={handleAddAttachment}
                      disabled={isLoading}
                    >
                      <FaPaperclip />
                    </button>
                  </div>
                  {selectedTask.attachments?.length > 0 && (
                    <div className="border rounded p-2">
                      {selectedTask.attachments.map((attachment) => (
                        <div
                          key={`attachment-${attachment.id}`}
                          className="d-flex justify-content-between align-items-center mb-2"
                        >
                          <a
                            href={attachment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {attachment.url.length > 30
                              ? `${attachment.url.slice(0, 30)}...`
                              : attachment.url}
                          </a>
                          <button
                            className="common-delete-icon"
                            type="button"
                            onClick={(e) => handleRemoveAttachment(e, attachment.id)}
                            disabled={isLoading}
                          >
                            <MdDeleteOutline />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Assign To</label>
                  <div className="position-relative" ref={searchInputRef}>
                    <div className="input-group mb-2">
                      <span className="input-group-text">
                        <FaSearch />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search users by name or email..."
                        value={userSearchQuery}
                        onChange={(e) => setUserSearchQuery(e.target.value)}
                        onFocus={handleSearchInputFocus}
                        disabled={isLoading}
                      />
                    </div>
                    {showSearchDropdown && (
                      <div
                        className="dropdown-menu show w-100"
                        style={{
                          maxHeight: "200px",
                          overflowY: "auto",
                          zIndex: 1050
                        }}
                      >
                        {isSearching ? (
                          <div className="dropdown-item-text text-center py-3">
                            <div
                              className="spinner-border spinner-border-sm"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        ) : searchResults.length > 0 ? (
                          searchResults.map((user) => (
                            <button
                              key={`search-result-${user._id}`}
                              className="dropdown-item d-flex align-items-center py-2"
                              type="button"
                              onClick={() => handleAddAssignee(user)}
                            >
                              <div className="me-2">
                                <img className="rounded-circle" width={30} height={30} src={user.photo} alt="" />
                              </div>
                              <div className="text-start">
                                <div className="fw-semibold">{user.name}</div>
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="dropdown-item-text text-muted py-3">
                            {userSearchQuery.trim()
                              ? `No users found matching "${userSearchQuery}"`
                              : "Start typing to search users..."}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {selectedTask.assignTo?.length > 0 && (
                    <div className="border rounded p-2">
                      <small className="text-muted mb-2 d-block">
                        Assigned Users ({selectedTask.assignTo.length}):
                      </small>
                      {selectedTask.assignTo.map((user, index) => (
                        <div
                          key={`assignee-${index}-${getUserId(user)}`}
                          className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded"
                        >
                          <div>
                            <div className="fw-semibold d-flex align-items-center">
                              <img className="rounded-circle me-2" width={30} height={30} src={user?.photo} alt="" />
                              <h4 className="fs-6 m-0">{user?.name}</h4>
                            </div>
                          </div>
                          <button
                            className="common-delete-icon"
                            type="button"
                            onClick={(e) => handleRemoveAssignee(e, index)}
                            disabled={isLoading}
                          >
                            <MdDeleteOutline />
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
                className="cencell_common_btn"
                onClick={hideUpdate}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="commonBtn"
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