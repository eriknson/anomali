import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

import Landing from './components/landing/Landing';
import Footer from './components/footer/Footer';
import Outro from './components/outro/Outro';
import Map from './components/map/Map';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='app-container'>
          <Landing />
        </div>
        <Provider store={store}>
          <Map />
        </Provider>
        <div className='app-container'>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
