import React from 'react';
import {Link} from 'react-router-dom';

export default function Limit() {
  const checkKey = localStorage.getItem('key');
  
  return (
    <div className='page'>
      <div className='page-center limit'>
        <h3 className='page-title limit-title'>Attention! Limit requests reached!</h3>
        {checkKey ?
          <p>You’ve reached your daily request limit. Update your plan to increase requests <a href='https://spoonacular.com/food-api/pricing' target='_blank'>here</a>, or come back tomorrow to continue searching through tons of recipes.</p>
        : 
          <p>The limit of daily requests has been reached. register on <a href='https://spoonacular.com/food-api/' target='_blank'>Spoonacular</a> and enter your key <Link to='/key'>here</Link> to have access to more requests.</p>}
      </div>
    </div>
  )
}