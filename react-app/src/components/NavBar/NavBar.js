
import React from 'react';
import { useHistory } from 'react-router-dom';
import SignupFormModalButton from './Signup';
import LoginFormModalButton from './Login';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import Logo from '../../assets/predictthatlogo.png'
import { useSelector } from "react-redux";


const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  const history = useHistory()


  let sessionNav
  if (sessionUser) {
    sessionNav = (
      <div className="nav-outer">
        <div className='nav-left'>
          <div className='nav-image-container'>
            <img className='nav-logo' alt="logo" src={Logo} onClick={() => {history.push('/')}}></img>
          </div>
        </div>
        <div className='nav-right'>
          Logged In
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
