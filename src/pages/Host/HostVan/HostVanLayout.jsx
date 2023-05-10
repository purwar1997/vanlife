import { Suspense } from 'react';
import { Link, NavLink, Outlet, useLoaderData, defer, Await } from 'react-router-dom';
import { getHostVanDetails } from '../../../api';
import { requireAuth } from '../../../utils';

export async function loader({ request, params }) {
  await requireAuth(request);
  return defer({ hostVan: getHostVanDetails(params.id) });
}

export default function HostVanLayout() {
  const data = useLoaderData();

  function renderHostVan(van) {
    return (
      <div className='host-van-page'>
        {van ? (
          <>
            <Link to='/host/vans'>&larr; Back to all vans</Link>
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
                <NavLink
                  to='pricing'
                  className={({ isActive }) => (isActive ? 'active-link' : null)}
                >
                  Pricing
                </NavLink>
                <NavLink
                  to='photos'
                  className={({ isActive }) => (isActive ? 'active-link' : null)}
                >
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
  return (
    <Suspense fallback={<h1 className='loader'>Loading...</h1>}>
      <Await resolve={data.hostVan}>{hostVan => renderHostVan(hostVan)}</Await>
    </Suspense>
  );
}
