import React from 'react';
import './App.css';

import Landing from './components/landing/Landing';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className='App'>
      <div className='app-container'>
        <Landing />
        <Footer />
      </div>
    </div>
  );
}

export default App;
