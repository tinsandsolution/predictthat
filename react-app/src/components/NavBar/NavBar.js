
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

import SignupFormModalButton from './Signup';
import LoginFormModalButton from './Login';
// import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import Logo from '../../assets/predictthatlogo.png'
import { useSelector } from "react-redux";
import Searchbar from './Searchbar';


const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  const history = useHistory()

  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  let sessionNav
  if (sessionUser) {
    sessionNav = (
      <div className="nav-outer">
        <div className="nav-inner-logged-in">
          <div className='nav-left'>
            <div className='nav-image-container'>
              <img className='nav-logo' alt="logo" src={Logo} onClick={() => {history.push('/')}}></img>
            </div>
            <Searchbar/>
          </div>
          <div className='nav-right-logged-in'>
            {/* <div className='nav-card'>

              <div className='nav-card-text'>Portfolio</div>
            </div> */}

            <div className='nav-card nav-card-special'>
              <div className='nav-card-above-text'>
                ${sessionUser && parseFloat(sessionUser.funds).toFixed(2)}
              </div>
              <div className='nav-card-text nav-card-text-special'>Funds</div>
            </div>

            <div className='nav-card' onClick={() => history.push('/yourmarkets')}>
              <i className="fa-solid fa-scale-balanced fa-xl" id="nav-card-icon-color"></i>
              <div className='nav-card-text'>Your Markets</div>
            </div>

            <div className='nav-card' onClick={onLogout}>
              <i className="fa-solid fa-arrow-right-from-bracket fa-xl" id="nav-card-icon-color"></i>
              <div className='nav-card-text'>Log Out</div>
            </div>

          </div>
        </div>
      </div>
    )
  }
  else {
    sessionNav = (
      <div className="nav-outer">
        <div className='nav-inner-logged-out'>
          <div className='nav-left'>
            <div className='nav-image-container'>
              <img className='nav-logo' alt="logo" src={Logo} onClick={() => {history.push('/')}}></img>
            </div>
          </div>
          <div className='nav-right'>
            <LoginFormModalButton />
            <SignupFormModalButton />
          </div>

        </div>
      </div>
    )
  }
  return sessionNav
}

export default NavBar;


// const NavBar = () => {
//   return (
//     <nav className="nav-outer">
//       <ul>
//         <li>
//           <NavLink to='/' exact={true} activeClassName='active'>
//             Home
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to='/login' exact={true} activeClassName='active'>
//             Login
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to='/sign-up' exact={true} activeClassName='active'>
//             Sign Up
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to='/users' exact={true} activeClassName='active'>
//             Users
//           </NavLink>
//         </li>
//         <li>
//           <LogoutButton />
//         </li>
//       </ul>
//     </nav>
//   );
// }
