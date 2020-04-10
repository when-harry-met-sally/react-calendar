import React, {useState, useEffect} from "react";
import axios from "axios";
import Frame from "../components/Frame";
import {generateMonth} from "../helpers/calendarGeneration";
import Header from "./Header";
import Cell from "./Cell";
import Focus from "./Focus";

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [view, setView] = useState(null);
    const [focus, setFocus] = useState(null)
    const changeView = (m, y, e) => {
        const currentMonth = generateMonth(m, y, e)
        setView({
            month: m,
            year: y,
            currentMonth: currentMonth,
        });
    };

    useEffect(() => {
        axios.get("http://localhost:5000").then(res => {
            console.log(res);
            const standardized = [];

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
                    <Header events={events} view={view} changeView={changeView}/>
                    <Frame view={view} setFocus={setFocus} focus={focus}/>
                    <Focus focus={focus}/>
                </>
            )}
        </>
    );
};

export default Calendar;
