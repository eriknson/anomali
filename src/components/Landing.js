import React, { Component } from "react";

import Map from "./Map";
import Intro from "./Intro";
import Footer from "./Footer";

class Landing extends Component {
  render() {
    return (
      <div className="App">
        <div className="app-container">
          <Intro />
        </div>
        <Map />
        <div className="app-container">
          <Footer />
        </div>
      </div>
    );
  }
}

export default Landing;
