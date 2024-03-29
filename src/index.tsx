import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Menu } from './features/navigation/Menu';
import { Login } from './features/authentication/Login';
import AboutPage from './features/AboutPage';


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Routes>
                    <Route path="/" element={<App />} >
                        <Route path="lessons" element={<Menu/>} />
                        <Route path="exercise" element={<Menu/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path='/about' element={<AboutPage/>}/>
                    </Route>
                </Routes>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
