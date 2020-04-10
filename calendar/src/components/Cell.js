import React from "react";

const Cell = ({day}) => {
    const events = day.events
    if (day.placeholder) {
        return <div className="placeholder cell"></div>;
    }
    if (!events) {
        return (
            <div className="cell">
                <div>{day.date}</div>
                <div></div>
            </div>
        );
    }
    const orderedEvents = [];
    const max = 6
    const filler = {style: "hidden", event: {color: 'black'}}
    for (let i = 0; i <= max; i++) {
        const e = events.filter(event => event.event.position === i);
        if (e.length === 0) {
            orderedEvents.push(filler)
        } else {
            orderedEvents.push({...e[0]})
        }
    }

    return (
        <div className="cell">
            <div>{day.date}</div>
            <div>
                {orderedEvents.map(event => (
                    <div
                        className={"marker " + event.style}
                        style={{backgroundColor: event.event.color}}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Cell;
