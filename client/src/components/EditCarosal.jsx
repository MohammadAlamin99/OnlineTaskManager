import React from 'react';

const EditCarosal = ({props}) => {
    const {taskId} = props;
    const {hideUpdate} = props;
    
    return (
        <div>
            <div className="carousel-overlay">
                <div className="carousel-content">
                    <button className="close-button" onClick={hideUpdate}>X</button>
                    <p>Title</p>
                    <input type="text" style={{ width: "100%" }} />
                    <p>Description</p>
                    <textarea type="text" style={{ width: "100%" }} />
                    <p>Category</p>
                    <input type="text" style={{ width: "100%" }} />
                    <p>Status</p>
                    <select className="form-control">
                        <option value="TODO">TODO</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <p>Priority</p>
                    <select className="form-control">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <p>Due Date</p>
                    <input type="date" className="form-control" style={{ width: "100%" }} />
                    <p>Assign To</p>
                    <div className="form-control" style={{ width: "100%" }}>
                    </div>
                    <button style={{ marginTop: "2px" }} className='btn btn-primary'>Update</button>
                </div>
            </div>
        </div>
    );
};

export default EditCarosal;