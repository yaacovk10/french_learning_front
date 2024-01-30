import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Login } from './features/counter/Login';
import { selectlogged } from './features/counter/loginSlice';
import { useAppSelector } from './app/hooks';
import { Link, Outlet } from 'react-router-dom';

function App() {
    const logged = useAppSelector(selectlogged)
    return (
        <div className="App">
            <header className="App-header">
                <Login />
                <Link to="menu">menu</Link>
                <Outlet />
            </header>
        </div>
    );
}

export default App;
