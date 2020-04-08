import React from "react";
const Cell = ({ day, events }) => {
  const positions = day.positions;
  console.log(events)
  console.log(positions)
  if (day.placeholder) {
    return <div className="placeholder cell"></div>;
  }
  if (events.length === 0 || positions.length === 0) {
    return (
      <div className="cell">
        <div>{day.date}</div>
        <div></div>
      </div>
    );
  }
  const orderedEvents = [];
  const max =
    positions.reduce(function(prev, current) {
      return prev.position > current.position ? prev : current;
    })
  for (let i = 0; i <= max; i++) {
      const e = events.filter(event => event.position === i);
      if (e.length !== 0){
        orderedEvents.push(e[0])
      } else {
        orderedEvents.push({styling: "hidden"})
      }
  }

  return (
    <div className="cell">
      <div>{day.date}</div>
      <div>
        {orderedEvents.map(event => (
          <div
            className={"marker " + event.styling}
            style={{ backgroundColor: event.color }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Cell;
