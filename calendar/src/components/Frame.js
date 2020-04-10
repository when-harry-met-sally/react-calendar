import React, { useState } from "react";
import Cell from './Cell';
const Frame = ({ view }) => {
  return (
    <div>
    {view.currentMonth.map((day, i) =><><Cell day={day}/>{(i + 1) % 7 === 0 && <br/>}</>)}
    </div>
  );
};

export default Frame;
