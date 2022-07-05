import React from 'react';
import {Link} from 'react-router-dom';

export default function About() {

  return (
    <div className='page'>
      <div className='page-center about'>
        <h3 className='page-title'>About</h3>
        <p>Hi there! I'm Giacomo! I am a junior web developer and I created this website. Although it is very basic allows you to search through many vegetarian recipes.</p>
        <p>The recipes are fetched from the Spoonacular <a href='https://en.wikipedia.org/wiki/API' target='_blank'>API</a> by entering my personal key, In case the daily requests have been reached I invite you to register on the <a href='https://spoonacular.com/food-api' target='_blank'>Spoonacular</a> page and enter your key <Link to='/key'>here</Link> to have access to a greater number of daily recipes.</p>
      </div>
    </div>
  )
}