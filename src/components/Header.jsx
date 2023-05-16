import { Link, NavLink, useNavigate } from 'react-router-dom';
import loginIcon from '../assets/images/avatar-icon.png';

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('loggedIn');

  function logoutUser() {
    localStorage.removeItem('loggedIn');
    navigate('login');
  }

  return (
    <header>
      <Link to='.' className='site-logo'>
        Vanlife
      </Link>

      <nav className='nav-links'>
        <NavLink to='host' className={({ isActive }) => (isActive ? 'active' : '')}>
          Host
        </NavLink>
        <NavLink to='about' className={({ isActive }) => (isActive ? 'active' : '')}>
          About
        </NavLink>
        <NavLink to='vans' className={({ isActive }) => (isActive ? 'active' : '')}>
          Vans
        </NavLink>
        {isLoggedIn ? (
          <button className='logout-btn' onClick={logoutUser}>
            Logout
          </button>
        ) : (
          <Link to='login'>
            <img className='login-icon' src={loginIcon} alt='login' />
          </Link>
        )}
      </nav>
    </header>
  );
}
