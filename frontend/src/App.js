import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Employee from './pages/Employee';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Forgot from './pages/forgotpass';
import Profile from './components/Profile';
import Detail from './components/Detail';
import Timesheet from './components/Timesheet';
import Scorecard from './components/Scorecard';
import TimesheetList from './pages/TimesheetList';
import NewEmploye from './pages/NewEmploye';




function App() {
  return (
    <Router>
       
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/employee" element={<Employee/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/detail" element={<Detail/>} />
          <Route path="/timesheet" element={<Timesheet/>} />
          <Route path="/scorecard" element={<Scorecard/>} />
          <Route path="/forgotpass" element={<Forgot/>} />
          <Route path="/timesheetlist" element={<TimesheetList/>} />
          <Route path="/new" element={<NewEmploye/>} />

        </Routes>
    </Router>
  );
}

export default App;


