// @flow
import * as React from 'react';


export function AddEvent(props) {
    return (
        <div>
            <input
                className="new-event-input"
                type="text"
                value={props.newEvent}
                onChange={props.handleInputChange}
                placeholder="Новое событие"
            />
            <button className="add-event-btn" onClick={props.addEventHandler}>Добавить</button>
        </div>
    );
};