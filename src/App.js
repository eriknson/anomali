import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store/Store";
import "./App.css";

import Map from "./components/Map";
import Intro from "./components/Intro";
import Description from "./components/Description";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="app-container">
            <Intro />
          </div>
          <Map />
          <div className="app-container">
            <Description />
            <Footer />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
