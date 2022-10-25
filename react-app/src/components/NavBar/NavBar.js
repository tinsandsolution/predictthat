
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import Logo from '../../assets/predictthatlogo.png'
import { useSelector } from "react-redux";


const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)

  let sessionItems
  if (sessionUser) {
    sessionItems = (
      <>Logged In</>
    )
  }
  else {
    sessionItems = (
      <>Logged Out</>
    )
  }
  return (
    <div className="nav-outer">
      <div className='nav-left'>
        <div className='nav-image-container'>
          <img className='nav-logo' src={Logo}></img>
        </div>
      </div>
      <div className='nav-right'>
        {sessionItems}
      </div>

    </div>
  );
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
