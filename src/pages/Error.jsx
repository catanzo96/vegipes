import React from 'react';
import {Link} from 'react-router-dom';

export default function Error() {
  return (
    <div className="page">
      <div className="page-center error">
        <h1>Ooop! Page not found!</h1>
        <Link to="/" className="btn-home">
          Back Home
        </Link>
      </div>
    </div>
  )
}
