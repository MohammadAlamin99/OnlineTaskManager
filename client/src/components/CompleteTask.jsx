import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { getCompletedRequest } from "../apiRequiest/apiRequiest";
import { setComplete } from "../redux/state-slice/completeTask-slice";
import moment from "moment";
import BeatLoader from "react-spinners/BeatLoader";

const CompleteTask = () => {
  const [load, setLoaded] = useState(false);
  const comDispatch = useDispatch();
  const getComplete = useSelector((state) => state.getComplete.complete);
  useEffect(() => {
    (async () => {
      setLoaded(true);
      let result = await getCompletedRequest("Completed");
      setLoaded(false);
      comDispatch(setComplete(result));
    })();
  }, [0]);
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
      <div className="row">
        {getComplete.length > 0
          ? getComplete.map((item, i) => {
              return (
                <div key={i} className="taxbox">
                  <p>
                    {item.priority} <MdKeyboardDoubleArrowUp />
                  </p>
                  <span>{item.title} </span>
                  <h5>{item.description}</h5>
                  <h4 style={{ color: "#2ECD6E", fontWeight: "600" }}>
                    {item.status}
                  </h4>
                  <h4>Due Date : {moment(item.dueDate).format("ll")}</h4>
                  <h4>Category : {item.category}</h4>
                  {item.assignInfo.length > 0 ? (
                    item.assignInfo.map((assignee, index) => (
                      <div key={index} className="assignArea d-flex">
                        <img
                          className="assignPhoto"
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                          }}
                          src={assignee.photo}
                        />
                        <h6
                          style={{
                            paddingLeft: "3px",
                            fontSize: "13px",
                            fontWeight: "400",
                          }}
                        >
                          {assignee.firstName + " " + assignee.lastName}
                        </h6>
                      </div>
                    ))
                  ) : (
                    <span>No Assignee</span>
                  )}
                </div>
              );
            })
          : "No Task Found"}
      </div>
    </div>
  );
};

export default CompleteTask;
