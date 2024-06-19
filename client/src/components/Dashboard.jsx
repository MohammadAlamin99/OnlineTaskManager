import React, { useState } from 'react';
import { useEffect } from 'react';
import { totalTaskCountRequest } from '../apiRequiest/apiRequiest';
import { BarChart } from '@mui/x-charts/BarChart';
import { RiTodoLine } from "react-icons/ri";
import { FcProcess } from "react-icons/fc";
import { IoCloudDoneSharp } from "react-icons/io5";
const Dashboard = () => {
    const [data, setData] = useState([]);
    const status="In Progress";
    useEffect(()=>{
        (async()=>{
            let result = await totalTaskCountRequest(status);
            setData(result)
        })()
    },[])
    const [todo, setTodo] = useState([]);
    console.log(todo)
    const totdo="TODO";
    useEffect(()=>{
        (async()=>{
            let result = await totalTaskCountRequest(totdo);
            setTodo(result)
        })()
    },[])
    const [com, setCom] = useState([]);
    const complete="Completed";
    useEffect(()=>{
        (async()=>{
            let result = await totalTaskCountRequest(complete);
            setCom(result)
        })()
    },[])

    return (
        <div>
            <div className="row">
                <div className="col-4 DashCommon">
               <p>  <span style={{fontSize:"16px", color:"#08A9F4"}}><RiTodoLine /></span>  Total To Do</p>
                    {
                        todo.map((item, i)=>{
                            return(
                                <p style={{fontSize:"24px", fontWeight:"700", paddingLeft:"3rem"}} key={i}>{item.total}</p>
                            )
                        })
                }
                </div>
                <div className="col-4 DashCommon">
                <p> <span style={{fontSize:"18px", color:"#08A9F4"}}><FcProcess /></span> In Progress</p>
                {
                        data.map((item, i)=>{
                            return(
                                <p style={{fontSize:"24px", fontWeight:"700", paddingLeft:"3rem"}} key={i}>{item.total}</p>
                            )
                        })
                }
                </div>
                <div className="col-4 DashCommon">
                <p> <span style={{fontSize:"18px", color:"rgb(46, 205, 110)"}}><IoCloudDoneSharp /></span> Complete</p>
                {
                        com.map((item, i)=>{
                            return(
                                <p style={{fontSize:"24px", fontWeight:"700", paddingLeft:"3rem"}} key={i}>{item.total}</p>
                            )
                        })
                }
                </div>
            </div>
            <div className="row">
         <div className="col-lg-12">
         <BarChart
                xAxis={[{ scaleType: 'band', data: ['Total TODO', 'Total In Progress', 'Total Completed'] }]}
                series={[{ data: [todo.length>0?todo[0].total:0,data.length>0?data[0].total:0,com.length>0?com[0].total:0] }]}
                width={1150}
                height={300}
            />
         </div>
            </div>
        </div>
    );
};

export default Dashboard;