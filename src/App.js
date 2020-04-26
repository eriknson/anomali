import React, { Component } from "react";
import { Provider } from "react-redux";
import { HashRouter, Route } from "react-router-dom";
import store from "./store/Store";
import "./App.css";

import Map from "./components/Map";
import Landing from "./components/Landing";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Route path="/" component={Landing} />
          <Route path="/map" component={Map} />
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
