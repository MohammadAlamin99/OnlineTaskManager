import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInProgressRequest } from '../apiRequiest/apiRequiest';
import { setInProgress } from '../redux/state-slice/inProgressTask-slice';
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import moment from 'moment';
const InProgress = () => {
    const inDisPatch = useDispatch();
    const getInPro = useSelector((state)=>state.getInProgress.inProgress);

    useEffect(()=>{
        (async()=>{
            let result = await getInProgressRequest("In Progress");
            inDisPatch(setInProgress(result))
        })()
    },[0])
    return (
        <div>
            <div className="row">
                                {
                                    getInPro.length>0?(
                                        getInPro.map((item, i)=>{
                                            return(
                                                <div key={i} className="taxbox">
                                                <p>{item.priority} <MdKeyboardDoubleArrowUp /></p>
                                                <span>{item.title} </span>
                                                <h5>{item.description}</h5>
                                                <h4 style={{color:"rgb(255, 120, 0)", fontWeight:"600"}}>{item.status}</h4>
                                                <h4>Due Date : {moment(item.dueDate).format('ll')}</h4>
                                                <h4>Category : {item.category}</h4>
                                                {item.assignInfo.length > 0 ? (
                                                            item.assignInfo.map((assignee, index) => (
                                                                  <div className="assignArea d-flex">
                                                                      <img 
                                                                    key={index}
                                                                    className="assignPhoto" 
                                                                    style={{ width: "20px", height: "20px", borderRadius: "50%"}} 
                                                                    src={assignee.photo}  
                                                                /> 
                                                                <h6 style={{paddingLeft:"3px", fontSize:"13px", fontWeight:"400"}}>{assignee.firstName+" "+ assignee.lastName}</h6>     
                                                                  </div>
                                                            ))
                                                        ) : (
                                                            <span>No Assignee</span>
                                                        )}
                                            </div>
                                            )
                                        })
                                    ):("No Task Found")
                                 }
                        </div>
        </div>
    );
};

export default InProgress;