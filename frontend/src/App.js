// Import necessary dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Employee from './pages/Employee';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Profile from './pages/Profile';




// App component
function App() {
  return (
    <Router>
        {/* Your navigation can go here if needed */}

        {/* Define your routes */}
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/employee" element={<Employee/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/profile" element={<Profile/>} />
          {/* Add more routes if needed */}
        </Routes>
    </Router>
  );
}

export default App;
