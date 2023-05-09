import { Link, NavLink, Outlet, useLoaderData } from 'react-router-dom';
import { getHostVanDetails } from '../../../api';
import { requireAuth } from '../../../utils';

export async function loader({ request, params }) {
  await requireAuth(request);
  return getHostVanDetails(params.id);
}

export default function HostVanLayout() {
  const van = useLoaderData();

  return (
    <div className='host-van-page'>
      {van ? (
        <>
          <Link to='..' relative='path'>
            &larr; Back to all vans
          </Link>
          <div className='host-van-container'>
            <div className='host-van-details'>
              <img src={van.imageUrl} alt={van.name} />
              <div>
                <span className={van.type}>{van.type}</span>
                <h2>{van.name}</h2>
                <h3>${van.price}/day</h3>
              </div>
            </div>
            <nav className='host-van-nav-links'>
              <NavLink to='.' end className={({ isActive }) => (isActive ? 'active-link' : null)}>
                Details
              </NavLink>
              <NavLink to='pricing' className={({ isActive }) => (isActive ? 'active-link' : null)}>
                Pricing
              </NavLink>
              <NavLink to='photos' className={({ isActive }) => (isActive ? 'active-link' : null)}>
                Photos
              </NavLink>
            </nav>
            <Outlet context={van} />
          </div>
        </>
      ) : (
        <h2>Van not found</h2>
      )}
    </div>
  );
}
