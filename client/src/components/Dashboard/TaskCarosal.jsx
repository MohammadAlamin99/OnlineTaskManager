import React, { useEffect, useRef, useState } from 'react';
import { CreateTaskRequiest, getUsersRequest } from '../../apiRequiest/apiRequiest';
import { getUserDetails } from '../../Helper/SessionHelper';
import {useSelector, useDispatch } from "react-redux";
import { setUser } from '../../redux/state-slice/user-slice';
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
                    <div className="form-control" style={{ width: "100%" }}>
                        {
                        SearchUser.filter(f=> f._id !==myId).map((user) => (
                            <div key={user._id}>
                                <input
                                    type="checkbox"
                                    value={user._id}
                                    onChange={() => handleUserSelection(user._id)}
                                />
                                <img style={{width:"20px", height:"20px", borderRadius:"50%", marginLeft:"5px", marginRight:"5px"}} src={user.photo} alt="" />
                                <label style={{fontSize:"13px", fontFamily:"'Poppins', sans-serif"}}>{user.firstName+" "+user.lastName}</label>
                            </div>
                        ))}
                    </div>
                    <button style={{ marginTop: "2px" }} className='btn btn-primary' onClick={onBtnClick}> Submit</button>
                </div>
            </div>
        </div>
    );
};

export default TaskCarosal;









// import React, { useEffect, useRef, useState } from 'react';
// import { CreateTaskRequiest, getUsersRequest } from '../../apiRequiest/apiRequiest';
// import { getUserDetails } from '../../Helper/SessionHelper';
// import { useSelector, useDispatch } from "react-redux";
// import { setUser } from '../../redux/state-slice/user-slice';

// const TaskCarosal = ({ props }) => {
//     const titleRef = useRef();
//     const descriptionRef = useRef();
//     const categoryRef = useRef();
//     const statusRef = useRef();
//     const priorityRef = useRef();
//     const dueDateRef = useRef();

//     const [selectedUsers, setSelectedUsers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const myInfo = getUserDetails();
//     const myId = myInfo._id;

//     const onBtnClick = async () => {
//         const title = titleRef.current.value;
//         const description = descriptionRef.current.value;
//         const category = categoryRef.current.value;
//         const status = statusRef.current.value;
//         const priority = priorityRef.current.value;
//         const dueDate = dueDateRef.current.value;

//         await CreateTaskRequiest(selectedUsers, title, description, dueDate, priority, status, category);
//         window.location.reload();
//     }

//     const handleUserSelection = (userId) => {
//         setSelectedUsers(prevSelectedUsers => 
//             prevSelectedUsers.includes(userId)
//                 ? prevSelectedUsers.filter(id => id !== userId)
//                 : [...prevSelectedUsers, userId]
//         );
//     };

//     const dispatch = useDispatch();
//     const SearchUser = useSelector((state) => state.users.user);

//     useEffect(() => {
//         (async () => {
//             let result = await getUsersRequest();
//             dispatch(setUser(result.data));
//         })();
//     }, [dispatch]);

//     const filteredUsers = SearchUser.filter(user => 
//         (user.firstName.toLowerCase() + " " + user.lastName.toLowerCase()).includes(searchTerm.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div>
//             <div className="carousel-overlay">
//                 <div className="carousel-content">
//                     <button className="close-button" onClick={props}>X</button>
//                     <p>Title</p>
//                     <input ref={titleRef} type="text" style={{ width: "100%" }} />
//                     <p>Description</p>
//                     <textarea ref={descriptionRef} type="text" style={{ width: "100%" }} />
//                     <p>Category</p>
//                     <input ref={categoryRef} type="text" style={{ width: "100%" }} />
//                     <p>Status</p>
//                     <select ref={statusRef} className="form-control">
//                         <option value="TODO">TODO</option>
//                         <option value="In Progress">In Progress</option>
//                         <option value="Completed">Completed</option>
//                     </select>
//                     <p>Priority</p>
//                     <select ref={priorityRef} className="form-control">
//                         <option value="Low">Low</option>
//                         <option value="Medium">Medium</option>
//                         <option value="High">High</option>
//                     </select>
//                     <p>Due Date</p>
//                     <input ref={dueDateRef} type="date" className="form-control" style={{ width: "100%" }} />
//                     <p>Assign To</p>
//                     <input 
//                         type="text" 
//                         placeholder="Search by name or email" 
//                         className="form-control" 
//                         style={{ width: "100%", marginBottom: "10px" }} 
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                     {searchTerm && (
//                         <div className="form-control" style={{ width: "100%", maxHeight: "150px", overflowY: "auto" }}>
//                             {filteredUsers.filter(user => user._id !== myId).map((user) => (
//                                 <div key={user._id} style={{ display: "flex", alignItems: "center" }}>
//                                     <input
//                                         type="checkbox"
//                                         value={user._id}
//                                         onChange={() => handleUserSelection(user._id)}
//                                         checked={selectedUsers.includes(user._id)}
//                                     />
//                                     <img style={{ width: "20px", height: "20px", borderRadius: "50%", marginLeft: "5px", marginRight: "5px" }} src={user.photo} alt="" />
//                                     <label style={{ fontSize: "13px", fontFamily: "'Poppins', sans-serif" }}>{user.firstName + " " + user.lastName}</label>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                     {selectedUsers.length > 0 && (
//                         <div style={{ marginTop: "10px" }}>
//                             <p>Selected Users:</p>
//                             <div className="selected-users" style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
//                                 {selectedUsers.map(userId => {
//                                     const user = SearchUser.find(user => user._id === userId);
//                                     return (
//                                         <div key={userId} style={{ display: "flex", alignItems: "center", background: "#f1f1f1", padding: "5px 10px", borderRadius: "5px" }}>
//                                             <img style={{ width: "20px", height: "20px", borderRadius: "50%", marginRight: "5px" }} src={user.photo} alt="" />
//                                             <span style={{ fontSize: "13px", fontFamily: "'Poppins', sans-serif" }}>{user.firstName + " " + user.lastName}</span>
//                                             <button style={{ marginLeft: "5px" }} onClick={() => handleUserSelection(userId)}>X</button>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     )}
//                     <button style={{ marginTop: "10px" }} className='btn btn-primary' onClick={onBtnClick}>Submit</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TaskCarosal;
