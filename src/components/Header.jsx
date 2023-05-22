import { Form, Link, NavLink } from 'react-router-dom';
import loginIcon from '../assets/images/avatar-icon.png';

export default function Header({ isLoggedIn }) {
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
          <Form action='/logout' method='post'>
            <button className='logout-btn' type='submit'>
              Logout
            </button>
          </Form>
        ) : (
          <Link to='login'>
            <img className='login-icon' src={loginIcon} alt='login' />
          </Link>
        )}
      </nav>
    </header>
  );
}
