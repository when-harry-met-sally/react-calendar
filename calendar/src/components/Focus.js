import React from "react";
import Cell from './Cell';
const Focus = ({ focus }) => {
    if (!focus){
        return <div/>
    }
    return (
        <div>
            {focus.id}
        </div>
    );
};

export default Focus;
