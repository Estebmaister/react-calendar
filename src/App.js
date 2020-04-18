import React from 'react';
// import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Calendar from './components/calendar/'

function App() {
  return (
    <div className="App">
      <Calendar />
      <header className="App-header">
        <Counter />
      </header>
    </div>
  );
}

export default App;
