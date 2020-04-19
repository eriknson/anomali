import React, { Component } from "react";

class Intro extends Component {
  render() {
    return (
      <div className="header">
        <h1>
          Lorem ipsum <br /> dolor sit amet
        </h1>
        <h2>
          Sed ut perspiciatis unde omnis iste natus error <br />
          sit voluptatem accusantium doloremque laudantium.
        </h2>
        <div className="header-description">
          <p>
            Hi and welcome. <br />
            <strong>
              We are two engineering students doing our Master Thesis.
            </strong>
          </p>
          <p>
            For 20 weeks, we have had the honor to work with the Swedish Public
            Transport Data Lab (a.k.a.{" "}
            <a href="https://www.ri.se/sv/vad-vi-gor/projekt/koda">
              <u>KoDa</u>
            </a>
            ). As a part of our Master Thesis, we are developing a proof of
            concept using graph theory to assess weak spots (in terms of time
            table deviations) in the Uppsala Transit Network (UL)
          </p>
          <p>
            More specifically, our thesis project focuses on anomalies and we
            have developed a pipeline that extracts, analyzes and aggregates
            3.5M data points from January 2020. The result is an index
            describing how vulnerable each part (edge) of the network is to
            deviate from schedule. And here's our attempt at visualize this.
          </p>
          <p>
            Feel to free to send{" "}
            <a href="mailto:eriks@mail.se">
              <u>Erik</u>
            </a>{" "}
            or{" "}
            <a href="mailto:axelbomans@gmail.com">
              <u>Axel</u>
            </a>{" "}
            an e-mail if you have any question(s). Enjoy!
          </p>
        </div>
      </div>
    );
  }
}

export default Intro;
