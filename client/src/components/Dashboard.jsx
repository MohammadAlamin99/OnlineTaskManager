import React, { useState } from 'react';
import { useEffect } from 'react';
import { totalTaskCountRequest } from '../apiRequiest/apiRequiest';
import { BarChart } from '@mui/x-charts/BarChart';
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
                    <p>Total To Do</p>
                    {
                        todo.map((item, i)=>{
                            return(
                                <span key={i}>{item.total}</span>
                            )
                        })
                }
                </div>
                <div className="col-4 DashCommon">
                <p>In Progress</p>
                {
                        data.map((item, i)=>{
                            return(
                                <span key={i}>{item.total}</span>
                            )
                        })
                }
                </div>
                <div className="col-4 DashCommon">
                <p>Complete</p>
                {
                        com.map((item, i)=>{
                            return(
                                <span key={i}>{item.total}</span>
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
                width={700}
                height={300}
            />
         </div>
            </div>
        </div>
    );
};

export default Dashboard;