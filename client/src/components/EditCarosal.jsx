import React, { useEffect, useRef, useState } from 'react';
import { UpdateTaskRequest, getUpdateTaskRequest } from '../apiRequiest/apiRequiest';
import { useSelector } from 'react-redux';


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

    useEffect(() => {
        if (update) {
            statusRef.current.value = update.status;
            priorityRef.current.value = update.priority;
            dueDateRef.current.value = update.dueDate?new Date(update.dueDate).toISOString().split('T')[0]:"";
        }
    }, [update]);

 
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

                    <button onClick={onUpdateHandler} style={{ marginTop: "2px", marginTop:"1rem"}} className='btn btn-primary'>Update</button>
                </div>
            </div>
        </div>
    );
};

export default EditCarosal;