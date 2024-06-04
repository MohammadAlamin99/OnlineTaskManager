import Swal from 'sweetalert2'
import React, { useEffect, useRef, useState } from 'react';
import { UpdateTaskRequest, getUpdateTaskRequest } from '../apiRequiest/apiRequiest';


const EditCarosal = ({props}) => {
    const {taskId} = props;
    const {hideUpdate} = props;

    const titleRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();
    const statusRef = useRef();
    const priorityRef = useRef();
    const dueDateRef = useRef();
    
    const onUpdateHandler = async()=>{
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const category = categoryRef.current.value;
        const status = statusRef.current.value;
        const priority = priorityRef.current.value;
        const dueDate = dueDateRef.current.value;
        await UpdateTaskRequest(taskId,title, description, dueDate, priority, status, category);
        window.location.reload();
    }

    // store update defult data
    const [update, setUpdate] = useState([]);

    useEffect(()=>{
        (async()=>{
            let result = await getUpdateTaskRequest(taskId);
            setUpdate(result[0]);
        })()
    },[0])
    
    
    return (
        <div>
            <div className="carousel-overlay">
                <div className="carousel-content">
                    <button className="close-button" onClick={hideUpdate}>X</button>
                    <p>Title</p>
                    <input ref={titleRef} defaultValue={update.title} type="text" style={{ width: "100%" }} />
                    <p>Description</p>
                    <textarea ref={descriptionRef} defaultValue={update.description} type="text" style={{ width: "100%" }} />
                    <p>Category</p>
                    <input ref={categoryRef} defaultValue={update.category} type="text" style={{ width: "100%" }} />
                    <p>Status</p>
                    <select ref={statusRef} defaultValue={update.status} className="form-control">
                        <option value="TODO">TODO</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <p>Priority</p>
                    <select ref={priorityRef} defaultValue={update.priority} className="form-control">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <p>Due Date</p>
                    <input ref={dueDateRef} type="date" defaultValue={update.dueDate} className="form-control" style={{ width: "100%" }} />
                    <button onClick={onUpdateHandler} style={{ marginTop: "2px" }} className='btn btn-primary'>Update</button>
                </div>
            </div>
        </div>
    );
};

export default EditCarosal;