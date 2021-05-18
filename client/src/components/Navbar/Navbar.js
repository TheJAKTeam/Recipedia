import React from 'react'
import { Link } from 'react-router-dom'

import { isUserLoggedIn } from '../../util/auth'
import './Navbar.css'
import logo from '../../../src/logo.png'

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-md navbar-dark'>
      <div className='container d-flex'>
        <Link className='navbar-brand' to='/'>
          <img src={logo} alt='recipedia logo' width='175px' />
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navToggle'
          aria-controls='navToggle'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navToggle'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                home
              </Link>
            </li>

            {isUserLoggedIn() && (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/recipebook'>
                    my recipe book
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link className='nav-link' to='/preferences'>
                    preferences
                  </Link>
                </li>
              </>
            )}

            {isUserLoggedIn() ? (
              <li className='nav-item'>
                <button
                  className={`btn btn-danger btn-sm logOutButton`}
                  onClick={() => {
                    localStorage.setItem('isLoggedIn', 'false')
                    window.location.reload()
                  }}
                >
                  sign out
                </button>
              </li>
            ) : (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/login'>
                    sign in
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link className='nav-link' to='/signup'>
                    sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
