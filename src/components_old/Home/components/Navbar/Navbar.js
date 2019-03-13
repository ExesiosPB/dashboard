import React from 'react';

import './Navbar.css';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <div className="container-fluid">
          
          <div className="justify-content-end" id="navigation">
            <ul className="nav navbar-nav ml-auto">
            
              <li className="nav-item">
                <span>Account information here</span>
              </li>
            </ul>  
          
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar;