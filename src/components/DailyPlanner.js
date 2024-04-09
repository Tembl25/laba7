import React from 'react';
import './DailyPlanner.css';

class DailyPlanner extends React.Component {
    state = {
        events: this.generateEvents()
    };

    generateEvents() {
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

    render() {
        let sortedDates = Object.keys(this.state.events).sort((a, b) => new Date(a) - new Date(b));

        return (
            <div className="daily-planner-container">
                {sortedDates.map(date => (
                    <div key={date}>
                        <h3 className="date">{date}</h3>
                        <ul className="event-list">
                            {this.state.events[date].map((event, index) => (
                                <li key={index} className="event-item">{event}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        );
    }
}

export default DailyPlanner;
