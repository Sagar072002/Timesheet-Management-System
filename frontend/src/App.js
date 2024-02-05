// Import necessary dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Employee from './pages/Employee';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Timesheet from './pages/Timesheet';




// App component
function App() {
  return (
    <Router>
       
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/employee" element={<Employee/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/timesheet" element={<Timesheet/>} />

        </Routes>
    </Router>
  );
}

export default App;
