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
            <strong>We are two engineering students currently doing our Master Thesis.</strong>
          </p>
          <p>
            For 20 weeks, we have the honor to explore public transport data through a graph mining lens. As a part of
            KoDa (the Swedish Public Transport Data Lab), we are developing a proof of concept to showcase (a small part
            of) their historic data's possibilities.
          </p>
          <p>
            We have decided to look closer at anomalies in the Uppsala Transport network (UL). To do this we have
            developed a pipeline that extracts, analyzes and visualizes 3.5M data points / deviations from time
            schedule. Our result in an index describing how vulnerable each part (edge) of the network is when it comes
            to time table anamolies. And here's our attempt at visualizing it.{' '}
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
