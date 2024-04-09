import React from 'react';
import './App.css';
import BicycleRow from './components/EditableDailyPlanner';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Bicycle Brands</h1>
            </header>
            <main>
                <BicycleRow />
            </main>
        </div>
    );
}

export default App;
