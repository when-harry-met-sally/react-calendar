import React, { useState } from "react";
import Cell from './Cell';
const Frame = ({ view, setFocus, focus }) => {
  return (
    <div>
    {view.currentMonth.map((day, i) =><><Cell day={day} focus={focus} setFocus={setFocus}/>{(i + 1) % 7 === 0 && <br/>}</>)}
    </div>
  );
};

export default Frame;
