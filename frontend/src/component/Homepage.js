import React from 'react'
import '../App.css';
import { Button } from './Button';
import './Homepage.css';

function Homepage() {
  return (
    <div className='landing-container'>
      <video src='/videos/landing.mp4' autoPlay loop muted />
      <h1>!dlroW olleH</h1>
      <p>Welcome to Visual SQL, your friendly companion.</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          SIGN-UP
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          Learn More
        </Button>
      </div>
    </div>
  );
}

export default Homepage 