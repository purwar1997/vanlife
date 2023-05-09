import { Link, NavLink, useNavigate } from 'react-router-dom';
import loginIcon from '../assets/avatar-icon.png';

export default function Header() {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem('loggedIn');

  function handleClick() {
    localStorage.removeItem('loggedIn');
    navigate('/login');
  }

  return (
    <header>
      <Link className='site-logo' to='/'>
        VanLife
      </Link>
      <nav>
        <NavLink to='host' className={({ isActive }) => (isActive ? 'active-link' : null)}>
          Host
        </NavLink>
        <NavLink to='about' className={({ isActive }) => (isActive ? 'active-link' : null)}>
          About
        </NavLink>
        <NavLink to='vans' className={({ isActive }) => (isActive ? 'active-link' : null)}>
          Vans
        </NavLink>
        {loggedIn ? (
          <button onClick={handleClick}>Logout</button>
        ) : (
          <Link to='login'>
            <img className='login-icon' src={loginIcon} alt='login' />
          </Link>
        )}
      </nav>
    </header>
  );
}
