import React, { Component } from "react";

class Description extends Component {
  render() {
    return (
      <div className="header-description">
        <p>
          Hi and welcome. <br />
          <strong>
            We are two engineering students doing our Master Thesis.
          </strong>
        </p>
        <p>
          For 20 weeks, we have had the honor to work with Samtrafiken and the
          Swedish Public Transport Data Lab (a.k.a.{" "}
          <a href="https://www.ri.se/sv/vad-vi-gor/projekt/koda">
            <u>KoDa</u>
          </a>
          ). As a part of the thesis project, we are developing a proof of
          concept tool to assess weak spots (in terms of time table deviations)
          using graph theory.
        </p>
        <p>
          More specifically, we have developed a pipeline that extracts,
          aggregates and analyzes 3.5M data points from the Uppsala Transit
          Network (UL). Primarly, the result is an index describing how likely
          each node-pair (edge) in the network is to deviate from schedule.
          Secondly, in order to identify the most vulnerable part(s) /
          extension(s) in the network, we assess them using the MINCUT-MAXFLOW
          algorithm. And here's our attempt to visualize this. See the diagram
          legend by clicking on the second button in the top-right corner of the
          map.
        </p>
        <p>
          Feel to free to send{" "}
          <a href="mailto:eriks@mail.se">
            <u>Erik</u>
          </a>{" "}
          /{" "}
          <a href="mailto:axelbomans@gmail.com">
            <u>Axel</u>
          </a>{" "}
          an e-mail if you have any question(s). Enjoy!
        </p>
      </div>
    );
  }
}

export default Description;
