import React, { useState } from "react";
const Frame = ({ events, view }) => {
  const colors = {
    "Fort Moran": "blue",
    "Fort Guac": "green"
  };
  const getEventData = d => {
    const ev = [];
    for (let e = 0; e < events.length; e++) {
      const start = events[e].start.date
        ? new Date(events[e].start.date)
        : new Date(events[e].start.dateTime);
      const end = events[e].end.date
        ? new Date(events[e].end.date)
        : new Date(events[e].end.dateTime);
      if (
        d.d.getDate() === start.getDate() &&
        d.d.getMonth() === start.getMonth() &&
        d.d.getYear() === start.getYear() &&
        d.d.getDate() === end.getDate() &&
        d.d.getMonth() === end.getMonth() &&
        d.d.getYear() === end.getYear()
      ) {
        if (events[e]) {
          ev.push(events[e]);
          events[e].shape = "line start-end";
        }
      } else if (
        d.d.getDate() === start.getDate() &&
        d.d.getMonth() === start.getMonth() &&
        d.d.getYear() === start.getYear()
      ) {
        if (events[e]) {
          ev.push(events[e]);
          events[e].shape = "line start";
        }
      } else if (
        (d.d.getDate() === end.getDate() &&
          d.d.getMonth() === end.getMonth() &&
          d.d.getYear()) === end.getYear()
      ) {
        if (events[e]) {
          ev.push(events[e]);
          events[e].shape = "line end";
        }
      } else if (d.d > start && d.d < end) {
        events[e].shape = "line";
        ev.push(events[e]);
      }
    }
    return ev.map((e, i) => (
      <span
        key={i}
        className={e.shape}
        style={{ backgroundColor: colors[e.organizer.displayName] }}
      ></span>
    ));
  };
  const generateCell = d => {
    if (d.placeholder) {
      return <span className="placeholder cell"></span>;
    }
    return (
      <span className="cell">
        <span className="date-box">{d.date}</span>
        <span>{getEventData(d)}</span>
      </span>
    );
  };
  return (
    <div>
      {view.currentMonth.map((d, i) => (
        <span key={i}>
          {generateCell(d)}
          {(i + 1) % 7 === 0 && <div />}
        </span>
      ))}
    </div>
  );
};

export default Frame;
