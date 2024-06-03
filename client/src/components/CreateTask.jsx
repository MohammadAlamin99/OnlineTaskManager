import React, { useEffect, useState } from 'react';
import Header from './Dashboard/Header';
import LeftSideHome from './Dashboard/LeftSideHome';
import Carousel from './Dashboard/TaskCarosal';
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { DeleteTaskRequest, getCompletedRequest, getInProgressRequest, getTaskRequest } from '../apiRequiest/apiRequiest';
import { useDispatch, useSelector } from 'react-redux';
import { setComplete } from '../redux/state-slice/completeTask-slice';
import { setInProgress } from '../redux/state-slice/inProgressTask-slice';
import { setTodo } from '../redux/state-slice/todoTask-slice';
import { LiaEditSolid } from "react-icons/lia";
import EditCarosal from './EditCarosal';
import { AiOutlineDelete } from "react-icons/ai";

const CreateTask = () => {
    const [isCarouselVisible, setCarouselVisible] = useState(false);
    const [isUpadateCarousel, setUpadateCarousel] = useState(false);

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
        
    const showUpdate = (id)=>{
        setTaskId(id);
        setUpadateCarousel(true)
    };

    const hideUpdate = ()=>{
        setUpadateCarousel(false)
    };

    const todoDispatch = useDispatch();
    const getTodo = useSelector((state)=>state.getTodo.todo);
    useEffect(()=>{
        (async()=>{
            let result = await getTaskRequest("TODO");
            todoDispatch(setTodo(result))
        })()
    },[0])

    const inDisPatch = useDispatch();
    const getInPro = useSelector((state)=>state.getInProgress.inProgress);

    useEffect(()=>{
        (async()=>{
            let result = await getInProgressRequest("In Progress");
            inDisPatch(setInProgress(result))
        })()
    },[0])

    const comDispatch = useDispatch();
    const getComplete = useSelector((state)=> state.getComplete.complete);
    useEffect(()=>{
        (async()=>{
            let result = await getCompletedRequest("Completed");
            comDispatch(setComplete(result));
        })()
    },[0])

    // delete Task
    const DeleteTaskHandler = async(id)=>{
        let data = await DeleteTaskRequest(id);
    }

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
                            <div className="col-lg-4 todo">
                                To-Do
                            </div>
                            <div className="col-lg-4 inPro">
                                In-Progress
                            </div>
                            <div className="col-lg-4 comp">
                                Complete
                            </div>
                        </div>

                        <div className="row">
                            <div className="getTask d-flex pb-2">
                                <div className="col-4">
                                 {
                                    getTodo.length>0?(
                                        getTodo.map((item, i)=>{
                                            return(
                                                <div key={i} className="taxbox">
                                                   
                                                <p>{item.priority} <MdKeyboardDoubleArrowUp />  
                                                <LiaEditSolid  onClick={() => showUpdate(item._id)} 
                                                 style={{color:"black", fontSize:"17px", cursor:"pointer", marginLeft:"12rem"}}/>
                                                 <AiOutlineDelete onClick={()=> DeleteTaskHandler(item._id)} style={{color:"red", fontSize:"17px", cursor:"pointer", marginLeft:"10px"}}/>
                                                 </p>

                                                <span>{item.title} </span>
                                                <h5>{item.description}</h5>
                                                <h4 style={{color:"#08A9F4", fontWeight:"600"}}>{item.status}</h4>
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
                                    getInPro.length>0?(
                                        getInPro.map((item, i)=>{
                                            return(
                                                <div key={i} className="taxbox">
                                                <p>{item.priority} <MdKeyboardDoubleArrowUp />
                                                <LiaEditSolid  onClick={() => showUpdate(item._id)} 
                                                 style={{color:"black", fontSize:"17px", cursor:"pointer", marginLeft:"12rem"}}/>
                                                 <AiOutlineDelete onClick={()=> DeleteTaskHandler(item._id)} style={{color:"red", fontSize:"17px", cursor:"pointer", marginLeft:"10px"}}/>
                                                </p>
                                                <span>{item.title} </span>
                                                <h5>{item.description}</h5>
                                                <h4 style={{color:"#FF7800", fontWeight:"600"}}>{item.status}</h4>
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
                                    getComplete.length>0?(
                                        getComplete.map((item, i)=>{
                                            return(
                                                <div key={i} className="taxbox">
                                                <p>{item.priority} <MdKeyboardDoubleArrowUp />
                                                <LiaEditSolid  onClick={() => showUpdate(item._id)} 
                                                 style={{color:"black", fontSize:"17px", cursor:"pointer", marginLeft:"12rem"}}/>
                                                 <AiOutlineDelete onClick={()=> DeleteTaskHandler(item._id)} style={{color:"red", fontSize:"17px", cursor:"pointer", marginLeft:"10px"}}/>
                                                </p>
                                                <span>{item.title} </span>
                                                <h5>{item.description}</h5>
                                                <h4 style={{color:"#2ECD6E", fontWeight:"600"}}>{item.status}</h4>
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
            {isUpadateCarousel && <EditCarosal props={{hideUpdate, taskId}}/>}
        </div>
    );
};

export default CreateTask;
