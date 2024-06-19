import React, { useEffect, useState } from 'react';
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { getTeamTaskRequest } from '../apiRequiest/apiRequiest';
import moment from 'moment';
import { getUserDetails } from '../Helper/SessionHelper';
const TeamTask = () => {
    const [data, setData] = useState([]);
    const id =getUserDetails()._id;
    useEffect(()=>{
        (async()=>{
            let result = await getTeamTaskRequest(id); 
            setData(result);
        })()
    },[0])
    return (
        <div>
             {
                data.length>0?(
                    data.map((item, i)=>{
                        return(
                            <div className="row" key={i}>
                                <div className="taxbox text-center">
                                    <p className='m-0'>High <MdKeyboardDoubleArrowUp /></p>
                                    <span className='p-0'>{item.title}</span>
                                    <h5 className='m-0'>{item.description}</h5>
                                    <h4 style={{color:"rgb(8, 169, 244)",margin:"0", fontWeight:"600"}}>{item.status}</h4>
                                    <h4 className='m-0'>Category : {item.category}</h4>
                                    <h4>Due Date : {moment(item.dueDate).format('ll')}</h4>
                                    <h4>Assignment From : {item.email}</h4>
                                </div>
                        </div>
                        )
                    })
                ):("No Assignment")
             }
        </div>
    );
};

export default TeamTask;