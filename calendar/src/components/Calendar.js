import React, { useState, useEffect } from "react";
import axios from "axios";
import Frame from "../components/Frame";
import { generateMonth } from "../helpers/calendarGeneration";
import Header from "./Header";
const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    currentMonth: generateMonth(new Date().getMonth(), new Date().getFullYear())
  });
  useEffect(() => {
    axios.get("http://localhost:5000").then(res => setEvents(res.data));
  }, []);
  return (
    <>
      <Header view={view} setView={setView} generateMonth={generateMonth}/>
      <Frame events={events} view={view} />
    </>
  );
};

export default Calendar;
