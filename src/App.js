import React from 'react';
import "./App.css";
import 'react-datepicker/dist/react-datepicker.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import UsersList from './components/pages/UsersList';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
function App() {
     const auth = {'accessToken':true}
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to={"/login"} />}></Route>
        <Route path="login" element={<Login />} ></Route>
        <Route path="/register" element={<Register/>} ></Route>
        <Route path="/dashboard" element={<Dashboard/>} ></Route>
        <Route path="/users-list" element={<UsersList/>} ></Route>  
      </Routes>
    </Router>
  );
}

export default App;
