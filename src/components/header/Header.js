import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className='header'>
        <h1>
          Lorem ipsum <br /> dolor sit amet
        </h1>
        <h2>
          Sed ut perspiciatis unde omnis iste natus error <br />
          sit voluptatem accusantium doloremque laudantium.
        </h2>
        <div className='header-description'>
          <p>
            Hi and welcome. <br />
            <strong>We are two engineering students doing our Master Thesis.</strong>
          </p>
          <p>
            For 20 weeks, we have had the honor to explore public transport data as a part of the ongoing{' '}
            <a href='https://www.ri.se/sv/vad-vi-gor/projekt/koda'>
              <u>KoDa (Public Transport Data Lab)</u>
            </a>{' '}
            project. We have decided to do this using graph theory, and are developing a proof of concept showcasing (a
            small part of) the fantastic possibilities and insights historic public transport data entails.
          </p>
          <p>
            More specifically, our thesis project focuses on time schedule anomalies in the Uppsala Transit Network
            (UL). To do this we have developed a pipeline that extracts, analyzes and aggregates 3.5M data points from
            January 2020. The result is an objective index describing how vulnerable each part (edge) of the network is
            (when it comes deviations from time table). And here's our attempt at visualizing parts of our work.
          </p>
          <p>
            Feel to free to send us{' '}
            <a href='mailto:eriks@mail.se'>
              <u>an e-mail</u>
            </a>{' '}
            if you have any question(s). Enjoy!
          </p>
        </div>
      </div>
    );
  }
}
export default Header;
