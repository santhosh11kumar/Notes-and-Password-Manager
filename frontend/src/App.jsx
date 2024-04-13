import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Auth/Login';
import SignUpPage from './Auth/Signup';
import HomePage from './Home/HomePage';
import PasswordPage from './Home/PasswordPage';
import PasswordGenerator from './Home/PasswordGenerator';
import Logout from './Home/Logout';
import AddPassword from './Home/AddPassword';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/user/login" />} /> {/* Redirect to login page */}
      <Route path="/user/login" element={<LoginPage />} /> {/* Login page route */}
      <Route path="/user/register" element={<SignUpPage />} /> {/* Registration page route */}
      <Route path="/Homepage" element={<HomePage />}></Route> {/* Homepage route */}
      <Route path="/v2/PasswordManager" element={<PasswordPage />}></Route> {/* Passwords route */}
      <Route path="/v2/AddPassword" element={<AddPassword />}></Route> {/* Passwords route */}
      <Route path="/v2/generate-password" element={<PasswordGenerator />}></Route> {/* Password generator route */}
      <Route path="/user/logout" element={<Logout />}></Route> {/* Logout route */}
    </Routes>
  );
};

export default App;
