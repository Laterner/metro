import './App.css';
import { React, useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Main from './components/Main';
import SendForm from './components/SendForm'
import DashBoard from './components/DashBoard'


function App() {    
    return (
        <Router>
            <Main/>
            <Routes>
                <Route path="/" element={<SendForm/>}/>
                <Route path="/register" element={<RegisterForm/>}/>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/send" element={<SendForm/>}/>
                <Route path="/admin" element={<DashBoard/>}/>
            </Routes>
        </Router>
    );
}

export default App;
