import { useEffect, useState } from "react";
import Header from "./Dashboard/Header";
import LeftSideHome from "./Dashboard/LeftSideHome";
import Carousel from "./Dashboard/TaskCarosal";
import { FaRegCalendarAlt } from "react-icons/fa";
import {
  DeleteTaskRequest,
  getAllTaskRequest,
} from "../apiRequiest/apiRequiest";
import { LiaEditSolid } from "react-icons/lia";
import EditCarosal from "./EditCarosal";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import BeatLoader from "react-spinners/BeatLoader";
import { useDispatch, useSelector } from "react-redux";
import { setAlltask } from "../redux/state-slice/allTask-slice";
import { getUserDetails } from "../Helper/SessionHelper";

const CreateTask = () => {
  const [load, setLoaded] = useState(false);
  const [isCarouselVisible, setCarouselVisible] = useState(false);
  const [isUpadateCarousel, setUpadateCarousel] = useState(false);

  const getTasks = useSelector((state) => state.getAllTask.alltask);
  const dispatch = useDispatch();

  // create task carousel
  const showCarousel = () => {
    setCarouselVisible(true);
  };

  const hideCarousel = () => {
    setCarouselVisible(false);
  };

  // update Task carousel
  // store Task Id
  const [taskId, setTaskId] = useState("");

  const showUpdate = (id) => {
    setTaskId(id);
    setUpadateCarousel(true);
  };

  const hideUpdate = () => {
    setUpadateCarousel(false);
  };
  // user details form localstorage
  const userDetails = getUserDetails();
  // get all task
  useEffect(() => {
    (async () => {
      setLoaded(true);
      let result = await getAllTaskRequest(userDetails?._id, userDetails?._id);
      setLoaded(false);
      dispatch(setAlltask(result));
    })();
  }, [dispatch, userDetails?._id]);

  // when create task... updated data without reload
  const handleTaskCreated = (newTask) => {
    dispatch(setAlltask([newTask, ...getTasks]));
  };

  // delete Task
  const DeleteTaskHandler = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        const isDelete = await DeleteTaskRequest(id);
        if (isDelete) {
          const updatedTask = getTasks.filter((task) => task._id !== id);
          dispatch(setAlltask(updatedTask));
        }
      }
    });
  };


  return (
    <>
      <div className="">
        <div className="row g-0">
          <div className="col-lg-12">
            <Header />
          </div>
        </div>
        <div className="row g-0">
          <div className="col-lg-2 bg-white">
            <LeftSideHome />
          </div>
          <div className="col-lg-10">
            <div className="row g-0 justify-content-between">
              <div className="col-lg-8 taskText">
                <p>🔥 Task</p>
              </div>
              {
                userDetails?.role === "admin" && (
                  <div
                    className={`col-lg-4 createTask`}
                  >
                    <button onClick={showCarousel}>
                      Create Task
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect width="24" height="24" rx="7" fill="#E8EAFF" />
                        <rect x="11" y="7" width="2" height="10" fill="#6772FE" />
                        <rect
                          x="7"
                          y="13"
                          width="2"
                          height="10"
                          transform="rotate(-90 7 13)"
                          fill="#6772FE"
                        />
                      </svg>
                    </button>
                  </div>
                )
              }
            </div>
            {load ? (
              <div className="loader-container">
                <BeatLoader
                  color="#0866FF"
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : (
              <div className="row g-0">
                <div className="getTask d-flex pb-2">
                  <div className="card-container">
                    {getTasks && getTasks.length > 0 ? (
                      getTasks &&
                      getTasks.map((item, i) => {
                        return (
                          <div key={i} className="task-card">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <div className="tag-wrapper d-flex align-items-center gap-2">
                                {/* Status Tags */}
                                {item?.status === "Pending" && (
                                  <div className="tag status-todo">Pending</div>
                                )}
                                {item?.status === "In Progress" && (
                                  <div className="tag status-in-progress">
                                    In Progress
                                  </div>
                                )}
                                {item?.status === "Completed" && (
                                  <div className="tag status-completed">
                                    Completed
                                  </div>
                                )}

                                {/* Priority Tags */}
                                {item?.priority === "Low" && (
                                  <div className="tag priority-low">Low</div>
                                )}
                                {item?.priority === "Medium" && (
                                  <div className="tag priority-medium">
                                    Medium
                                  </div>
                                )}
                                {item?.priority === "High" && (
                                  <div className="tag priority-high">High</div>
                                )}
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="task-assignee pt-0">
                                  <small>Created by : </small>
                                  {item?.createdBy && (
                                    <img
                                      src={item?.createdBy[0]?.photo}
                                      alt="Creator"
                                      className="assignee-photo m-0"
                                    />
                                  )}
                                </div>
                              </div>
                            </div>

                            <h3 className="task-title">{item?.title}</h3>
                            <p className="task-description">
                              {item?.description}
                            </p>
                            <div className="d-flex justify-content-between items-center">
                              <div>
                                <div className="pb-1">
                                  <small>Start Date</small>
                                </div>
                                <div className="task-date d-flex align-items-center gap-2 text-muted small mb-3">
                                  <FaRegCalendarAlt />
                                  <span>
                                    {item?.createdDate
                                      ? new Date(
                                        item.createdDate
                                      ).toLocaleDateString()
                                      : "No start date"}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <div className="pb-1">
                                  <small>End Date</small>
                                </div>
                                <div className="task-date d-flex align-items-center gap-2 text-muted small mb-3">
                                  <FaRegCalendarAlt />
                                  <span>
                                    {item?.dueDate
                                      ? new Date(
                                        item.dueDate
                                      ).toLocaleDateString()
                                      : "No start date"}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="task-assignee pt-0">
                                {item?.assignTo &&
                                  item?.assignTo.map((item, i) => {
                                    return (
                                      <img
                                        key={i}
                                        src={item?.photo}
                                        alt="Assignee"
                                        className="assignee-photo"
                                      />
                                    );
                                  })}
                              </div>
                            </div>
                            <div className="task-complete-status d-flex flex-column mt-2 gap-2">
                              <div className="d-flex align-items-center gap-2">
                                <span className="status-text">
                                  <span>Task done : </span>
                                  {item?.todoCheckList?.filter(
                                    (subtask) => subtask.completed
                                  ).length || 0}
                                  /{item?.todoCheckList?.length || 0}
                                </span>
                              </div>

                              {/* Progress Bar */}
                              <div className="progress-container custom-progress-bar">
                                <div
                                  className="progress-fill"
                                  style={{
                                    width: `${item?.todoCheckList?.length
                                      ? (item?.todoCheckList?.filter(
                                        (s) => s.completed
                                      ).length /
                                        item?.todoCheckList?.length) *
                                      100
                                      : 0
                                      }%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center pt-3">
                              <div className="attachment d-flex align-items-center gap-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="12"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <path
                                    d="M4.01927 5.39016L2.45682 6.95262C2.26764 7.13519 2.015 7.23722 1.7521 7.23722C1.4892 7.23722 1.23655 7.13519 1.04738 6.95262C0.954603 6.86021 0.880985 6.75038 0.830753 6.62945C0.780521 6.50852 0.754663 6.37885 0.754663 6.2479C0.754663 6.11695 0.780521 5.98729 0.830753 5.86636C0.880985 5.74542 0.954603 5.6356 1.04738 5.54319L2.60984 3.98073C2.68567 3.9049 2.72827 3.80205 2.72827 3.69481C2.72827 3.58758 2.68567 3.48473 2.60984 3.4089C2.53401 3.33307 2.43116 3.29047 2.32393 3.29047C2.21669 3.29047 2.11384 3.33307 2.03801 3.4089L0.475555 4.97538C0.160791 5.318 -0.0094429 5.76896 0.000404603 6.23411C0.0102521 6.69926 0.199419 7.14262 0.528402 7.4716C0.857384 7.80058 1.30074 7.98975 1.76589 7.9996C2.23104 8.00944 2.682 7.83921 3.02462 7.52445L4.5911 5.96199C4.66693 5.88616 4.70953 5.78331 4.70953 5.67607C4.70953 5.56884 4.66693 5.46599 4.5911 5.39016C4.51527 5.31433 4.41242 5.27173 4.30519 5.27173C4.19795 5.27173 4.0951 5.31433 4.01927 5.39016ZM7.4744 0.525603C7.13564 0.188952 6.67745 0 6.19987 0C5.72228 0 5.26409 0.188952 4.92534 0.525603L3.35885 2.08806C3.32131 2.12561 3.29152 2.17018 3.2712 2.21924C3.25088 2.2683 3.24042 2.32087 3.24042 2.37397C3.24042 2.42707 3.25088 2.47965 3.2712 2.52871C3.29152 2.57777 3.32131 2.62234 3.35885 2.65989C3.3964 2.69743 3.44097 2.72722 3.49003 2.74754C3.53909 2.76786 3.59167 2.77832 3.64477 2.77832C3.69787 2.77832 3.75044 2.76786 3.7995 2.74754C3.84856 2.72722 3.89313 2.69743 3.93068 2.65989L5.49314 1.09743C5.68231 0.914858 5.93495 0.812828 6.19785 0.812828C6.46076 0.812828 6.7134 0.914858 6.90257 1.09743C6.99535 1.18984 7.06897 1.29967 7.1192 1.4206C7.16943 1.54153 7.19529 1.6712 7.19529 1.80215C7.19529 1.9331 7.16943 2.06276 7.1192 2.18369C7.06897 2.30463 6.99535 2.41445 6.90257 2.50686L5.34011 4.06932C5.30237 4.10676 5.27241 4.1513 5.25197 4.20037C5.23152 4.24944 5.221 4.30207 5.221 4.35523C5.221 4.40839 5.23152 4.46103 5.25197 4.5101C5.27241 4.55917 5.30237 4.60371 5.34011 4.64115C5.37755 4.67889 5.42209 4.70885 5.47116 4.72929C5.52023 4.74974 5.57287 4.76026 5.62603 4.76026C5.67919 4.76026 5.73182 4.74974 5.78089 4.72929C5.82997 4.70885 5.8745 4.67889 5.91194 4.64115L7.4744 3.07466C7.81105 2.73591 8 2.27772 8 1.80013C8 1.32255 7.81105 0.864358 7.4744 0.525603ZM2.69843 5.30157C2.73606 5.33889 2.78069 5.36842 2.82975 5.38846C2.87881 5.4085 2.93135 5.41866 2.98435 5.41835C3.03734 5.41866 3.08988 5.4085 3.13894 5.38846C3.18801 5.36842 3.23263 5.33889 3.27026 5.30157L5.25152 3.32031C5.32735 3.24448 5.36995 3.14163 5.36995 3.03439C5.36995 2.92716 5.32735 2.82431 5.25152 2.74848C5.17569 2.67265 5.07284 2.63005 4.96561 2.63005C4.85837 2.63005 4.75552 2.67265 4.67969 2.74848L2.69843 4.72974C2.66069 4.76718 2.63073 4.81172 2.61029 4.86079C2.58984 4.90986 2.57932 4.96249 2.57932 5.01565C2.57932 5.06881 2.58984 5.12145 2.61029 5.17052C2.63073 5.21959 2.66069 5.26413 2.69843 5.30157Z"
                                    fill="#768396"
                                  />
                                </svg>
                                <span>{item?.attachments?.length} file</span>
                              </div>
                              <div
                                className={`d-flex align-items-center gap-2`}>
                                {
                                  userDetails?.role === "admin" && (
                                    <AiOutlineDelete
                                      onClick={() => DeleteTaskHandler(item?._id)}
                                      style={{
                                        color: "#768396",
                                        width: "18px",
                                        height: "18px",
                                        cursor: "pointer",
                                      }}
                                    />
                                  )
                                }
                                <LiaEditSolid
                                  onClick={() => showUpdate(item._id)}
                                  style={{
                                    color: "#768396",
                                    width: "18px",
                                    height: "18px",
                                    cursor: "pointer",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="no-data-found">No Task Found</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isCarouselVisible && (
        <Carousel props={hideCarousel} onTaskCreated={handleTaskCreated} />
      )}
      {isUpadateCarousel && <EditCarosal props={{ hideUpdate, taskId }} />}
    </>
  );
};

export default CreateTask;
