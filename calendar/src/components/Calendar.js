import React, { useState, useEffect } from "react";
import axios from "axios";
import Frame from "../components/Frame";
import { generateMonth, isSameDay } from "../helpers/calendarGeneration";
import Header from "./Header";
import Cell from "./Cell";
const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState(null);

  const changeView = (m, y, e) => {
    const currentMonth = bondEvents(generateMonth(m, y), e)
    setView({
      month: m,
      year: y,
      currentMonth: currentMonth,
    });
  };

  const bondEvents = (currentMonth, events) => {
    
  }
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

        </>
      )}
    </>
  );
};

export default Calendar;
