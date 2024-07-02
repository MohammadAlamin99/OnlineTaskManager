import React, { useEffect, useRef, useState } from 'react';
import { CreateTaskRequiest, getUsersRequest } from '../../apiRequiest/apiRequiest';
import { getUserDetails } from '../../Helper/SessionHelper';
import {useSelector, useDispatch } from "react-redux";
import { setUser } from '../../redux/state-slice/user-slice';
import toast, { Toaster } from 'react-hot-toast';

const TaskCarosal = ({ props }) => {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();
    const statusRef = useRef();
    const priorityRef = useRef();
    const dueDateRef = useRef();
    
    const [selectedUsers, setSelectedUsers] = useState([]);
    const myInfo = getUserDetails()
    const myId = myInfo._id;
    const onBtnClick = async () => {
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const category = categoryRef.current.value;
        const status = statusRef.current.value;
        const priority = priorityRef.current.value;
        const dueDate = dueDateRef.current.value;
        await CreateTaskRequiest(selectedUsers, title, description, dueDate, priority, status, category);
        toast.success("Task Create Successfully!");
        window.location.reload();
    }

    const handleUserSelection = (userId) => {
        setSelectedUsers(prevSelectedUsers => 
            prevSelectedUsers.includes(userId)
                ? prevSelectedUsers.filter(id => id !== userId)
                : [...prevSelectedUsers, userId]
        );
    };
    
    const dispatch = useDispatch();
    const SearchUser = useSelector((state)=>state.users.user);

    useEffect(() => {
        (async () => {
            let result = await getUsersRequest();
            dispatch(setUser(result.data))
        })();
    }, []);

    // assign to 
        const [assign, setAssign] = useState("");
        const assignToUser = SearchUser.filter(user=>(user.firstName.toLowerCase()+ "" +user.lastName.toLowerCase()).includes(assign.toLowerCase()))
    return (
        <div>
        <div className="carousel-overlay">
            <div className="carousel-content">
                <button className="close-button" onClick={props}>X</button>
                <p>Title</p>
                <input ref={titleRef} type="text" style={{ width: "100%" }} />
                <p>Description</p>
                <textarea ref={descriptionRef} type="text" style={{ width: "100%" }} />
                <p>Category</p>
                <input ref={categoryRef} type="text" style={{ width: "100%" }} />
                <p>Status</p>
                <select ref={statusRef} className="form-control">
                    <option value="TODO">TODO</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <p>Priority</p>
                <select ref={priorityRef} className="form-control">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <p>Due Date</p>
                <input ref={dueDateRef} type="date" className="form-control" style={{ width: "100%" }} />
                <p>Assign To</p>
                <input placeholder='User Name or Email' type="text" style={{ width: "100%", fontSize:"14px" }} 
                onChange={(e)=>setAssign(e.target.value)}
                />
                {
                    assign && (
                        <div className="form-control" style={{ width: "100%", maxHeight: "150px", overflowY: "auto" }}>
                            {
                                assignToUser.filter(user=>user._id!==myId).map((item, i)=>{
                                    return(
                                        <div key={item} style={{ display: "flex", alignItems: "center" }}>
                                            <input type="checkbox"
                                                value={item._id}
                                                onChange={()=>handleUserSelection(item._id)}
                                                checked={selectedUsers.includes(item._id)}//multiple user cheaked
                                            />
                                            <img style={{ width: "20px", height: "20px", borderRadius: "50%", marginLeft: "5px", marginRight: "5px" }} src={item.photo} alt="" />
                                            <label style={{ fontSize: "13px", fontFamily: "'Poppins', sans-serif" }}>{item.firstName+ " "+item.lastName}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
               
                    )
                }

                {
                    selectedUsers.length > 0 &&(
                        <div>
                            {
                                selectedUsers.map((item, i)=>{
                                    const user = SearchUser.find(user=>user._id===item)
                                    return(
                                        <div key={i} className="selected-users" style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                                        <div style={{ display: "flex", alignItems: "center",padding: "5px 10px",background:"rgba(202, 196, 196, 0.5)", borderRadius: "20px"}}>
                                            <img style={{ width: "20px", height: "20px", borderRadius: "50%", marginRight: "5px" }} src={user.photo} alt="" />
                                            <span style={{ fontSize: "13px", fontFamily: "'Poppins', sans-serif" }}>{user.firstName+" "+user.lastName}</span>
                                            <button style={{ marginLeft: "5px", background:"0",border:"none" }} onClick={()=>handleUserSelection(item)}>X</button>
                                        </div>
                                    </div>
                                    )
                                })
                            }
                   </div>
                    )
                }
                <button style={{ marginTop: "10px" }} className='btn btn-primary' onClick={onBtnClick}> Submit</button>
            </div>
        </div>
        <Toaster
            position="top-right"
            reverseOrder={false}
            />
    </div>
    );
};

export default TaskCarosal;

