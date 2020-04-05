import React from "react";
const Cell = ({ day, events }) => {
  if (day.placeholder) {
    return <div className="placeholder cell"></div>;
  }
  console.log(events)
  return (
    <div className="cell">
      <div>{day.date}</div>
      <div>{events.map(event => <div className='dot green'></div>)}</div>
    </div>
  );
};

export default Cell;
