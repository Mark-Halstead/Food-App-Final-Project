import Wrapper from "../../assets/wrappers/Navbar"
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useState } from 'react';

const NavbarD = () => {
    return (
      <Wrapper>
        <div className='nav-center'>
          <button
            type='button'
            className='toggle-btn'
            onClick={() => console.log('toggle sidebar')}
          >
            <FaAlignLeft />
          </button>
          <div>
            <h3 className='logo-text'>dashboard</h3>
          </div>
          <div className='btn-container'>
            <button
              type='button'
              className='btn'
              onClick={() => console.log('toggle logout dropdown')}
            >
              <FaUserCircle />
              <FaCaretDown />
            </button>
            <div className='dropdown show-dropdown'>
              <button
                type='button'
                className='dropdown-btn'
                onClick={() => {
                  console.log('logout user');
                }}
              >
                logout
              </button>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  };
  
  export default NavbarD;
