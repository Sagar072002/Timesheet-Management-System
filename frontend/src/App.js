import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Employee from './pages/Employee';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import Forgot from './pages/forgotpass';
import Profile from './components/Profile';
import Detail from './components/Detail';
import Timesheet from './components/Timesheet';
import Scorecard from './components/Scorecard';
import Eg from './components/eg';
import TimesheetList from './pages/TimesheetList';
import Newadmin from './pages/Newadmin';
import Newemp from './pages/NewEmployee';
import ListTime from './pages/TimesheetList';




function App() {
  return (
    <Router>
       
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/employee" element={<Employee/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/detail" element={<Detail/>} />
          <Route path="/timesheet" element={<Timesheet/>} />
          <Route path="/scorecard" element={<Scorecard/>} />
          <Route path="/forgotpass" element={<Forgot/>} />
          <Route path="/timesheetlist" element={<TimesheetList/>} />
          <Route path="/newadmin" element={<Newadmin/>} />
          <Route path="/eg" element={<Eg/>} />
          <Route path="/newemp" element={<Newemp/>} />
          <Route path="/timesheetList" element={<ListTime/>} />

        </Routes>
    </Router>
  );
}

export default App;


