import { NavLink, Outlet, useLocation } from 'react-router-dom';

export default function HostLayout() {
  const location = useLocation();
  console.log(location.state);

  const activeStyles = {
    color: '#000',
    textDecoration: 'underline',
  };

  return (
    <>
      <nav className='host-nav-links'>
        <NavLink to='.' end style={({ isActive }) => (isActive ? activeStyles : null)}>
          Dashboard
        </NavLink>
        <NavLink to='income' style={({ isActive }) => (isActive ? activeStyles : null)}>
          Income
        </NavLink>
        <NavLink to='vans' style={({ isActive }) => (isActive ? activeStyles : null)}>
          Vans
        </NavLink>
        <NavLink to='reviews' style={({ isActive }) => (isActive ? activeStyles : null)}>
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
