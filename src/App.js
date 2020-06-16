import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Components
import Navbar from './components/layouts/Navbar';
import Content from './components/layouts/Content/Content';
import Footer from './components/layouts/Footer/Footer';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Content />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
