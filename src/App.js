import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

import Landing from './components/landing/Landing';
import Footer from './components/footer/Footer';
import Map from './components/map/map';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='app-container'>
          <Landing />
          <Provider store={store}>
            <Map />
          </Provider>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
