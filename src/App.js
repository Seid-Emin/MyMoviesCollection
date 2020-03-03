import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/layouts/Navbar';
import Search from './components/UI/Search/Search'

import './App.css';

function App() {
  return (
    <div className="">
      <Navbar />
      <Search />
    </div>
  );
}

export default App;
