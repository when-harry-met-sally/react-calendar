import React, { useState, useEffect } from "react";
import axios from "axios";
const Main = () => {
  const [view, setView] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  });
  const generateMonth = (m, y) => {
    const completeMonth = [];
    let initial = new Date(y, m, 1);
    while (true) {
      completeMonth.push(dateToObject(initial));
      const next = new Date(initial);
      next.setDate(next.getDate() + 1);
      if (next.getMonth() != initial.getMonth()) {
        break;
      }
      initial = next;
    }
    const test = completeMonth[0].day;
    const test2 = [];
    for (let i = 0; i < test; i++) {
      test2.push({ placeholder: true });
    }
    return test2.concat(completeMonth);
  };
  const colors = {
    "Fort Moran": "blue",
    "Fort Guac": "green"
  };
  const dateToObject = d => {
    d = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      date: d.getDate(),
      time: d.getTime(),
      day: d.getDay(),
      d
    };
    return d;
  };
  const [currentMonth, setCurrentMonth] = useState(
    generateMonth(view.month, view.year)
  );
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000").then(res => setEvents(res.data));
  }, []);
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
        (d.d.getDate() === start.getDate() &&
          d.d.getMonth() === start.getMonth() &&
          d.d.getYear() === start.getYear()) ||
        (d.d.getDate() === end.getDate() &&
          d.d.getMonth() === end.getMonth() &&
          d.d.getYear()) === end.getYear()
      ) {
        if (events[e]) {
          ev.push(events[e]);
          events[e].shape = 'dot'
          console.log(events[e].shape)
        }
      } else if (d.d > start && d.d < end) {
        events[e].shape = 'line'
        ev.push(events[e]);
        console.log(events[e].shape)
      }
    }
    return ev.map(e => (
      <div
        className={e.shape}
        style={{ backgroundColor: colors[e.organizer.displayName] }}
      ></div>
    ));
  };
  const generateCell = d => {
    if (d.placeholder) {
      return <div className="placeholder cell"></div>;
    }
    return (
      <div className="cell">
        <span className="date-box">{d.date}</span>
        <div>{getEventData(d)}</div>
      </div>
    );
  };
  console.log(events);
  return (
    <div>
      <div>
        {currentMonth.map((d, i) => (
          <>
            <span>{generateCell(d)}</span>
            {(i + 1) % 7 === 0 && <div />}
          </>
        ))}
      </div>
    </div>
  );
};

export default Main;
