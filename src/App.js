import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/layouts/Navbar';
import Search from './components/UI/Search/Search'
import Content from './components/layouts/Contenct/Content'
import Footer from './components/layouts/Footer/Footer'

import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Search />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
