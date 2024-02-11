import React from 'react';
import logo from './logo.svg';
import './App.css';
import { selectlogged } from './features/authentication/loginSlice';
import { useAppSelector } from './app/hooks';
import { Outlet } from 'react-router-dom';
import HorizontalNavbar from './shared/components/HorizontalNavbar';

function App() {
    const logged = useAppSelector(selectlogged)
    return (
        <div className="App">
            <HorizontalNavbar/>
            <Outlet /> {/* This is where your routed components will be rendered */}
        </div>
    );
}

export default App;
