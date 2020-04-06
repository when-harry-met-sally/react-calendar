import React from "react";
const Cell = ({ day, events }) => {
  if (day.placeholder) {
    return <div className="placeholder cell"></div>;
  }
  return (
    <div className="cell">
      <div>{day.date}</div>
      <div>{events.map(event => <div className={'marker ' + event.style} style={{backgroundColor: event.color}}></div>)}</div>
    </div>
  );
};

export default Cell;
