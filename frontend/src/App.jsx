// Remove BrowserRouter import and its usage from this file
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './Auth/Login';
import SignUpPage from './Auth/Signup';
import HomePage from './Home/HomePage';
import PasswordPage from './Home/PasswordPage';
import PasswordGenerator from './Home/PasswordGenerator';
import Logout from './Home/Logout';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} /> {/* Use element prop to specify the component */}
      <Route path="/signup" element={<SignUpPage />} /> {/* Use element prop to specify the component */}
      <Route path="/Homepage" element={<HomePage />}></Route>
      <Route path="/passwords" element={<PasswordPage></PasswordPage>}></Route>
      <Route path="/generate-password" element={<PasswordGenerator></PasswordGenerator>}></Route>
      <Route path='/logout' element={<Logout></Logout>}></Route>
    </Routes>
  );
};

export default App;
