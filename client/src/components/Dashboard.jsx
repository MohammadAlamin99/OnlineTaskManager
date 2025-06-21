import React, { useState } from "react";
import { useEffect } from "react";
import { totalTaskCountRequest } from "../apiRequiest/apiRequiest";
import { BarChart } from "@mui/x-charts/BarChart";
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
        color="#0866FF"
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  ) : (
    <div>
      <div className="row g-0 ps-3 pt-3">
        <div className="col-4 DashCommon">
          <p>
            <span>
              <RiTodoLine />
            </span>{" "}
            Total To Do
          </p>
          {todo.map((item, i) => {
            return <p key={i}>{item.total}</p>;
          })}
        </div>
        <div className="col-4 DashCommon">
          <p>
            <span>
              <FcProcess />
            </span>{" "}
            In Progress
          </p>
          {data.map((item, i) => {
            return <p key={i}>{item.total}</p>;
          })}
        </div>
        <div className="col-4 DashCommon">
          <p>
            <span>
              <IoCloudDoneSharp />
            </span>{" "}
            Complete
          </p>
          {com.map((item, i) => {
            return <p key={i}>{item.total}</p>;
          })}
        </div>
      </div>
      <div className="row g-0">
        <div className="col-lg-12">
          {/* <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: ["Total TODO", "Total In Progress", "Total Completed"],
              },
            ]}
            series={[
              {
                data: [
                  todo.length > 0 ? todo[0].total : 0,
                  data.length > 0 ? data[0].total : 0,
                  com.length > 0 ? com[0].total : 0,
                ],
              },
            ]}
            width={100}
            height={300}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
