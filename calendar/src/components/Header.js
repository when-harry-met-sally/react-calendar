import React from "react";
import { monthToString } from "../helpers/calendarGeneration";
const Header = ({ events, view, changeView}) => {
  const handleMonthChange = operator => {
    let month;
    let year;
    if (operator === 1) {
      year = view.month === (11) ? view.year + operator : view.year;
      month = view.month === (11) ? (0) : view.month + operator;
    }
    if (operator === -1) {
      year = view.month === (0) ? view.year + operator : view.year;
      month = view.month === (0) ? 11 : view.month + operator;
    }

    changeView(month, year)
  };
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return (
    <div>
      <div>
        <span>{monthToString(view.month)} </span>
        <span>{view.year}</span>
  <span>{events.length === 0 && ' - EVENTS FAILED TO LOAD'}</span>
      </div>
      <input
        type="button"
        value="Previous"
        onClick={() => handleMonthChange(-1)}
      />
      <input type="button" value="Next" onClick={() => handleMonthChange(1)} />
      <div>
        {days.map((day, i) => (
          <div key={i} className="day-label">{day}</div>
        ))}
      </div>
    </div>
  );
};

export default Header;
