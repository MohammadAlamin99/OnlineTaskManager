import React, { useRef } from 'react';
import { UpdateTaskRequest } from '../apiRequiest/apiRequiest';


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

        let result = await UpdateTaskRequest(taskId,title, description, dueDate, priority, status, category);
        console.log(result)
        window.location.reload();
    }
    
    return (
        <div>
            <div className="carousel-overlay">
                <div className="carousel-content">
                    <button className="close-button" onClick={hideUpdate}>X</button>
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
                    </div>
                    <button onClick={onUpdateHandler} style={{ marginTop: "2px" }} className='btn btn-primary'>Update</button>
                </div>
            </div>
        </div>
    );
};

export default EditCarosal;