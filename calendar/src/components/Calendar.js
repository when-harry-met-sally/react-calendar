import React, { useState, useEffect } from "react";
import axios from "axios";
import Frame from "../components/Frame";
import { generateMonth, isSameDay } from "../helpers/calendarGeneration";
import Header from "./Header";
import Cell from "./Cell";
const Calendar = () => {
  const generateCells = (month, events) => {
    const cells = [];
    month.forEach(day => {
      const ev = [];
      if (day.d) {
        const positions = []
        events.forEach(event => {
          const start = event.start;
          const end = event.end;
          const startSame = isSameDay(start, day.d);
          const endSame = isSameDay(end, day.d);
          const between = start < day.d && end > day.d;
          if (startSame && endSame) {
            ev.push({ style: "single", color: event.color, event: event });
          } else if (startSame) {
            ev.push({ style: "start", color: event.color, event: event});
          } else if (endSame) {
            ev.push({ style: "end", color: event.color, event: event });
          } else if (between) {
            ev.push({ style: "between", color: event.color, event: event });
          }
        });
      }
      console.log(ev)
      cells.push(<Cell events={ev} day={day} />);
    });
    return cells;
  };

  const [events, setEvents] = useState([]);
  const [view, setView] = useState(null);

  const changeView = (m, y, e) => {
    const currentMonth = generateMonth(m, y);
    setView({
      month: m,
      year: y,
      currentMonth: currentMonth,
      cells: generateCells(currentMonth, e ? e : events)
    });
  };
  const colors = e => {
    let color;
    switch (e.organizer.displayName) {
      case "Fort Moran":
        color = "blue";
        break;
      case "Fort Guac":
        color = "green";
        break;
      default:
        color = "black";
        break;
    }
    return color;
  };
  useEffect(() => {
    axios.get("http://localhost:5000").then(res => {
      console.log(res);
      const standardized = [];

      res.data.forEach(event => {
        const start = event.start.dateTime
          ? event.start.dateTime
          : event.start.date;
        const end = event.end.dateTime ? event.end.dateTime : event.end.date;
        const temp = {
          ...event,
          start: new Date(start),
          end: new Date(end),
          color: colors(event)
        };

        standardized.push(temp);
      });
      setEvents(standardized);
      changeView(new Date().getMonth(), new Date().getFullYear(), standardized);
    });
  }, []);
  return (
    <>
      {view && (
        <>
          <Header events={events} view={view} changeView={changeView} />
          <Frame view={view} />
        </>
      )}
    </>
  );
};

export default Calendar;
