// import React from 'react'
// import { Nav, NavLink } from 'react-bootstrap'
// import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './NavbarElements'

import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css'
import { FaBars, FaTimes } from 'react-icons/fa';
import 'react-icons/gr'
import { GrRestaurant } from 'react-icons/gr';
import {IoRestaurantOutline} from 'react-icons/io';

function Navbar() {
    // return (
    //   <>
    //   <Nav>
    //     <NavLink to='/'>
    //       <h1>Logo</h1>
    //       {/* <img src={require('../../images/logo.svg')} alt='logo' /> */}
    //     </NavLink>
    //     <NavMenu>
    //       <NavLink to='/about' activeStyle>
    //         About
    //       </NavLink>
    //       <NavLink to='/services' activeStyle>
    //         Services
    //       </NavLink>
    //       <NavLink to='/contact-us' activeStyle>
    //         Contact Us
    //       </NavLink>
    //       <NavLink to='/sign-up' activeStyle>
    //         Sign Up
    //       </NavLink>
    //       {/* Second Nav */}
    //       {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
    //     </NavMenu>

    //     <Bars />

    //     <NavBtn>
    //       <NavBtnLink to='/signin'>Sign In</NavBtnLink>
    //     </NavBtn>
    //   </Nav>
    // </>
    // )

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
  
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
  
    const showButton = () => {
      if (window.innerWidth <= 960) {
        setButton(false);
      } else {
        setButton(true);
      }
    };
  
    useEffect(() => {
      showButton();
    }, []);
  
    window.addEventListener('resize', showButton);
  
    return (
      <>
        <nav className='navbar'>
          <div className='navbar-container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
              {/* <GrRestaurant color='white' size={36}/> */}
              {/* <i class='fab fa-typo3' /> */}
              POS
            </Link>

            <div className='menu-icon' onClick={handleClick}>
              {/* <i className={click ? 'fas fa-times' : 'fas fa-bars'} /> */}
              {click ? 
                <FaTimes color='white'/>
              :
                <FaBars color='white' size={28}/>
            }
            </div>

            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              {/* <li className='nav-item'>
                <Link to='/home' className='nav-links' onClick={closeMobileMenu}>
                  Home
                </Link>
              </li> */}

              {/* <li className='nav-item'>
                <Link
                  to='/about'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  About us
                </Link>
              </li> */}

              <li className='nav-item'>
                <Link
                  to='/login'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
  
              <li>
                <Link
                  to='/signup'
                  className='nav-links-mobile'
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
            {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
          </div>
        </nav>
      </>
    );
}

export default Navbar
