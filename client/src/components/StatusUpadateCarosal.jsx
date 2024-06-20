import React, { useRef } from 'react';
import { StatusUpdateRequest } from '../apiRequiest/apiRequiest';
const StatusUpadateCarosal = ({props}) => {
    const {taskId} = props;
    const {hideCarousel} = props;

    const statusRef = useRef();
    const onUpdateHandler =async ()=>{
        const status = statusRef.current.value;
        await StatusUpdateRequest(taskId, status);
        window.location.reload();
    }
    return (
        <div>
            <div className="carousel-overlay">
                <div className="carousel-content">
                    <button className="close-button"onClick={hideCarousel}>X</button>
                    <p>Update Status</p>
                    <select ref={statusRef} className="form-control">
                        <option value="TODO">TODO</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <button onClick={onUpdateHandler} style={{ marginTop: "2px" }} className='btn btn-primary'> Update</button>
                     </div>
            </div>
        </div>
    );
};

export default StatusUpadateCarosal;