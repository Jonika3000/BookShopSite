import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/Default/HomePage/HomePage';
import DefaultLayout from './components/Default/DefaultLayout/DefaultLayout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} /> 
        </Route> 
      </Routes>
    </>
  );
}

export default App;
