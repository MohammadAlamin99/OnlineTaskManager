import React, { useEffect, useState } from 'react';
import Header from './Dashboard/Header';
import LeftSideHome from './Dashboard/LeftSideHome';
import Carousel from './Dashboard/TaskCarosal';
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { getCompletedRequest, getInProgressRequest, getTaskRequest } from '../apiRequiest/apiRequiest';
const CreateTask = () => {
    const [isCarouselVisible, setCarouselVisible] = useState(false);

    const showCarousel = () => {
        setCarouselVisible(true);
    };

    const hideCarousel = () => {
        setCarouselVisible(false);
    };

    const [getTask, setTask] = useState([]);

    useEffect(()=>{
        (async()=>{
            let result = await getTaskRequest("TODO");
            setTask(result)
        })()
    },[0])

    const [progress, setProgress]=useState([])
    useEffect(()=>{
        (async()=>{
            let result = await getInProgressRequest("In Progress");
            setProgress(result)
        })()
    },[0])

    const [complete, setComplete]=useState([])
    useEffect(()=>{
        (async()=>{
            let result = await getCompletedRequest("Completed");
            setComplete(result)
        })()
    },[0])

    return (
        <div>
            <div className="">
                <div className="row">
                    <div className="col-lg-12 pt-3">
                        <Header/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-2">
                        <LeftSideHome/>
                    </div>
                    <div className="col-lg-10">
                        <div className="row">
                            <div className="col-lg-10 taskText">
                                <p>Tasks</p>
                            </div>
                            <div className="col-lg-2 createTask">
                                <button onClick={showCarousel}>+ Create Task</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4">
                                todo
                            </div>
                            <div className="col-lg-4">
                                inprogress
                            </div>
                            <div className="col-lg-4">
                                complete
                            </div>
                        </div>

                        <div className="row">
                            <div className="getTask d-flex pb-2">
                                <div className="col-4">
                                 {
                                    getTask.length>0?(
                                        getTask.map((item, i)=>{
                                            return(
                                                <div key={i} className="taxbox">
                                                <p>{item.priority} <MdKeyboardDoubleArrowUp /></p>
                                                <span>{item.title} </span>
                                                <h5>{item.description}</h5>
                                                <h4 style={{color:"#0A904B", fontWeight:"600"}}>{item.status}</h4>
                                                <h4>{item.dueDate}</h4>
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
                                <div className="col-lg-4">
                                {
                                    progress.length>0?(
                                        progress.map((item, i)=>{
                                            return(
                                                <div key={i} className="taxbox">
                                                <p>{item.priority} <MdKeyboardDoubleArrowUp /></p>
                                                <span>{item.title} </span>
                                                <h5>{item.description}</h5>
                                                <h4 style={{color:"#0A904B", fontWeight:"600"}}>{item.status}</h4>
                                                <h4>{item.dueDate}</h4>
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


                                <div className="col-lg-4">
                                {
                                    complete.length>0?(
                                        complete.map((item, i)=>{
                                            return(
                                                <div key={i} className="taxbox">
                                                <p>{item.priority} <MdKeyboardDoubleArrowUp /></p>
                                                <span>{item.title} </span>
                                                <h5>{item.description}</h5>
                                                <h4 style={{color:"#0A904B", fontWeight:"600"}}>{item.status}</h4>
                                                <h4>{item.dueDate}</h4>
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
                        </div>

                        
                    </div>
                </div>
            </div>
            {isCarouselVisible && <Carousel props={hideCarousel} />}
        </div>
    );
};

export default CreateTask;
