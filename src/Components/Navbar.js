import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Shared.css'
import { keyboardImplementationWrapper } from '@testing-library/user-event/dist/keyboard';
import homeImg from '../Images/Headerbuttons.png'
import settingImg from '../Images/Buttons.png'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-nav">
      <div className="container-fluid">
        <a className="navbar-brand" style={{color:"#FFF"}} href="#">
            <img src={homeImg} ></img>
        </a>
        <a className="navbar-brand" style={{color:"#FFF"}} href="#">Routines</a>
        <a className="navbar-brand" style={{color:"#FFF"}} href="#">
            <img src={settingImg} ></img>
        </a>
      </div>
    </nav>
    )
}; 
export default Navbar;
