import { NavLink, Outlet } from 'react-router-dom';

export default function HostLayout() {
  return (
    <>
      <nav className='host-nav-links'>
        <NavLink to='.' end className={({ isActive }) => (isActive ? 'active' : '')}>
          Dashboard
        </NavLink>
        <NavLink to='income' className={({ isActive }) => (isActive ? 'active' : '')}>
          Income
        </NavLink>
        <NavLink to='vans' className={({ isActive }) => (isActive ? 'active' : '')}>
          Vans
        </NavLink>
        <NavLink to='reviews' className={({ isActive }) => (isActive ? 'active' : '')}>
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
