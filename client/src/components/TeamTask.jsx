import React from 'react';
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
const TeamTask = () => {
    return (
        <div>
              <div className="row">
                <div className="taxbox">
                <p>High <MdKeyboardDoubleArrowUp /></p>
                <span>title </span>
                <h5>description</h5>
                <h4 style={{color:"rgb(8, 169, 244)", fontWeight:"600"}}>todo</h4>
                <h4>Due Date : 05-8-2024</h4>
                <h4>Category : web application</h4>
                </div>
            </div>
        </div>
    );
};

export default TeamTask;