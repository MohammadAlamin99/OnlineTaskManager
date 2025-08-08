import React, { useEffect, useState } from 'react';
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { getTeamTaskRequest } from '../apiRequiest/apiRequiest';
import moment from 'moment';
import { getUserDetails } from '../Helper/SessionHelper';
import { RxUpdate } from "react-icons/rx";
import StatusUpadateCarosal from './StatusUpadateCarosal';
import BeatLoader  from "react-spinners/BeatLoader";

const TeamTask = () => {
    const [isCarouselVisible, setCarouselVisible] = useState(false);
    const [load, setLoaded] = useState(false);
    const [data, setData] = useState([]);
    const id =getUserDetails()._id;
    useEffect(()=>{
        (async()=>{
            setLoaded(true)
            let result = await getTeamTaskRequest(id); 
            setLoaded(false)
            setData(result);
        })()
    },[0])

// status update carosal
    const [taskId, setTaskId] = useState("");
    const showCarousel =(id)=>{
        setTaskId(id);
        setCarouselVisible(true);
    }

    const hideCarousel = () => {
        setCarouselVisible(false);
    };


    // color change by status
    const getColorChange = (status)=>{
        switch (status) {
            case 'TODO':
                return '#08A9F4';

            case 'In Progress':
                return '#FF7800';
                
            case 'Completed':
                return '#2ECD6E'
        }
    };
    return (
       load?(
        <div className="loader-container">
            <BeatLoader
                color="#0866FF"
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
       ):(
        <div>
        {
           data.length>0?(
               data.map((item, i)=>{
                   return(
                       <div className="row g-0" key={i}>
                           <div className="taxbox text-center">
                               <p className='m-0'>High <MdKeyboardDoubleArrowUp /></p>
                               <span className='p-0'>{item.title}</span>
                               <h5 className='m-0'>{item.description}</h5>
                               <h4 style={{color:getColorChange(item.status),margin:"0", fontWeight:"600"}}>{item.status} 
                                   <RxUpdate onClick={()=>showCarousel(item._id)} style={{color:"red", cursor:"pointer", marginLeft:"5px"}}/></h4>
                               <h4 className='m-0'>Category : {item.category}</h4>
                               <h4>Due Date : {moment(item.dueDate).format('ll')}</h4>
                               <h4>Assign By : {item.email}</h4>
                           </div>
                   </div>
                   )
               })
           ):("No Assignment")
        }
        {isCarouselVisible && <StatusUpadateCarosal props={{hideCarousel,taskId}}/>}
   </div>
       )
    );
};

export default TeamTask;