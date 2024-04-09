import React, { useState } from 'react';
import DailyPlanner from './DailyPlanner';
import EditableDailyPlanner from './EditableDailyPlanner';

const ComponentSelector = () => {
    const [selectedComponent, setSelectedComponent] = useState(null);

    const handleSelectChange = (e) => {
        setSelectedComponent(e.target.value);
    };

    return (
        <div>
            <select onChange={handleSelectChange}>
                <option value="daily">Daily Planner</option>
                <option value="editable">Editable Daily Planner</option>
            </select>
            {selectedComponent === 'daily' && <DailyPlanner />}
            {selectedComponent === 'editable' && <EditableDailyPlanner />}
        </div>
    );
};

export default ComponentSelector;
