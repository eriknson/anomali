import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className='header'>
        <h1>
          Unraveling the <br /> UL network
        </h1>
        <h2>
          A Master's Thesis by Erik Nilsson & Axel Boman. <br />
          Exploring how graph theory can be used to assess vulnerabilities in public transport data.
        </h2>
        <div className='header-description'>
          <p>
            Hi and welcome. <br />
            <strong>We are two engineering students doing our Master Thesis.</strong>
          </p>
          <p>
            For 20 weeks, we have had the honor to explore public transport data as a part of KoDa (the Swedish Public
            Transport Data Lab) which aims to provide open data in real-time format along with historical data and
            annotated data sets for applications related to public transport.
          </p>
          <p>
            We have decided to look closer at anomalies in time schedule times for the UL network in order to build a
            data-driven model describing how vulnerable different parts’ of the network are in this regard.{' '}
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
