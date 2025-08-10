import { useState } from "react";
import { useEffect } from "react";
import ApexCharts from "apexcharts";
import {
  getAllTaskRequest,
  getUsersRequest,
} from "../apiRequiest/apiRequiest";
import BeatLoader from "react-spinners/BeatLoader";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setMember } from "../redux/state-slice/member-slice";
import badge from "../assets/images/adminVarificationBadge.png";
import { getUserDetails } from "../Helper/SessionHelper";
import { setAlltask } from "../redux/state-slice/allTask-slice";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [load, setLoaded] = useState(false);
  const getAllmember = useSelector((state) => state.getAllMember.member);
  const getTasks = useSelector((state) => state.getAllTask.alltask);
  const dispatch = useDispatch();
  const memberDispatch = useDispatch();

  // Fetch users (members)
  useEffect(() => {
    (async () => {
      const result = await getUsersRequest();
      memberDispatch(setMember(result?.data));
    })();
  }, [memberDispatch]);

  // Fetch all tasks
  const userDetails = getUserDetails();
  useEffect(() => {
    (async () => {
      setLoaded(true);
      let result = await getAllTaskRequest(userDetails?._id, userDetails?._id);
      setLoaded(false);
      dispatch(setAlltask(result));
    })();
  }, [dispatch, userDetails?._id]);

  // Safety check: in case data not loaded yet
  if (!Array.isArray(getTasks)) return null;

  // Count by status
  const pendingCount = getTasks.filter((task) => task.status === "Pending").length;
  const inProgressCount = getTasks.filter((task) => task.status === "In Progress").length;
  const completedCount = getTasks.filter((task) => task.status === "Completed").length;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const chartEl = document.querySelector("#chart");
    if (!chartEl) return; // Avoid crash if chart div is missing

    const chart = new ApexCharts(chartEl, {
      series: [pendingCount || 0, inProgressCount || 0, completedCount || 0],
      chart: {
        width: 380,
        type: "pie",
      },
      colors: ["#5BBFFF", "#FC9858", "#0ACF83"],
      labels: ["Pending", "In Progress", "Completed"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    });

    chart.render();

    return () => {
      chart.destroy();
    };
  }, [pendingCount, inProgressCount, completedCount, getTasks]);

  // Recent 5 tasks sorted by latest createdAt
  const recentTasks = [...getTasks]
    .map((task) => {
      const timestamp = new Date(parseInt(task._id.substring(0, 8), 16) * 1000);
      return { ...task, createdAt: timestamp };
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return load ? (
    <div className="loader-container">
      <BeatLoader
        color="#5051F9"
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  ) : (
    <div>
      <div className="row g-0">
        <div className="card_wrapper d-flex align-items-center">
          <div className="card">
            <div className="card_top d-flex align-items-center">
              <div className="icon_box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                >
                  <circle cx="17" cy="17" r="17" fill="#F3F7FD" />
                  <path
                    d="M15 15.4H15.8C16.0122 15.4 16.2157 15.3157 16.3657 15.1657C16.5157 15.0157 16.6 14.8122 16.6 14.6C16.6 14.3878 16.5157 14.1843 16.3657 14.0343C16.2157 13.8843 16.0122 13.8 15.8 13.8H15C14.7878 13.8 14.5843 13.8843 14.4343 14.0343C14.2843 14.1843 14.2 14.3878 14.2 14.6C14.2 14.8122 14.2843 15.0157 14.4343 15.1657C14.5843 15.3157 14.7878 15.4 15 15.4ZM15 17C14.7878 17 14.5843 17.0843 14.4343 17.2343C14.2843 17.3843 14.2 17.5878 14.2 17.8C14.2 18.0122 14.2843 18.2157 14.4343 18.3657C14.5843 18.5157 14.7878 18.6 15 18.6H19.8C20.0122 18.6 20.2157 18.5157 20.3657 18.3657C20.5157 18.2157 20.6 18.0122 20.6 17.8C20.6 17.5878 20.5157 17.3843 20.3657 17.2343C20.2157 17.0843 20.0122 17 19.8 17H15ZM23.8 14.552C23.7917 14.4785 23.7756 14.4061 23.752 14.336V14.264C23.7135 14.1817 23.6622 14.1061 23.6 14.04L18.8 9.24C18.7339 9.17777 18.6583 9.12646 18.576 9.088C18.5521 9.08461 18.5279 9.08461 18.504 9.088C18.4227 9.04139 18.333 9.01148 18.24 9H13.4C12.7635 9 12.153 9.25286 11.7029 9.70294C11.2529 10.153 11 10.7635 11 11.4V22.6C11 23.2365 11.2529 23.847 11.7029 24.2971C12.153 24.7471 12.7635 25 13.4 25H21.4C22.0365 25 22.647 24.7471 23.0971 24.2971C23.5471 23.847 23.8 23.2365 23.8 22.6V14.6C23.8 14.6 23.8 14.6 23.8 14.552ZM19 11.728L21.072 13.8H19.8C19.5878 13.8 19.3843 13.7157 19.2343 13.5657C19.0843 13.4157 19 13.2122 19 13V11.728ZM22.2 22.6C22.2 22.8122 22.1157 23.0157 21.9657 23.1657C21.8157 23.3157 21.6122 23.4 21.4 23.4H13.4C13.1878 23.4 12.9843 23.3157 12.8343 23.1657C12.6843 23.0157 12.6 22.8122 12.6 22.6V11.4C12.6 11.1878 12.6843 10.9843 12.8343 10.8343C12.9843 10.6843 13.1878 10.6 13.4 10.6H17.4V13C17.4 13.6365 17.6529 14.247 18.1029 14.6971C18.553 15.1471 19.1635 15.4 19.8 15.4H22.2V22.6ZM19.8 20.2H15C14.7878 20.2 14.5843 20.2843 14.4343 20.4343C14.2843 20.5843 14.2 20.7878 14.2 21C14.2 21.2122 14.2843 21.4157 14.4343 21.5657C14.5843 21.7157 14.7878 21.8 15 21.8H19.8C20.0122 21.8 20.2157 21.7157 20.3657 21.5657C20.5157 21.4157 20.6 21.2122 20.6 21C20.6 20.7878 20.5157 20.5843 20.3657 20.4343C20.2157 20.2843 20.0122 20.2 19.8 20.2Z"
                    fill="#8D98A9"
                  />
                </svg>
              </div>
              <h4 className="card-title">Pending</h4>
              <div className="card-number ms-auto">
                {pendingCount < 10 ? `0${pendingCount}` : pendingCount}
              </div>
            </div>
            <div className="card_bottom d-flex justify-content-between align-items-center">
              <div className="icon__box w-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="133"
                  height="68"
                  viewBox="0 0 133 68"
                  fill="none"
                >
                  <g filter="url(#filter0_d_2_54)">
                    <path
                      d="M9 45.7573C9.43233 45.9655 10.2525 46.3237 15.2624 41.7925C21.5248 36.1285 27.2178 32.1638 33.4802 37.2613C39.7426 42.3589 43.7277 54.8196 51.698 51.4213C59.6683 48.0229 62.5149 22.535 72.1931 19.1367C81.8713 15.7383 88.1337 35.5622 94.9653 24.8006C101.797 14.0391 109.198 0.445683 114.322 2.14487C118.421 3.50422 122.482 9.13046 124 11.7737"
                      stroke="#5051F9"
                      strokeWidth="2"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_2_54"
                      x="0.565918"
                      y="-0.00146484"
                      width="132.301"
                      height="68.0015"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="7" />
                      <feGaussianBlur stdDeviation="4" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.313725 0 0 0 0 0.317647 0 0 0 0 0.976471 0 0 0 0.4 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2_54"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2_54"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className="text_content w-50">
                <h4 className="card_subtext">
                  <span>10+</span> more
                </h4>
                <h5 className="card_subtext">from last week</h5>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card_top d-flex align-items-center">
              <div className="icon_box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                >
                  <path
                    d="M16.8529 6.09774C16.7997 5.94356 16.7029 5.80814 16.5742 5.70789C16.4455 5.60765 16.2905 5.54689 16.128 5.53299L11.3318 4.83337L9.1824 0.475497C9.11338 0.332984 9.00561 0.212796 8.87144 0.128699C8.73727 0.0446028 8.58212 0 8.42378 0C8.26543 0 8.11029 0.0446028 7.97612 0.128699C7.84195 0.212796 7.73418 0.332984 7.66515 0.475497L5.51572 4.82494L0.719537 5.53299C0.563532 5.55516 0.416867 5.62062 0.296183 5.72193C0.1755 5.82325 0.0856315 5.95636 0.0367762 6.10617C-0.00794468 6.25256 -0.0119578 6.40837 0.0251674 6.55687C0.0622926 6.70537 0.139155 6.84096 0.247505 6.94908L3.72874 10.3207L2.88583 15.1085C2.85574 15.2665 2.87149 15.4299 2.93124 15.5792C2.99098 15.7286 3.09222 15.8577 3.22299 15.9514C3.35046 16.0425 3.5008 16.0963 3.65714 16.1068C3.81347 16.1172 3.96962 16.0838 4.10805 16.0104L8.42378 13.7598L12.7226 16.0188C12.8409 16.0856 12.9746 16.1204 13.1104 16.12C13.2889 16.1206 13.4631 16.0646 13.6077 15.9598C13.7385 15.8662 13.8397 15.737 13.8995 15.5877C13.9592 15.4383 13.975 15.275 13.9449 15.1169L13.102 10.3292L16.5832 6.95751C16.7049 6.85441 16.7948 6.71889 16.8426 6.56669C16.8903 6.4145 16.8939 6.25189 16.8529 6.09774ZM11.669 9.4694C11.5701 9.56501 11.4962 9.68336 11.4536 9.81413C11.411 9.94489 11.401 10.0841 11.4246 10.2196L12.0315 13.7514L8.86209 12.0656C8.74014 12.0006 8.60409 11.9667 8.46592 11.9667C8.32776 11.9667 8.19171 12.0006 8.06975 12.0656L4.90039 13.7514L5.50729 10.2196C5.53084 10.0841 5.52088 9.94489 5.47827 9.81413C5.43566 9.68336 5.3617 9.56501 5.26285 9.4694L2.7341 6.94065L6.28277 6.42648C6.41933 6.40748 6.54913 6.35528 6.66082 6.27446C6.77251 6.19363 6.86266 6.08664 6.92339 5.96287L8.42378 2.75137L10.0085 5.9713C10.0692 6.09507 10.1593 6.20206 10.271 6.28289C10.3827 6.36371 10.5125 6.41591 10.6491 6.4349L14.1977 6.94908L11.669 9.4694Z"
                    fill="#8D98A9"
                  />
                </svg>
              </div>
              <h4 className="card-title">In Progress</h4>
              <h2 className="card-number ms-auto">
                <div className="card-number ms-auto">
                  {inProgressCount < 10
                    ? `0${inProgressCount}`
                    : inProgressCount}
                </div>
              </h2>
            </div>
            <div className="card_bottom d-flex align-items-center">
              <div className="icon__box w-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="133"
                  height="68"
                  viewBox="0 0 133 68"
                  fill="none"
                >
                  <g filter="url(#filter0_d_2_65)">
                    <path
                      d="M9 45.7573C9.43233 45.9655 10.2525 46.3237 15.2624 41.7925C21.5248 36.1285 27.2178 32.1638 33.4802 37.2613C39.7426 42.3589 43.7277 54.8196 51.698 51.4213C59.6683 48.0229 62.5149 22.535 72.1931 19.1367C81.8713 15.7383 88.1337 35.5622 94.9653 24.8006C101.797 14.0391 109.198 0.445683 114.322 2.14487C118.421 3.50422 122.482 9.13046 124 11.7737"
                      stroke="#1EA7FF"
                      strokeWidth="2"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_2_65"
                      x="0.565918"
                      y="-0.00146484"
                      width="132.301"
                      height="68.0015"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="7" />
                      <feGaussianBlur stdDeviation="4" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.117647 0 0 0 0 0.654902 0 0 0 0 1 0 0 0 0.4 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2_65"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2_65"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className="text_content w-50">
                <h4 className="card_subtext">
                  <span>10+</span> more
                </h4>
                <h5 className="card_subtext">from last week</h5>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card_top d-flex align-items-center">
              <div className="icon_box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                >
                  <circle cx="17" cy="17" r="17" fill="#F3F7FD" />
                  <path
                    d="M19.8 18.6H15C14.7878 18.6 14.5843 18.6843 14.4343 18.8343C14.2843 18.9843 14.2 19.1878 14.2 19.4C14.2 19.6122 14.2843 19.8157 14.4343 19.9657C14.5843 20.1157 14.7878 20.2 15 20.2H19.8C20.0122 20.2 20.2157 20.1157 20.3657 19.9657C20.5157 19.8157 20.6 19.6122 20.6 19.4C20.6 19.1878 20.5157 18.9843 20.3657 18.8343C20.2157 18.6843 20.0122 18.6 19.8 18.6ZM19.8 15.4H16.6C16.3878 15.4 16.1843 15.4843 16.0343 15.6343C15.8843 15.7843 15.8 15.9878 15.8 16.2C15.8 16.4122 15.8843 16.6157 16.0343 16.7657C16.1843 16.9157 16.3878 17 16.6 17H19.8C20.0122 17 20.2157 16.9157 20.3657 16.7657C20.5157 16.6157 20.6 16.4122 20.6 16.2C20.6 15.9878 20.5157 15.7843 20.3657 15.6343C20.2157 15.4843 20.0122 15.4 19.8 15.4ZM21.4 10.6H20.456C20.2909 10.1332 19.9855 9.7288 19.5817 9.44235C19.1778 9.1559 18.6952 9.00139 18.2 9H16.6C16.1048 9.00139 15.6222 9.1559 15.2183 9.44235C14.8145 9.7288 14.5091 10.1332 14.344 10.6H13.4C12.7635 10.6 12.153 10.8529 11.7029 11.3029C11.2529 11.753 11 12.3635 11 13V22.6C11 23.2365 11.2529 23.847 11.7029 24.2971C12.153 24.7471 12.7635 25 13.4 25H21.4C22.0365 25 22.647 24.7471 23.0971 24.2971C23.5471 23.847 23.8 23.2365 23.8 22.6V13C23.8 12.3635 23.5471 11.753 23.0971 11.3029C22.647 10.8529 22.0365 10.6 21.4 10.6ZM15.8 11.4C15.8 11.1878 15.8843 10.9843 16.0343 10.8343C16.1843 10.6843 16.3878 10.6 16.6 10.6H18.2C18.4122 10.6 18.6157 10.6843 18.7657 10.8343C18.9157 10.9843 19 11.1878 19 11.4V12.2H15.8V11.4ZM22.2 22.6C22.2 22.8122 22.1157 23.0157 21.9657 23.1657C21.8157 23.3157 21.6122 23.4 21.4 23.4H13.4C13.1878 23.4 12.9843 23.3157 12.8343 23.1657C12.6843 23.0157 12.6 22.8122 12.6 22.6V13C12.6 12.7878 12.6843 12.5843 12.8343 12.4343C12.9843 12.2843 13.1878 12.2 13.4 12.2H14.2V13C14.2 13.2122 14.2843 13.4157 14.4343 13.5657C14.5843 13.7157 14.7878 13.8 15 13.8H19.8C20.0122 13.8 20.2157 13.7157 20.3657 13.5657C20.5157 13.4157 20.6 13.2122 20.6 13V12.2H21.4C21.6122 12.2 21.8157 12.2843 21.9657 12.4343C22.1157 12.5843 22.2 12.7878 22.2 13V22.6Z"
                    fill="#8D98A9"
                  />
                </svg>
              </div>
              <h4 className="card-title">Task Completed</h4>
              <h2 className="card-number ms-auto">
                <div className="card-number ms-auto">
                  {completedCount < 10 ? `0${completedCount}` : completedCount}
                </div>
              </h2>
            </div>
            <div className="card_bottom d-flex justify-content-between align-items-center">
              <div className="icon__box w-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="133"
                  height="68"
                  viewBox="0 0 133 68"
                  fill="none"
                >
                  <g filter="url(#filter0_d_2_76)">
                    <path
                      d="M9 45.7573C9.43233 45.9655 10.2525 46.3237 15.2624 41.7925C21.5248 36.1285 27.2178 32.1638 33.4802 37.2613C39.7426 42.3589 43.7277 54.8196 51.698 51.4213C59.6683 48.0229 62.5149 22.535 72.1931 19.1367C81.8713 15.7383 88.1337 35.5622 94.9653 24.8006C101.797 14.0391 109.198 0.445683 114.322 2.14487C118.421 3.50422 122.482 9.13046 124 11.7737"
                      stroke="#FF614C"
                      strokeWidth="2"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_2_76"
                      x="0.565918"
                      y="-0.00146484"
                      width="132.301"
                      height="68.0015"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="7" />
                      <feGaussianBlur stdDeviation="4" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 0.380392 0 0 0 0 0.298039 0 0 0 0.4 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2_76"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2_76"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className="text_content w-50">
                <h4 className="card_subtext">
                  <span>10+</span> more
                </h4>
                <h5 className="card_subtext">from last week</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-0">
        <div className="custom_container">
          <div className="chart_wrapper">
            <div id="chart"></div>
          </div>
          <div className="team_member">
            <h2 className="team_title">Member</h2>

            {getAllmember?.length > 0 ? (
              getAllmember.map((member, index) => {
                return (
                  <div
                    className="user d-flex align-items-center gap-3 mb-3"
                    key={index}
                  >
                    <img src={member?.photo} alt="" className="user_img" />
                    <div className="user_text">
                      <div className="d-flex align-items-center gap-1">
                        <h4 className="member_name m-0">{member?.name}</h4>
                        {member?.role === "admin" && (
                          <img
                            width={15}
                            height={15}
                            src={badge}
                            alt=""
                          />
                        )}
                      </div>
                      <p className="member_email m-0">{member?.email}</p>
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
      <div className="row g-0">
        <div className="recent-task-wrapper">
          <div className="recent-top d-flex justify-content-between align-items-center">
            <h2 className="recent-title">Recent Tasks</h2>
            <Link to="/task">
              <button>
                See All
                <IoIosArrowRoundForward />
              </button>
            </Link>
          </div>
          <table className="recent-table">
            <thead>
              <tr className="recent-table-header">
                <th>Name</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Created On</th>
              </tr>
            </thead>
            <tbody>
              {recentTasks &&
                recentTasks.map((task) => (
                  <tr className="recent-table-body" key={task._id}>
                    <td>{task.title}</td>
                    <td>{task.status}</td>
                    <td>{task.priority} priority</td>
                    <td>
                      {new Date(task.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
