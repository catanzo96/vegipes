import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {FaLeaf} from 'react-icons/fa';

export default function SecondNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='page nav'>
      <div className='page-center navbar'>
        <Link to='/' className='nav-logo'>
          <FaLeaf className='nav-icon'></FaLeaf>
          <h1 className='nav-title'>Vegipes</h1>
        </Link>
        <div className={`nav-links ${isOpen && 'open'}`}>
          <Link to='/'>Home</Link>
          <Link to='/key'>Key</Link>
          <Link to='/about'>About</Link>
        </div>
        <div className={`nav-toggle ${isOpen && 'open'}`} onClick={() => setIsOpen(!isOpen)}>
          <div className='bar'></div>
        </div>
      </div>
    </div>
  )
}
