import React, { useState } from "react";
import { useEffect } from "react";
import { totalTaskCountRequest } from "../apiRequiest/apiRequiest";
import { RiTodoLine } from "react-icons/ri";
import { FcProcess } from "react-icons/fc";
import { IoCloudDoneSharp } from "react-icons/io5";
import BeatLoader from "react-spinners/BeatLoader";

const Dashboard = () => {
  const [load, setLoaded] = useState(false);
  const [data, setData] = useState([]);
  const status = "In Progress";
  useEffect(() => {
    (async () => {
      setLoaded(true);
      let result = await totalTaskCountRequest(status);
      console.log(result);
      setLoaded(false);
      setData(result);
    })();
  }, []);
  const [todo, setTodo] = useState([]);
  const totdo = "TODO";
  useEffect(() => {
    (async () => {
      setLoaded(true);
      let result = await totalTaskCountRequest(totdo);
      setLoaded(false);
      setTodo(result);
    })();
  }, []);
  const [com, setCom] = useState([]);
  const complete = "Completed";
  useEffect(() => {
    (async () => {
      setLoaded(true);
      let result = await totalTaskCountRequest(complete);
      setLoaded(false);
      setCom(result);
    })();
  }, []);

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
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <path d="M16.8529 6.09774C16.7997 5.94356 16.7029 5.80814 16.5742 5.70789C16.4455 5.60765 16.2905 5.54689 16.128 5.53299L11.3318 4.83337L9.1824 0.475497C9.11338 0.332984 9.00561 0.212796 8.87144 0.128699C8.73727 0.0446028 8.58212 0 8.42378 0C8.26543 0 8.11029 0.0446028 7.97612 0.128699C7.84195 0.212796 7.73418 0.332984 7.66515 0.475497L5.51572 4.82494L0.719537 5.53299C0.563532 5.55516 0.416867 5.62062 0.296183 5.72193C0.1755 5.82325 0.0856315 5.95636 0.0367762 6.10617C-0.00794468 6.25256 -0.0119578 6.40837 0.0251674 6.55687C0.0622926 6.70537 0.139155 6.84096 0.247505 6.94908L3.72874 10.3207L2.88583 15.1085C2.85574 15.2665 2.87149 15.4299 2.93124 15.5792C2.99098 15.7286 3.09222 15.8577 3.22299 15.9514C3.35046 16.0425 3.5008 16.0963 3.65714 16.1068C3.81347 16.1172 3.96962 16.0838 4.10805 16.0104L8.42378 13.7598L12.7226 16.0188C12.8409 16.0856 12.9746 16.1204 13.1104 16.12C13.2889 16.1206 13.4631 16.0646 13.6077 15.9598C13.7385 15.8662 13.8397 15.737 13.8995 15.5877C13.9592 15.4383 13.975 15.275 13.9449 15.1169L13.102 10.3292L16.5832 6.95751C16.7049 6.85441 16.7948 6.71889 16.8426 6.56669C16.8903 6.4145 16.8939 6.25189 16.8529 6.09774ZM11.669 9.4694C11.5701 9.56501 11.4962 9.68336 11.4536 9.81413C11.411 9.94489 11.401 10.0841 11.4246 10.2196L12.0315 13.7514L8.86209 12.0656C8.74014 12.0006 8.60409 11.9667 8.46592 11.9667C8.32776 11.9667 8.19171 12.0006 8.06975 12.0656L4.90039 13.7514L5.50729 10.2196C5.53084 10.0841 5.52088 9.94489 5.47827 9.81413C5.43566 9.68336 5.3617 9.56501 5.26285 9.4694L2.7341 6.94065L6.28277 6.42648C6.41933 6.40748 6.54913 6.35528 6.66082 6.27446C6.77251 6.19363 6.86266 6.08664 6.92339 5.96287L8.42378 2.75137L10.0085 5.9713C10.0692 6.09507 10.1593 6.20206 10.271 6.28289C10.3827 6.36371 10.5125 6.41591 10.6491 6.4349L14.1977 6.94908L11.669 9.4694Z" fill="#8D98A9" />
                </svg>
              </div>
              <h4 className="card-title">Total To Do</h4>
              <div className="card-number ms-auto">
                {todo?.map((item, i) => {
                  return <p className="m-0" key={i}>{item.total}</p>;
                })}
              </div>
            </div>
            <div className="card_bottom d-flex justify-content-between align-items-center">
              <div className="icon__box w-50">
                <svg xmlns="http://www.w3.org/2000/svg" width="133" height="68" viewBox="0 0 133 68" fill="none">
                  <g filter="url(#filter0_d_2_54)">
                    <path d="M9 45.7573C9.43233 45.9655 10.2525 46.3237 15.2624 41.7925C21.5248 36.1285 27.2178 32.1638 33.4802 37.2613C39.7426 42.3589 43.7277 54.8196 51.698 51.4213C59.6683 48.0229 62.5149 22.535 72.1931 19.1367C81.8713 15.7383 88.1337 35.5622 94.9653 24.8006C101.797 14.0391 109.198 0.445683 114.322 2.14487C118.421 3.50422 122.482 9.13046 124 11.7737" stroke="#5051F9" stroke-width="2" />
                  </g>
                  <defs>
                    <filter id="filter0_d_2_54" x="0.565918" y="-0.00146484" width="132.301" height="68.0015" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dy="7" />
                      <feGaussianBlur stdDeviation="4" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0.313725 0 0 0 0 0.317647 0 0 0 0 0.976471 0 0 0 0.4 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_54" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_54" result="shape" />
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className="text_content w-50">
                <h4 className="card_subtext"><span>10+</span> more</h4>
                <h5 className="card_subtext">from last week</h5>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card_top d-flex align-items-center">
              <div className="icon_box">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <path d="M16.8529 6.09774C16.7997 5.94356 16.7029 5.80814 16.5742 5.70789C16.4455 5.60765 16.2905 5.54689 16.128 5.53299L11.3318 4.83337L9.1824 0.475497C9.11338 0.332984 9.00561 0.212796 8.87144 0.128699C8.73727 0.0446028 8.58212 0 8.42378 0C8.26543 0 8.11029 0.0446028 7.97612 0.128699C7.84195 0.212796 7.73418 0.332984 7.66515 0.475497L5.51572 4.82494L0.719537 5.53299C0.563532 5.55516 0.416867 5.62062 0.296183 5.72193C0.1755 5.82325 0.0856315 5.95636 0.0367762 6.10617C-0.00794468 6.25256 -0.0119578 6.40837 0.0251674 6.55687C0.0622926 6.70537 0.139155 6.84096 0.247505 6.94908L3.72874 10.3207L2.88583 15.1085C2.85574 15.2665 2.87149 15.4299 2.93124 15.5792C2.99098 15.7286 3.09222 15.8577 3.22299 15.9514C3.35046 16.0425 3.5008 16.0963 3.65714 16.1068C3.81347 16.1172 3.96962 16.0838 4.10805 16.0104L8.42378 13.7598L12.7226 16.0188C12.8409 16.0856 12.9746 16.1204 13.1104 16.12C13.2889 16.1206 13.4631 16.0646 13.6077 15.9598C13.7385 15.8662 13.8397 15.737 13.8995 15.5877C13.9592 15.4383 13.975 15.275 13.9449 15.1169L13.102 10.3292L16.5832 6.95751C16.7049 6.85441 16.7948 6.71889 16.8426 6.56669C16.8903 6.4145 16.8939 6.25189 16.8529 6.09774ZM11.669 9.4694C11.5701 9.56501 11.4962 9.68336 11.4536 9.81413C11.411 9.94489 11.401 10.0841 11.4246 10.2196L12.0315 13.7514L8.86209 12.0656C8.74014 12.0006 8.60409 11.9667 8.46592 11.9667C8.32776 11.9667 8.19171 12.0006 8.06975 12.0656L4.90039 13.7514L5.50729 10.2196C5.53084 10.0841 5.52088 9.94489 5.47827 9.81413C5.43566 9.68336 5.3617 9.56501 5.26285 9.4694L2.7341 6.94065L6.28277 6.42648C6.41933 6.40748 6.54913 6.35528 6.66082 6.27446C6.77251 6.19363 6.86266 6.08664 6.92339 5.96287L8.42378 2.75137L10.0085 5.9713C10.0692 6.09507 10.1593 6.20206 10.271 6.28289C10.3827 6.36371 10.5125 6.41591 10.6491 6.4349L14.1977 6.94908L11.669 9.4694Z" fill="#8D98A9" />
                </svg>
              </div>
              <h4 className="card-title">In Progress</h4>
              <h2 className="card-number ms-auto">
                <div className="card-number ms-auto">
                  {data?.map((item, i) => {
                    return <p className="m-0" key={i}>{item.total}</p>;
                  })}
                </div>
              </h2>
            </div>
            <div className="card_bottom d-flex align-items-center">
              <div className="icon__box w-50">
                <svg xmlns="http://www.w3.org/2000/svg" width="133" height="68" viewBox="0 0 133 68" fill="none">
                  <g filter="url(#filter0_d_2_65)">
                    <path d="M9 45.7573C9.43233 45.9655 10.2525 46.3237 15.2624 41.7925C21.5248 36.1285 27.2178 32.1638 33.4802 37.2613C39.7426 42.3589 43.7277 54.8196 51.698 51.4213C59.6683 48.0229 62.5149 22.535 72.1931 19.1367C81.8713 15.7383 88.1337 35.5622 94.9653 24.8006C101.797 14.0391 109.198 0.445683 114.322 2.14487C118.421 3.50422 122.482 9.13046 124 11.7737" stroke="#1EA7FF" stroke-width="2" />
                  </g>
                  <defs>
                    <filter id="filter0_d_2_65" x="0.565918" y="-0.00146484" width="132.301" height="68.0015" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dy="7" />
                      <feGaussianBlur stdDeviation="4" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0.117647 0 0 0 0 0.654902 0 0 0 0 1 0 0 0 0.4 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_65" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_65" result="shape" />
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className="text_content w-50">
                <h4 className="card_subtext"><span>10+</span> more</h4>
                <h5 className="card_subtext">from last week</h5>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card_top d-flex align-items-center">
              <div className="icon_box">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <path d="M16.8529 6.09774C16.7997 5.94356 16.7029 5.80814 16.5742 5.70789C16.4455 5.60765 16.2905 5.54689 16.128 5.53299L11.3318 4.83337L9.1824 0.475497C9.11338 0.332984 9.00561 0.212796 8.87144 0.128699C8.73727 0.0446028 8.58212 0 8.42378 0C8.26543 0 8.11029 0.0446028 7.97612 0.128699C7.84195 0.212796 7.73418 0.332984 7.66515 0.475497L5.51572 4.82494L0.719537 5.53299C0.563532 5.55516 0.416867 5.62062 0.296183 5.72193C0.1755 5.82325 0.0856315 5.95636 0.0367762 6.10617C-0.00794468 6.25256 -0.0119578 6.40837 0.0251674 6.55687C0.0622926 6.70537 0.139155 6.84096 0.247505 6.94908L3.72874 10.3207L2.88583 15.1085C2.85574 15.2665 2.87149 15.4299 2.93124 15.5792C2.99098 15.7286 3.09222 15.8577 3.22299 15.9514C3.35046 16.0425 3.5008 16.0963 3.65714 16.1068C3.81347 16.1172 3.96962 16.0838 4.10805 16.0104L8.42378 13.7598L12.7226 16.0188C12.8409 16.0856 12.9746 16.1204 13.1104 16.12C13.2889 16.1206 13.4631 16.0646 13.6077 15.9598C13.7385 15.8662 13.8397 15.737 13.8995 15.5877C13.9592 15.4383 13.975 15.275 13.9449 15.1169L13.102 10.3292L16.5832 6.95751C16.7049 6.85441 16.7948 6.71889 16.8426 6.56669C16.8903 6.4145 16.8939 6.25189 16.8529 6.09774ZM11.669 9.4694C11.5701 9.56501 11.4962 9.68336 11.4536 9.81413C11.411 9.94489 11.401 10.0841 11.4246 10.2196L12.0315 13.7514L8.86209 12.0656C8.74014 12.0006 8.60409 11.9667 8.46592 11.9667C8.32776 11.9667 8.19171 12.0006 8.06975 12.0656L4.90039 13.7514L5.50729 10.2196C5.53084 10.0841 5.52088 9.94489 5.47827 9.81413C5.43566 9.68336 5.3617 9.56501 5.26285 9.4694L2.7341 6.94065L6.28277 6.42648C6.41933 6.40748 6.54913 6.35528 6.66082 6.27446C6.77251 6.19363 6.86266 6.08664 6.92339 5.96287L8.42378 2.75137L10.0085 5.9713C10.0692 6.09507 10.1593 6.20206 10.271 6.28289C10.3827 6.36371 10.5125 6.41591 10.6491 6.4349L14.1977 6.94908L11.669 9.4694Z" fill="#8D98A9" />
                </svg>
              </div>
              <h4 className="card-title">Task Completed</h4>
              <h2 className="card-number ms-auto">
                <div className="card-number ms-auto">
                  {com?.map((item, i) => {
                    return <p className="m-0" key={i}>{item.total}</p>;
                  })}
                </div>
              </h2>
            </div>
            <div className="card_bottom d-flex justify-content-between align-items-center">
              <div className="icon__box w-50">
                <svg xmlns="http://www.w3.org/2000/svg" width="133" height="68" viewBox="0 0 133 68" fill="none">
                  <g filter="url(#filter0_d_2_76)">
                    <path d="M9 45.7573C9.43233 45.9655 10.2525 46.3237 15.2624 41.7925C21.5248 36.1285 27.2178 32.1638 33.4802 37.2613C39.7426 42.3589 43.7277 54.8196 51.698 51.4213C59.6683 48.0229 62.5149 22.535 72.1931 19.1367C81.8713 15.7383 88.1337 35.5622 94.9653 24.8006C101.797 14.0391 109.198 0.445683 114.322 2.14487C118.421 3.50422 122.482 9.13046 124 11.7737" stroke="#FF614C" stroke-width="2" />
                  </g>
                  <defs>
                    <filter id="filter0_d_2_76" x="0.565918" y="-0.00146484" width="132.301" height="68.0015" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dy="7" />
                      <feGaussianBlur stdDeviation="4" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.380392 0 0 0 0 0.298039 0 0 0 0.4 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_76" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_76" result="shape" />
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className="text_content w-50">
                <h4 className="card_subtext"><span>10+</span> more</h4>
                <h5 className="card_subtext">from last week</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
