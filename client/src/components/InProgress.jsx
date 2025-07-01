import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInProgressRequest,
  DeleteTaskRequest,
} from "../apiRequiest/apiRequiest";
import { setInProgress } from "../redux/state-slice/inProgressTask-slice";
import BeatLoader from "react-spinners/BeatLoader";
import { AiOutlineDelete } from "react-icons/ai";
import { LiaEditSolid } from "react-icons/lia";
import Swal from "sweetalert2";
import EditCarosal from "./EditCarosal";

const InProgress = () => {
  const [load, setLoaded] = useState(false);
  const [isCarouselVisible, setCarouselVisible] = useState(false);
  const [isUpadateCarousel, setUpadateCarousel] = useState(false);
  const inDisPatch = useDispatch();
  const getInPro = useSelector((state) => state.getInProgress.inProgress);

  useEffect(() => {
    (async () => {
      setLoaded(true);
      let result = await getInProgressRequest("In Progress");
      setLoaded(false);
      inDisPatch(setInProgress(result));
    })();
  }, [0]);

  // loader css

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

  const handleUpdateTask = (newTask) => {
    inDisPatch(
      setInProgress(
        getInPro.map((task) => (task._id === newTask._id ? newTask : task))
      )
    );
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
          const updatedTask = getInPro.filter((task) => task._id !== id);
          inDisPatch(setInProgress(updatedTask));
        }
      }
    });
  };
  return load ? (
    <div className="loader-container">
      <BeatLoader
        color="#0866FF"
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  ) : (
    <div>
      <div className="row g-0">
        <div className="taskText">
          <p>🕘 In Progress</p>
        </div>
        <div className="getTask d-flex pb-2">
          <div className="card-container">
            {getInPro && getInPro.length > 0 ? (
              getInPro &&
              getInPro.map((item, i) => {
                return (
                  <div key={i} className="task-card">
                    <div className="tag-wrapper d-flex align-items-center gap-2">
                      {/* Status Tags */}
                      {item?.status === "TODO" && (
                        <div className="tag status-todo">ToDo</div>
                      )}
                      {item?.status === "In Progress" && (
                        <div className="tag status-in-progress">
                          In Progress
                        </div>
                      )}
                      {item?.status === "Completed" && (
                        <div className="tag status-completed">Completed</div>
                      )}

                      {/* Priority Tags */}
                      {item?.priority === "Low" && (
                        <div className="tag priority-low">Low</div>
                      )}
                      {item?.priority === "Medium" && (
                        <div className="tag priority-medium">Medium</div>
                      )}
                      {item?.priority === "High" && (
                        <div className="tag priority-high">High</div>
                      )}
                    </div>

                    <h3 className="task-title">{item?.title}</h3>
                    <p className="task-description">{item?.description}</p>
                    <h5 className="task-date">
                      {item?.dueDate
                        ? new Date(item.dueDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "No Due Date"}
                    </h5>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="task-assignee">
                        {item?.assignInfo &&
                          item?.assignInfo.map((item, i) => {
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
                      <div className="task-complete-status d-flex align-items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="17"
                          viewBox="0 0 17 17"
                          fill="none"
                        >
                          <path
                            d="M10.812 5.7715L7.1655 9.4265L5.763 8.024C5.6868 7.93502 5.59303 7.86275 5.48758 7.81173C5.38212 7.76071 5.26726 7.73204 5.1502 7.72752C5.03314 7.723 4.9164 7.74272 4.80733 7.78546C4.69825 7.82819 4.59919 7.89301 4.51635 7.97584C4.43351 8.05868 4.36869 8.15775 4.32596 8.26682C4.28323 8.3759 4.2635 8.49263 4.26802 8.60969C4.27255 8.72675 4.30122 8.84162 4.35224 8.94707C4.40326 9.05253 4.47552 9.1463 4.5645 9.2225L6.562 11.2285C6.64143 11.3073 6.73562 11.3696 6.83918 11.4119C6.94274 11.4542 7.05364 11.4756 7.1655 11.475C7.38849 11.4741 7.60218 11.3855 7.7605 11.2285L12.0105 6.9785C12.0902 6.89948 12.1534 6.80547 12.1966 6.70189C12.2397 6.59831 12.2619 6.48721 12.2619 6.375C12.2619 6.26279 12.2397 6.15169 12.1966 6.04811C12.1534 5.94453 12.0902 5.85052 12.0105 5.7715C11.8512 5.61319 11.6358 5.52432 11.4113 5.52432C11.1867 5.52432 10.9713 5.61319 10.812 5.7715ZM8.5 0C6.81886 0 5.17547 0.498516 3.77766 1.43251C2.37984 2.3665 1.29037 3.69402 0.647028 5.24719C0.00368291 6.80036 -0.164645 8.50943 0.163329 10.1583C0.491303 11.8071 1.30085 13.3217 2.4896 14.5104C3.67834 15.6992 5.1929 16.5087 6.84173 16.8367C8.49057 17.1646 10.1996 16.9963 11.7528 16.353C13.306 15.7096 14.6335 14.6202 15.5675 13.2223C16.5015 11.8245 17 10.1811 17 8.5C17 7.38376 16.7801 6.27846 16.353 5.24719C15.9258 4.21592 15.2997 3.27889 14.5104 2.48959C13.7211 1.70029 12.7841 1.07419 11.7528 0.647024C10.7215 0.219859 9.61624 0 8.5 0ZM8.5 15.3C7.15509 15.3 5.84038 14.9012 4.72212 14.154C3.60387 13.4068 2.7323 12.3448 2.21762 11.1022C1.70295 9.85971 1.56828 8.49245 1.83066 7.17338C2.09304 5.85431 2.74068 4.64267 3.69168 3.69167C4.64267 2.74068 5.85432 2.09304 7.17339 1.83066C8.49246 1.56828 9.85971 1.70294 11.1022 2.21762C12.3448 2.73229 13.4068 3.60387 14.154 4.72212C14.9012 5.84037 15.3 7.15509 15.3 8.5C15.3 10.3035 14.5836 12.0331 13.3083 13.3083C12.0331 14.5836 10.3035 15.3 8.5 15.3Z"
                            fill="#768396"
                          />
                        </svg>
                        <span className="status-text">0/8</span>
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
                        <span>11 file</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <AiOutlineDelete
                          onClick={() => DeleteTaskHandler(item?._id)}
                          style={{
                            color: "#768396",
                            width: "18px",
                            height: "18px",
                            cursor: "pointer",
                          }}
                        />
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
      {isCarouselVisible && <Carousel props={hideCarousel} />}
      {isUpadateCarousel && (
        <EditCarosal
          props={{ hideUpdate, taskId }}
          updateTask={handleUpdateTask}
        />
      )}
    </div>
  );
};

export default InProgress;
