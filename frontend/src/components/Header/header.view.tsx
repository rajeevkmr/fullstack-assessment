import React from 'react';
import { Link } from 'react-router-dom';

const HeaderView: React.FC = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <div className='container'>
        {/* Logo */}
        <Link className='navbar-brand' to='/'>
          Nokia AIIMS
        </Link>

        {/* Toggle Button for Mobile */}
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        {/* Navigation Links */}
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto text-white'>
            <li className='nav-item'>
              <Link className='nav-link text-white' to='/'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link text-white' to='/metadata'>
                Metadata
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link text-white' to='/upload'>
                Upload New Data
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderView;
