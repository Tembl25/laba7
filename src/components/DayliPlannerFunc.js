import React from 'react';
import './DailyPlanner.css';
import {EditButton} from "./EditButton";
import {AddEvent} from "./AddEvent";

const DailyPlannerFunction = () => {


    const generateEvents =  () => {
        let events = {};
        for (let i = 0; i < 7; i++) {
            let date = new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            let eventCount = Math.floor(Math.random() * 5);
            let eventsList = [];
            for (let j = 0; j < eventCount; j++) {
                eventsList.push(`Event ${j + 1}`);
            }
            events[date] = eventsList;
        }
        return events;
    }

    const [events, setEvents] = React.useState(generateEvents());

    const [newEvent, setNewEvent] = React.useState('');


    let sortedDates = Object.keys(events).sort((a, b) => new Date(a) - new Date(b));

        return (
            <div className="daily-planner-container">
                {sortedDates.map(date => (
                    <div key={date}>
                        <h3 className="date">{date}</h3>
                        <ul className="event-list">
                            {events[date].map((event, index) => (
                                <div>
                                <li key={index} className="event-item">{event}</li>
                                    <EditButton deleteHandler={() => {
                                        const newEvents = { ...events };
                                        newEvents[date] = newEvents[date].filter((_, i) => i !== index);
                                        setEvents(newEvents);
                                    }} />
                                </div>
                            ))}
                            {<li><AddEvent newEvent={newEvent} handleInputChange={(e) => setNewEvent(e.target.value)} addEventHandler={() => setEvents({ ...events, [date]: [...events[date], newEvent] })}/></li>}
                        </ul>
                    </div>
                ))}
            </div>
        );
}

export default DailyPlannerFunction;
