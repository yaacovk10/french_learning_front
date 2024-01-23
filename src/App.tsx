import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Login } from './features/counter/Login';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login></Login>
      </header>
    </div>
  );
}

export default App;
