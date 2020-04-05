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
        const ev = []
        events.forEach(event => {
            
        })
      cells.push(<Cell events={[]} day={day} />);
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
          end: new Date(end)
        };
        standardized.push(temp)
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
