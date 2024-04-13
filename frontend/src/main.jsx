import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <ToastContainer />
    <App />
  </BrowserRouter>
); 
