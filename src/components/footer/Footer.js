import React, { Component } from 'react';
import Emoji from '../misc/emoji/Emoji';

class Footer extends Component {
  render() {
    return (
      <div className='footer'>
        <div className='footer-container'>
          <div className='footer-container-left'>
            <p>
              <a href='mailto:eriks@mail.se'>
                <u>eriks@mail.se</u>
              </a>{' '}
              <br />
              <a href='mailto:eriks@mail.se'>
                <u>axelbomans@gmail.com</u>
              </a>{' '}
            </p>
          </div>
          <div className='footer-container-right'>
            <p>
              Made with <Emoji symbol='♥️' label='heart' /> and React. <br />
              GitHub repository is{' '}
              <a href='https://github.com/eriknson/anomali' target='_blank' rel='noopener noreferrer'>
                <u>here</u>
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default Footer;
