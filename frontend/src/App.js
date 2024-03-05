import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import Forgot from './pages/forgotpass';
import Profile from './components/Profile';
import Timesheet from './components/Timesheet';
import Scorecard from './components/Scorecard';
import TimesheetList from './pages/TimesheetList';
import Newemp from './pages/NewEmployee';
import ListTime from './pages/TimesheetList';
import User_prof from './pages/user_profile';




function App() {
  return (
    <Router>
       
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/timesheet" element={<Timesheet/>} />
          <Route path="/scorecard" element={<Scorecard/>} />
          <Route path="/forgotpass" element={<Forgot/>} />
          <Route path="/timesheetlist" element={<TimesheetList/>} />
          <Route path="/newemp" element={<Newemp/>} />
          <Route path="/timesheetList" element={<ListTime/>} />
          <Route path="/userprofile" element={<User_prof/>} />

        </Routes>
    </Router>
  );
}

export default App;


