import React, { useState } from "react";
const Frame = ({ view }) => {
  return (
    <div>
    {view.cells.map((cell, i) => <span key={i}>{cell}{(i + 1) % 7 === 0 && <div/>}</span>)}
    </div>
  );
};

export default Frame;
